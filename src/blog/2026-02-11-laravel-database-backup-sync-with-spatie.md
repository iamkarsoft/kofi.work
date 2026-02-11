---
layout: post
title:  "Building a Production Database Backup & Sync System in Laravel"
date:   2026-02-11
categories: laravel database devops ai-explains ai
---

Managing database backups across environments is a common challenge. In this post, I'll walk through building a complete backup and sync system for Laravel that supports **environment-prefixed backups**, **SSH tunnel connections to production**, and **smart merge syncing** that never deletes data.

## The Problem

When working with a Laravel app that has both local and production environments, you often need to:

1. **Backup databases** with clear environment labels
2. **Pull production data** to local for debugging
3. **Sync data** without destroying local changes

The solution: custom Artisan commands built on top of [Spatie Laravel Backup](https://github.com/spatie/laravel-backup).

---

## Installation

```bash
composer require spatie/laravel-backup
php artisan vendor:publish --provider="Spatie\Backup\BackupServiceProvider"
```

---

## Configuration

### 1. Create a Dedicated Backup Disk

In `config/filesystems.php`:

```php
'disks' => [
    // ... other disks
    
    'backups' => [
        'driver' => 'local',
        'root' => storage_path('app/backups'),
    ],
],
```

### 2. Configure for Database-Only Backups

In `config/backup.php`, set the files include to empty for database-only backups:

```php
'source' => [
    'files' => [
        'include' => [
            // Empty = database only
        ],
    ],
    'databases' => [
        env('DB_CONNECTION', 'mysql'),
    ],
],

'destination' => [
    'disks' => [
        'backups',
    ],
],
```

### 3. Production Database Environment Variables

Add these to your `.env`:

```env
# Production Database Credentials
PRODUCTION_DB_HOST=127.0.0.1
PRODUCTION_DB_PORT=3306
PRODUCTION_DB_DATABASE=your_production_db
PRODUCTION_DB_USERNAME=db_user
PRODUCTION_DB_PASSWORD=db_password

# SSH Tunnel (if database is behind firewall)
PRODUCTION_SSH_HOST=your-server.com
PRODUCTION_SSH_USER=deploy
PRODUCTION_SSH_PORT=22

# SSH key names to try (comma-separated, looks in ~/.ssh/)
PRODUCTION_SSH_KEYS=my_key,backup_key
```

---

## The Commands

### 1. Backup Command (`db:backup`)

Creates environment-prefixed backups (`production-*.zip` or `local-*.zip`).

```bash
# Backup current environment (auto-detects from APP_ENV)
php artisan db:backup

# Explicitly backup as production (connects via SSH tunnel)
php artisan db:backup --production

# Explicitly backup as local
php artisan db:backup --local
```

**Key features:**
- Auto-detects environment from `APP_ENV`
- Creates SSH tunnel for production backups
- Falls back through multiple SSH keys
- Names backups with environment prefix

Here's the core of the backup command:

```php
public function handle(): int
{
    $environment = $this->getEnvironment();

    // If production flag and credentials exist, do remote backup
    if ($environment === 'production' && $this->hasProductionCredentials()) {
        return $this->backupProductionDatabase();
    }

    // Run spatie backup for local
    Artisan::call('backup:run', [
        '--only-db' => true,
        '--disable-notifications' => true,
    ], $this->output);

    $this->renameBackupWithPrefix($environment);
    return 0;
}
```

### 2. Restore Command (`db:restore`)

Restores from backups filtered by environment.

```bash
# Interactive selection from current environment backups
php artisan db:restore

# Restore from production backups
php artisan db:restore --production

# Restore specific backup
php artisan db:restore --production --backup=production-2026-02-11.zip

# Skip confirmation
php artisan db:restore --force
```

### 3. Sync Command (`db:sync`) - Merge Mode

This is where it gets interesting. Unlike a full restore that overwrites everything, **sync uses merge logic**:

- ✅ **Updates** existing records (matched by primary key)
- ✅ **Creates** new records that don't exist locally
- ❌ **Never deletes** records

```bash
# Sync from production (merge mode)
php artisan db:sync --production

# Skip confirmation
php artisan db:sync --production --force
```

---

## The Smart Sync Algorithm

The sync command solves a tricky problem: **user IDs differ between environments**. 

If you have the same user (by email) in production and local, their UUIDs are different. So when syncing a `movie_user` pivot table, we need to remap the foreign keys.

### Step 1: Build User ID Mapping by Email

```php
protected function buildUserIdMapping(string $tempDb, string $mainDb): void
{
    $this->userIdMapping = [];

    $prodUsers = DB::select("SELECT id, email FROM `{$tempDb}`.`users`");

    foreach ($prodUsers as $prodUser) {
        $localUser = DB::selectOne(
            "SELECT id FROM `{$mainDb}`.`users` WHERE email = ?",
            [$prodUser->email]
        );

        if ($localUser) {
            $this->userIdMapping[$prodUser->id] = $localUser->id;
        }
    }
}
```

### Step 2: Import to Temporary Database

```php
// Create temp database
DB::statement("CREATE DATABASE `{$tempDatabase}`");

// Clean SQL (remove USE statements, warnings)
$sql = file_get_contents($sqlFile);
$sql = preg_replace('/^mysqldump:.*$/mi', '', $sql);
$sql = preg_replace('/^USE\\s+`?[^`;]+`?;?\\s*$/mi', '', $sql);

// Import to temp
$this->importToDatabase($tempDatabase, $sqlFile);
```

### Step 3: Merge Tables with User Remapping

For regular tables, use `INSERT ... ON DUPLICATE KEY UPDATE`:

```php
$sql = "INSERT INTO `{$mainDb}`.`{$table}` ({$columnList})
        SELECT {$columnList} FROM `{$tempDb}`.`{$table}`
        ON DUPLICATE KEY UPDATE {$updateList}";
```

For pivot tables with user foreign keys, remap the IDs:

```php
protected function mergeTableWithUserMapping($tempDb, $mainDb, $table): void
{
    $records = DB::select("SELECT * FROM `{$tempDb}`.`{$table}`");

    foreach ($records as $record) {
        $data = (array) $record;

        // Remap user_id to local user
        if (isset($data['user_id']) && isset($this->userIdMapping[$data['user_id']])) {
            $data['user_id'] = $this->userIdMapping[$data['user_id']];
        } else {
            continue; // Skip if user doesn't exist locally
        }

        // Upsert the record
        $exists = DB::selectOne(
            "SELECT id FROM `{$mainDb}`.`{$table}` WHERE movie_id = ? AND user_id = ?",
            [$data['movie_id'], $data['user_id']]
        );

        unset($data['id']);
        
        if ($exists) {
            DB::table($table)->where('id', $exists->id)->update($data);
        } else {
            DB::table($table)->insert($data);
        }
    }
}
```

---

## SSH Tunnel for Production Access

When your production database isn't directly accessible, the backup command creates an SSH tunnel:

```php
protected function createSSHTunnel(int $localPort): void
{
    $command = sprintf(
        'ssh -f -N -L %d:%s:%d -i %s -p %d -o StrictHostKeyChecking=no %s@%s',
        $localPort,      // Local port (33066)
        $dbHost,         // Remote DB host (usually 127.0.0.1)
        $dbPort,         // Remote DB port (3306)
        $sshKeyPath,     // Path to SSH key
        $sshPort,        // SSH port (22)
        $sshUser,        // SSH user
        $sshHost         // Server hostname
    );

    exec($command);
    sleep(2); // Wait for tunnel
}
```

The backup then connects to `127.0.0.1:33066` which tunnels to the production database.

---

## Avoiding MySQL Password Warnings

MySQL outputs a warning when you pass passwords on the command line:

```
mysqldump: [Warning] Using a password on the command line interface can be insecure.
```

This can corrupt your SQL dumps if captured. The fix: use the `MYSQL_PWD` environment variable:

```php
// Instead of:
// mysqldump --password=secret ...

// Use:
$command = sprintf(
    'MYSQL_PWD=%s mysqldump --host=%s --user=%s %s',
    escapeshellarg($password),
    escapeshellarg($host),
    escapeshellarg($username),
    escapeshellarg($database)
);
```

---

## SSH Key Fallback

The command tries multiple SSH keys in order:

```php
protected function resolveSSHKeyPath(): ?string
{
    $home = getenv('HOME');
    $sshDir = $home . '/.ssh';

    // Get key names from env (comma-separated)
    $keyNames = env('PRODUCTION_SSH_KEYS', 'id_rsa');
    $keys = array_map('trim', explode(',', $keyNames));

    foreach ($keys as $keyName) {
        $keyPath = $sshDir . '/' . $keyName;
        if (file_exists($keyPath)) {
            return $keyPath;
        }
    }

    return null;
}
```

Set in `.env`:
```env
PRODUCTION_SSH_KEYS=deploy_key,id_rsa
```

---

## Command Summary

| Command | Description |
|---------|-------------|
| `php artisan db:backup` | Create backup (auto-detects environment) |
| `php artisan db:backup --production` | Backup production via SSH tunnel |
| `php artisan db:backup --local` | Backup local database |
| `php artisan db:restore` | Restore (interactive selection) |
| `php artisan db:restore --production` | Restore from production backup |
| `php artisan db:sync --production` | Merge production data (no deletes) |
| `php artisan backup:list` | List all backups |
| `php artisan backup:clean` | Clean old backups |

---

## Conclusion

This system gives you:

1. **Clear separation** - Production and local backups are clearly labeled
2. **Safe syncing** - Merge mode never deletes your local data
3. **User mapping** - Foreign keys are remapped by email, not ID
4. **SSH tunnel support** - Access production databases behind firewalls
5. **Robust imports** - Handles MySQL warnings and database-specific SQL

The full implementation is built on top of Spatie's excellent backup package, extended with custom commands for the specific workflow of syncing between environments.

---

## Further Reading

- [Spatie Laravel Backup Documentation](https://spatie.be/docs/laravel-backup)
- [MySQL Environment Variables](https://dev.mysql.com/doc/refman/8.0/en/environment-variables.html)
- [SSH Port Forwarding](https://www.ssh.com/academy/ssh/tunneling-example)
