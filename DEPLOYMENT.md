# Deployment Setup

This project uses GitHub Actions for continuous deployment to your production server.

## Prerequisites

1. SSH access to your server
2. GitHub repository with Actions enabled

## Required GitHub Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions → New repository secret

Add the following secrets:

### 1. `SSH_HOST`
Your server's hostname or IP address
```
Example: kofi.work or 192.168.1.100
```

### 2. `SSH_USERNAME`
Your SSH username on the server
```
Example: root or ubuntu or your-username
```

### 3. `SSH_PRIVATE_KEY`
Your SSH private key for authentication

**To generate and add your SSH key:**

```bash
# On your local machine, generate a new SSH key pair (if you don't have one)
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/github_actions_deploy

# Copy the public key to your server
ssh-copy-id -i ~/.ssh/github_actions_deploy.pub your-username@your-server

# Copy the PRIVATE key content
cat ~/.ssh/github_actions_deploy

# Paste the entire output (including -----BEGIN and -----END lines) into the SSH_PRIVATE_KEY secret
```

### 4. `SSH_PORT` (Optional)
SSH port number (defaults to 22 if not set)
```
Example: 22
```

## How It Works

1. **Trigger**: Workflow runs automatically when you push to the `master` branch
2. **Build**: GitHub Actions builds your Vue 3 project using `npm run build`
3. **Deploy**: The `dist` folder is copied to `/var/www/kofi.work/public_html/dist` on your server
4. **Backup**: Creates a timestamped backup before deploying
5. **Permissions**: Sets appropriate permissions for web server access

## Manual Deployment

To manually trigger a deployment:
```bash
git push origin master
```

## Server Requirements

- SSH access enabled
- Directory `/var/www/kofi.work/public_html/` must be writable by your SSH user
- Web server (nginx/apache) configured to serve from `/var/www/kofi.work/public_html/dist`

## Troubleshooting

### Permission Denied Errors
If you get permission errors, ensure your SSH user has sudo privileges or owns the deployment directory:
```bash
# On your server
sudo chown -R your-username:your-username /var/www/kofi.work/public_html/
```

### Build Fails
Check the Actions tab in GitHub for detailed error logs.

### Connection Issues
Verify your SSH connection manually:
```bash
ssh -i ~/.ssh/github_actions_deploy your-username@your-server
```

## Rollback

If a deployment fails, backups are stored with timestamps:
```bash
# On your server, list backups
ls -la /var/www/kofi.work/public_html/

# Restore from backup
sudo rm -rf /var/www/kofi.work/public_html/dist
sudo mv /var/www/kofi.work/public_html/dist.backup.YYYYMMDDHHMMSS /var/www/kofi.work/public_html/dist
```
