---
layout: post
title:  "Laravel Live 2025: Complete Conference Guide"
date:   2025-12-17
categories: 
---


# Laravel Live 2025: Complete Conference Guide

*Two Days of Laravel Excellence in London*

---

## Introduction

Laravel Live London (June 10-11, 2025) brought together the Laravel community for two days of intensive learning, covering everything from building scalable cloud infrastructure to advanced frontend optimization, developer productivity, and emerging technologies like Model Context Protocol (MCP). This comprehensive guide distills the key insights from both days.

**Conference Sponsors**: Laravel, 20i, Jump24, Katapult, Propel, Agiledrop, Redberry

---

## Table of Contents

**Day 1:**
- Filament: Partial Rendering & TipTap Editor
- How to Destroy a Software Engineer (What NOT to Do)
- Coding with AI: Cursor
- Async PHP with Fibers
- Generics in PHP
- Laravel & Kubernetes
- Demystifying Job Batches
- Nightwatch: Understanding Errors

**Day 2:**
- Laravel Cloud Deep Dive
- PIE: PHP Extension Installer
- Optimizing with Inertia.js
- Model Context Protocol (MCP)
- Testing Strategies: Flaky Tests & Allure
- Advanced Caching Strategies

---

# Day 1

## Session 1: Filament - Modern Admin Panels

### Partial Rendering

Filament introduced partial rendering capabilities that dramatically improve performance for complex admin interfaces:

**Benefits:**
- Only re-render components that changed
- Reduce server load by sending minimal data
- Faster UI updates without full page refresh
- Better user experience for data-heavy dashboards

**Use Cases:**
- Real-time data tables
- Dynamic form fields
- Interactive charts and graphs
- Modal dialogs with live data

### TipTap Editor Integration

Filament now includes seamless TipTap editor integration for rich text editing:

**Features:**
- WYSIWYG editing experience
- Markdown support
- Extensible with custom extensions
- Collaborative editing capabilities
- Media embedding
- Code syntax highlighting

**Implementation:**
```php
use Filament\Forms\Components\TiptapEditor;

TiptapEditor::make('content')
    ->required()
    ->columnSpanFull()
    ->fileAttachmentsDisk('public')
    ->fileAttachmentsDirectory('attachments');
```

---

## Session 2: How to Destroy a Software Engineer

This session highlighted common organizational practices that harm developer productivity and morale. Here's what to **avoid**:

### 1. Excessive On-Call Rotation (25% or More)

**The Problem:**
- Burnout from constant interruptions
- Inability to focus on deep work
- Poor work-life balance
- Reduced code quality

**Better Approach:**
- Limit on-call to 10-15% of time
- Rotate fairly across team
- Provide adequate compensation
- Build robust monitoring to reduce false alerts

### 2. Velocity Counting on Teams

**The Problem:**
- Story points become meaningless when used as performance metrics
- Encourages gaming the system
- Ignores code quality for quantity
- Creates toxic competition

**Better Approach:**
- Use velocity for planning, not evaluation
- Focus on outcome and value delivered
- Measure impact, not output

### 3. Misusing DORA Metrics

**DORA Metrics** (DevOps Research and Assessment):
- Deployment frequency
- Lead time for changes
- Change failure rate
- Time to restore service

**The Problem:**
- Using them for individual performance reviews
- Punishing teams for honest reporting
- Ignoring context and constraints

**Better Approach:**
- Use DORA metrics for team improvement
- Celebrate progress, not perfection
- Focus on continuous improvement

### 4. SPACE Metrics Misapplication

**SPACE Framework**:
- **S**atisfaction and wellbeing
- **P**erformance
- **A**ctivity
- **C**ommunication and collaboration
- **E**fficiency and flow

**The Problem:**
- Cherry-picking metrics that look good
- Ignoring satisfaction and wellbeing
- Using activity metrics as productivity indicators

**Better Approach:**
- Balanced measurement across all dimensions
- Regular developer satisfaction surveys
- Address issues raised by metrics

### 5. Rigid SLOs (Service Level Objectives)

**The Problem:**
- Unrealistic expectations without team input
- No room for innovation or experimentation
- Punishing failures in learning

**Better Approach:**
- Collaborative SLO setting
- Error budgets for innovation
- Blameless post-mortems

### 6. Excessive Code Review Checklists

**The Problem:**
- 50+ item checklists slow reviews
- Focus on trivial formatting over logic
- Discourages refactoring

**Better Approach:**
- Automated linting and formatting
- Focus reviews on architecture and logic
- Trust your team's judgment

### 7. Choosing Tools: Productivity vs Cost

**The Problem:**
- Penny-wise, pound-foolish tool decisions
- Forcing developers to use inferior tools
- Not considering developer time as cost

**Better Approach:**
- Calculate total cost including developer time
- Invest in tools that boost productivity
- Let developers choose their IDE/editor

### 8. Identify or (Fix or Delete)

**The Problem:**
- Endless technical debt backlog
- No actual plan to address issues
- "Identify" becomes "ignore"

**Better Approach:**
- Make a decision: fix it, delete it, or accept it
- Allocate time for technical debt
- Stop just identifying problems

### 9. Disrupting Development Flow

**The Problem:**
- Constant meetings and interruptions
- No focused work time
- Context switching every 30 minutes

**Better Approach:**
- Block focus time (no meetings)
- Async communication by default
- Respect "do not disturb" status

### 10. Not Protecting Learning Time

**The Problem:**
- No time for skill development
- Falling behind on technology
- Stagnant careers

**Better Approach:**
- Dedicated learning time (20% time)
- Conference attendance budget
- Internal knowledge sharing sessions

---

## Session 3: Coding with Cursor

Cursor is an AI-powered IDE that's revolutionizing how developers write code:

**Key Features:**
- AI pair programming
- Context-aware code suggestions
- Natural language to code conversion
- Codebase-wide refactoring assistance

**Best Practices:**
- Use it for boilerplate reduction
- Let AI handle repetitive tasks
- Review AI suggestions critically
- Maintain code ownership and understanding

---

## Session 4: Async PHP with Fibers

PHP 8.1 introduced Fibers, enabling true asynchronous programming:

### Local Async

**Definition:** Async operations within a single process

```php
$fiber = new Fiber(function (): void {
    $value = Fiber::suspend('fiber');
    echo "Value used to resume fiber: ", $value, PHP_EOL;
});

$value = $fiber->start();
echo "Value from fiber suspending: ", $value, PHP_EOL;

$fiber->resume('test');
```

**Use Cases:**
- Non-blocking I/O operations
- Concurrent database queries
- Parallel API calls

### Global Async

**Definition:** Async operations across multiple processes or services

**Patterns:**
- Message queues (Laravel Queues)
- Event-driven architecture
- Microservices communication

### PHP 8.1 Fibers Deep Dive

Fibers provide:
- Lightweight concurrency
- Better than callbacks or promises
- Full stack traces
- Exception handling

**Example with Async Database:**
```php
use Amp\Mysql\MysqlConfig;
use Amp\Mysql\MysqlConnectionPool;

$config = MysqlConfig::fromString("host=localhost user=root db=test");
$pool = new MysqlConnectionPool($config);

$fiber1 = new Fiber(function() use ($pool) {
    $result = $pool->query("SELECT * FROM users");
    return $result->fetchAll();
});

$fiber2 = new Fiber(function() use ($pool) {
    $result = $pool->query("SELECT * FROM posts");
    return $result->fetchAll();
});

// Start both queries concurrently
$fiber1->start();
$fiber2->start();
```

---

## Session 5: Generics in PHP

While PHP doesn't have native generic support, we can use PHPDoc to achieve type safety:

### Using PHPDoc for Generics

**Goal:** Make a function accept parameters and return the same type

```php
/**
 * @template T
 * @param T $value
 * @return T
 */
function identity($value) {
    return $value;
}

// Static analysis tools understand this
$result = identity("hello"); // string
$number = identity(42);       // int
```

### Declaring Generics

**Three Components:**
1. **@template** - Declare the generic type variable
2. **@param** - Specify parameter types using template
3. **@return** - Specify return type using template

**Collection Example:**
```php
/**
 * @template T
 */
class Collection {
    /** @var array<T> */
    private array $items = [];
    
    /**
     * @param T $item
     */
    public function add($item): void {
        $this->items[] = $item;
    }
    
    /**
     * @return T|null
     */
    public function first() {
        return $this->items[0] ?? null;
    }
    
    /**
     * @return array<T>
     */
    public function all(): array {
        return $this->items;
    }
}

// Usage with static analysis
/** @var Collection<User> */
$users = new Collection();
$users->add(new User()); // OK
$users->add("string");    // Static analysis error!
```

**Repository Pattern with Generics:**
```php
/**
 * @template T of Model
 */
abstract class Repository {
    /**
     * @param int $id
     * @return T|null
     */
    public function find(int $id) {
        return $this->getModel()::find($id);
    }
    
    /**
     * @return class-string<T>
     */
    abstract protected function getModel(): string;
}

/**
 * @extends Repository<User>
 */
class UserRepository extends Repository {
    protected function getModel(): string {
        return User::class;
    }
}
```

---

## Session 6: Laravel & Kubernetes

Running Laravel on Kubernetes provides:

**Benefits:**
- Horizontal scaling
- Rolling deployments
- Self-healing
- Resource optimization
- Multi-environment management

**Key Considerations:**
- Session management (Redis/Database)
- File storage (S3/persistent volumes)
- Queue workers (separate pods)
- Scheduled tasks (CronJobs)
- Cache (Redis/Memcached)

---

## Session 7: Demystifying Job Batches

Laravel's job batching allows you to execute a group of jobs and perform actions when they all complete:

### Basic Batch
```php
use Illuminate\Support\Facades\Bus;

Bus::batch([
    new ProcessPodcast($podcast),
    new ProcessPodcast($podcast),
    new ProcessPodcast($podcast),
])->then(function (Batch $batch) {
    // All jobs completed successfully
})->catch(function (Batch $batch, Throwable $e) {
    // First batch job failure detected
})->finally(function (Batch $batch) {
    // The batch has finished executing
})->dispatch();
```

### Batch Chains
```php
Bus::batch([
    [
        new ProcessPodcast($podcast),
        new OptimizePodcast($podcast),
    ],
    [
        new ProcessPodcast($podcast),
        new OptimizePodcast($podcast),
    ],
])->then(function (Batch $batch) {
    //
})->dispatch();
```

### Batch Callbacks
- `then()` - All jobs succeeded
- `catch()` - First failure
- `finally()` - Always runs
- `allowFailures()` - Continue on failures

---

## Session 8: Nightwatch

### Why Errors Exist

Nightwatch focuses on understanding error patterns:

**Common Causes:**
- Race conditions
- Missing validation
- Inadequate testing
- Unclear requirements
- Poor error handling

**Prevention Strategies:**
- Comprehensive testing
- Clear specifications
- Code reviews
- Monitoring and alerting
- Post-mortem analysis

---

# Day 2

---

---

# Day 2

---

## Session 1: Laravel Cloud - Deep Architecture Dive

### Three-Tier Architecture

Laravel Cloud uses a clean separation of concerns:

```
┌──────────────┐
│   Web App    │ - Customer-facing application
└──────┬───────┘
       │
┌──────┴───────┐
│Build Service │ - CI/CD pipeline
└──────┬───────┘
       │
┌──────┴───────┐
│   Compute    │ - Application containers
└──────────────┘
```

### Action Pattern

**Definition:** Single-purpose classes that encapsulate business logic

```php
class CreateUserAction
{
    public function execute(array $data): User
    {
        DB::beginTransaction();
        
        try {
            $user = User::create($data);
            $user->sendWelcomeEmail();
            
            DB::commit();
            return $user;
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}

// Usage
$user = app(CreateUserAction::class)->execute([
    'name' => 'John Doe',
    'email' => 'john@example.com',
]);
```

**Benefits:**
- Single responsibility
- Easily testable
- Reusable logic
- Clear intent

### WebSockets & Events

**Architecture:**
```
User Action → Event → WebSocket → Real-time Update
```

**Implementation:**
```php
// Broadcast event
broadcast(new OrderShipped($order));

// Listen in frontend
Echo.channel('orders')
    .listen('OrderShipped', (e) => {
        console.log(e.order);
    });
```

### Fakes for Testing

Use **contract-based testing** with two implementations:

**1. Production Contract:**
```php
interface PaymentGateway
{
    public function charge(int $amount): PaymentResult;
}

class StripeGateway implements PaymentGateway
{
    public function charge(int $amount): PaymentResult
    {
        // Real Stripe API call
    }
}
```

**2. Fake Contract for Testing:**
```php
class FakePaymentGateway implements PaymentGateway
{
    public array $charges = [];
    
    public function charge(int $amount): PaymentResult
    {
        $this->charges[] = $amount;
        return new PaymentResult(success: true);
    }
    
    public function assertCharged(int $amount): void
    {
        Assert::contains($amount, $this->charges);
    }
}

// In tests
test('charges customer', function () {
    $fake = new FakePaymentGateway();
    app()->instance(PaymentGateway::class, $fake);
    
    $service = new PaymentService();
    $service->processPayment(1000);
    
    $fake->assertCharged(1000);
});
```

### Quality Tools

**Pest** - Testing framework
```bash
pest --parallel
```

**Stan** - Static analysis
```bash
phpstan analyse --level=9
```

**Pint** - Code style fixer
```bash
pint
```

### Event Sourcing

Store events, not state:

```php
class OrderEventStore
{
    public function recordEvent(OrderEvent $event): void
    {
        DB::table('order_events')->insert([
            'order_id' => $event->orderId,
            'event_type' => get_class($event),
            'payload' => json_encode($event->toArray()),
            'created_at' => now(),
        ]);
    }
    
    public function reconstituteOrder(int $orderId): Order
    {
        $events = DB::table('order_events')
            ->where('order_id', $orderId)
            ->orderBy('created_at')
            ->get();
            
        $order = new Order($orderId);
        
        foreach ($events as $event) {
            $order->apply(unserialize($event->payload));
        }
        
        return $order;
    }
}
```

### Job Orchestration Pattern

**1 Job Firing Multiple Smaller Jobs:**

```php
class ProcessLargeDataset implements ShouldQueue
{
    public function handle()
    {
        $chunks = $this->getDataChunks();
        
        $jobs = [];
        foreach ($chunks as $chunk) {
            $jobs[] = new ProcessChunk($chunk);
        }
        
        Bus::batch($jobs)
            ->then(function (Batch $batch) {
                // All chunks processed
                $this->sendCompletionNotification();
            })
            ->dispatch();
    }
}
```

---

## Session 2: PIE - PHP Extension Installer

### What is PIE?

**PIE** (PHP Extension Installer) revolutionizes PHP extension management:

**Key Difference from Composer:**
- **Composer**: Manages PHP packages per-project
- **PIE**: Installs PHP extensions per PHP version system-wide

### Installation

```bash
# Install PIE
composer global require php/pie

# Don't run as root!
```

### Configuration

Extensions are configured through `composer.json`:

```json
{
    "extra": {
        "pie": {
            "extensions": {
                "redis": "^5.3",
                "imagick": "^3.7"
            }
        }
    }
}
```

### Usage

```bash
# Install extension for current PHP version
pie install redis

# Install specific version
pie install redis:5.3.7

# List installed extensions
pie list

# Remove extension
pie remove redis
```

### Submission Process

**1. Submit to Packagist:**
```bash
# Your extension must be on Packagist
pie submit myextension
```

**2. Windows Build:**
- PIE automatically creates Windows binaries
- Cross-platform support out of the box

**3. Version Targeting:**
```bash
# Install for specific PHP version
pie install --php=8.2 redis
```

### Benefits

- Simplified extension management
- Version control for extensions
- Cross-platform support
- No manual compilation needed
- Consistent across environments

---

## Session 3: Optimizing with Inertia.js

### Inertia merge() and deepMerge()

**For Infinite Scrolling:**

```javascript
// Using merge for paginated data
router.reload({
    only: ['posts'],
    preserveState: true,
    onSuccess: (page) => {
        page.props.posts.data = [
            ...existingPosts,
            ...page.props.posts.data
        ]
    }
})

// Deep merge for nested structures
router.reload({
    only: ['comments'],
    preserveState: 'merge-deep',
})
```

### WhenVisible Component

**Lazy Load Components:**

```vue
<template>
    <WhenVisible>
        <HeavyComponent :data="expensiveData" />
    </WhenVisible>
</template>

<script setup>
import { WhenVisible } from '@inertiajs/vue3'
</script>
```

This component only renders when scrolled into view.

### Always, Buffer, Params Props

```javascript
// Always include certain props
router.visit(url, {
    only: ['posts'],
    preserveState: true,
    // Always fetch user data
    always: ['user'],
})

// Buffer multiple requests
router.visit(url, {
    buffer: true, // Waits 150ms to batch requests
})

// Custom params
router.visit(url, {
    params: {
        filter: 'active',
        sort: 'created_at'
    }
})
```

### Refreshing Without Polling

**Using Laravel Reverb + Broadcasting:**

```php
// Backend - broadcast change
broadcast(new PostUpdated($post));
```

```javascript
// Frontend - listen and refresh
Echo.channel('posts')
    .listen('PostUpdated', (e) => {
        router.reload({ only: ['posts'] })
    })
```

### Inertia Reload and Replace

```javascript
// Reload current page
router.reload()

// Reload specific props only
router.reload({ only: ['posts'] })

// Replace (don't add to history)
router.replace(url, {
    preserveState: true
})
```

### WebSockets, Reverb & Broadcasting

**Complete Flow for Notifications:**

```php
// 1. Define broadcast event
class NewNotification implements ShouldBroadcast
{
    public function broadcastOn()
    {
        return new PrivateChannel('user.' . $this->userId);
    }
}

// 2. Broadcast
broadcast(new NewNotification($user->id));
```

```javascript
// 3. Listen in frontend
Echo.private(`user.${userId}`)
    .listen('NewNotification', (e) => {
        // Show notification
        toast.success(e.message)
        
        // Refresh notifications count
        router.reload({ only: ['notificationsCount'] })
    })
```

**Benefits:**
- Real-time updates
- No polling needed
- Better user experience
- Lower server load

---

## Session 4: Model Context Protocol (MCP)

### What is MCP?

**MCP** (Model Context Protocol) is a specification for AI models to interact with external tools and data sources.

**Just a Spec:** Like HTTP or WebSockets, MCP is a standard protocol.

### MCP Components

**1. Markdown File + JSON File:**

```markdown
# My Tool

Provides weather information

## Usage
Get weather for a city
```

```json
{
    "name": "weather-tool",
    "description": "Get weather information",
    "inputSchema": {
        "type": "object",
        "properties": {
            "city": {
                "type": "string"
            }
        }
    }
}
```

### Croft MCP Server

A Laravel package for creating MCP servers:

```php
use Croft\Mcp\McpServer;

$server = new McpServer();
$server->addTool(new WeatherTool());
$server->start();
```

### JSON-RPC for MCP

MCP uses JSON-RPC 2.0 protocol:

```json
{
    "jsonrpc": "2.0",
    "method": "tools/call",
    "params": {
        "name": "weather",
        "arguments": {
            "city": "London"
        }
    },
    "id": 1
}
```

### MCP Transports

**Three transport methods:**
1. **stdio** - Standard input/output
2. **HTTP** - REST API
3. **WebSocket** - Real-time bidirectional

### MCP Authentication

**OAuth 2.1 Support:**

```php
$server->enableOAuth([
    'client_id' => env('MCP_CLIENT_ID'),
    'client_secret' => env('MCP_CLIENT_SECRET'),
    'redirect_uri' => 'https://your-app.com/oauth/callback',
]);
```

### MCP Architecture

```
┌──────────────┐
│   MCP Host   │ - Manages connections
└──────┬───────┘
       │
┌──────┴───────┐
│  MCP Client  │ - Makes requests
└──────┬───────┘
       │
┌──────┴───────┐
│   MCP Tools  │ - Takes actions
└──────────────┘
```

### MCP Tools

**Allow AI to take actions:**

```php
class CreateTaskTool implements McpTool
{
    public function name(): string
    {
        return 'create_task';
    }
    
    public function execute(array $params): array
    {
        $task = Task::create([
            'title' => $params['title'],
            'description' => $params['description'],
        ]);
        
        return ['task_id' => $task->id];
    }
}
```

### MCP Resources

**Server makes data available to client:**

```php
class DocumentResource implements McpResource
{
    public function uri(): string
    {
        return 'document://12345';
    }
    
    public function fetch(): string
    {
        return Document::find(12345)->content;
    }
}
```

### MCP Prompts

**Pre-defined prompts for common tasks:**

```json
{
    "name": "summarize-document",
    "description": "Summarize a document",
    "prompt": "Please provide a concise summary of {{document}}"
}
```

### MCP JSON Schema

**Define tool inputs:**

```json
{
    "type": "object",
    "properties": {
        "query": {
            "type": "string",
            "description": "Search query"
        },
        "limit": {
            "type": "number",
            "default": 10
        }
    },
    "required": ["query"]
}
```

---

## Session 5: Testing Strategies

### Flaky Tests

**Definition:** Tests that sometimes pass and sometimes fail without code changes.

**Common Causes:**
- Race conditions
- Time-dependent logic
- External dependencies
- Random data
- Shared state

**Solutions:**

```php
// Bad: Time-dependent
test('user created today', function () {
    $user = User::factory()->create();
    expect($user->created_at->isToday())->toBeTrue();
});

// Good: Freeze time
test('user created today', function () {
    Carbon::setTestNow('2025-01-15 10:00:00');
    
    $user = User::factory()->create();
    expect($user->created_at->is('2025-01-15 10:00:00'))->toBeTrue();
});

// Bad: Random data
test('generates unique code', function () {
    $code = generateCode();
    expect(strlen($code))->toBe(6);
});

// Good: Seed random
test('generates unique code', function () {
    srand(12345); // Seed for consistency
    $code = generateCode();
    expect($code)->toBe('ABC123');
});
```

### Allure Testing Tool

**Allure** provides beautiful test reports with:
- Test execution history
- Flaky test detection
- Performance metrics
- Failure categorization

**Integration with CircleCI:**

```yaml
# .circleci/config.yml
version: 2.1

jobs:
  test:
    steps:
      - checkout
      - run: composer install
      - run: php artisan test --log-junit=test-results/junit.xml
      - run: allure generate test-results --clean
      - store_artifacts:
          path: allure-report
          destination: allure-report
```

**Benefits:**
- Visual test trends
- Identify flaky tests automatically
- Historical comparison
- Detailed failure analysis

---

## Session 6: Advanced Cache Strategies

### Cache Around Us (Infrastructure Level)

Before application caching:

- **Follow Framework Conventions**: Leverage Laravel's built-in patterns and structures
- **Action Pattern for Reusable Logic**: Encapsulate business logic in dedicated action classes
- **Fakes for Local Development & Testing**: Use Laravel's fake implementations for external services
- **Code Quality**: Maintain 99.3% test coverage

### Infrastructure Strategy

#### Hyperscaler Selection

After evaluating various options:

- **Hyperscaler?** → AWS
- **Lambda?** → Too many limitations
- **Kubernetes** → FTW (For The Win)

The team chose AWS with Kubernetes (EKS) for full control and flexibility.

#### Account Sharding Architecture

```
AWS Account Sharding Configuration
→ One AWS account per EKS cluster
→ Separate accounts for:
  - EKS Clusters (multiple environments)
  - Networking
  - Tooling
  - Web app
  - Build service
  - Logging
```

**Benefits:**
- Better security boundaries
- Resource isolation
- Easier cost tracking per environment

### Networking Configuration

**RAM Shared VPC** architecture provides:

```
┌─────────────────────────────────────────────┐
│  Networking (RAM Shared VPC)                │
│  Transit gateway and peering for connectivity│
│                                             │
│  ┌──────────────┐      ┌──────────────┐    │
│  │ EKS Clusters │◄────►│ Transit      │    │
│  │              │      │ Gateway      │    │
│  └──────────────┘      └──────┬───────┘    │
│         │                     │            │
│         ▼                     ▼            │
│  ┌──────────────┐      ┌──────────────┐    │
│  │ Web App      │      │ Build Service│    │
│  │ (VPC Peering)│      │ (VPC Peering)│    │
│  └──────────────┘      └──────────────┘    │
│                  ┌──────────────┐          │
│                  │   Tooling    │          │
│                  │   Logging    │          │
│                  └──────────────┘          │
└─────────────────────────────────────────────┘
```

### Routing Strategy

**Cloudflare Partnership**:
- Cloudflare tunnels route to Ingress → Nginx/Caddy
- Reduced overhead
- Improved reliability

```
User → Cloudflare → Tunnel → Ingress → Nginx/Caddy → EKS Clusters
```

### Customer Workloads

**Deployment Flow**:

```
SQS → App Operator → EKS Clusters → ECR

Deploy triggers SQS job
→ App operator builds and deploys
→ Reconcile loop ensures drift-free state
```

**Key Components:**
- SQS triggers deployment jobs
- App operator handles build and deploy
- Reconcile loop maintains consistency

### Billing Architecture

**Event-Sourced Laravel App**:
- Metrics ingested hourly → Lago (billing system)
- Retry-safe job model ensures reliability
- Clean separation of concerns

---

## Part 2: Understanding Caching

### Cache Around Us (Infrastructure Level)

Before application caching:

**Infrastructure Caching:**
- Static assets
- DNS resolution
- HTTP responses
- Redirects
- OAuth tokens
- CDNs
- Build pipelines
- Local storage
- Disk caching (RAM)

**Real World Caching:**
- Remembering phone numbers
- Keyboard shortcuts
- Browser bookmarks
- 199 open browser tabs (excessive!)
- Meal prepping
- Programmable thermostats
- Smart lights settings
- Packed toiletry bag

---

### Laravel Cache Strategies

#### 1. Basic Cache Operations

```php
// Returns cache instance
cache();

// Get value
cache('key');

// Put for 10 seconds
cache(['key', 'value'], 10);
```

#### 2. Cache::once() - Request-Scoped Caching

**Only lasts for current request:**

```php
// First call - executes callback
$result = Cache::once('expensive-operation', function () {
    return DB::table('users')->count();
});

// Second call in same request - returns cached value
$result = Cache::once('expensive-operation', function () {
    // This callback is NOT executed
    return DB::table('users')->count();
});
```

**Use Cases:**
- Prevent N+1 queries in views
- Cache computed values across Blade components
- Optimize repeated method calls

**Real Example:**
```php
class User extends Model
{
    public function getPermissions(): Collection
    {
        return Cache::once("user-{$this->id}-permissions", function () {
            return $this->roles()
                ->with('permissions')
                ->get()
                ->pluck('permissions')
                ->flatten()
                ->unique('id');
        });
    }
}

// Called 10 times in a view - only queries DB once per request
@foreach($users as $user)
    @if($user->getPermissions()->contains('edit'))
        <!-- Edit button -->
    @endif
@endforeach
```

#### 3. Cache Tagging

**Group related cache entries:**

```php
// Store with tags
Cache::tags(['users', 'admins'])->put('john', $john, $seconds);
Cache::tags(['users', 'admins'])->put('jane', $jane, $seconds);

// Retrieve with tags
$john = Cache::tags(['users'])->get('john');

// Flush all cache entries with specific tags
Cache::tags(['users'])->flush();
Cache::tags(['admins'])->flush();
```

**Use Cases:**
```php
// Cache all products in a category
Cache::tags(['products', "category-{$categoryId}"])
    ->put("product-{$productId}", $product, 3600);

// When category updates, flush all its products
Cache::tags(["category-{$categoryId}"])->flush();
```

**Multi-level Tagging:**
```php
Cache::tags(['posts', 'user-123', 'published'])
    ->put('user-123-published-posts', $posts, 3600);

// Flush all of user 123's cached data
Cache::tags(['user-123'])->flush();
```

#### 4. Atomic Locks

**Prevent race conditions with atomic operations:**

```php
use Illuminate\Support\Facades\Cache;

$lock = Cache::lock('process-order-' . $orderId, 10);

if ($lock->get()) {
    try {
        // Process order
        $order->process();
        $order->sendConfirmation();
    } finally {
        $lock->release();
    }
} else {
    // Could not acquire lock
    Log::warning("Order {$orderId} is already being processed");
}
```

**Block and Wait:**
```php
$lock = Cache::lock('api-rate-limit-' . $userId, 5);

// Wait up to 3 seconds to acquire lock
$lock->block(3, function () use ($userId) {
    // Make API call
    ApiService::call($userId);
});
```

**Advanced Lock Pattern:**
```php
Cache::lock('reservation-' . $code, 30)
    ->block(5, function () use ($reservation) {
        // Guaranteed exclusive access
        $reservation->confirm();
        $reservation->sendTickets();
    });
```

#### 5. Caching Objects

**Store entire objects, not just primitives:**

```php
// Cache Eloquent models
Cache::put('user-' . $id, User::find($id), 3600);

// Cache collections
Cache::put('active-users', User::where('active', true)->get(), 600);

// Cache DTOs
class PriceCalculation
{
    public function __construct(
        public int $basePrice,
        public int $tax,
        public int $total,
    ) {}
}

$calculation = new PriceCalculation(100, 20, 120);
Cache::put('price-calc-' . $orderId, $calculation, 1800);
```

**With Serialization:**
```php
use Illuminate\Contracts\Cache\Repository;

class ProductCache
{
    public function __construct(
        private Repository $cache
    ) {}
    
    public function getProduct(int $id): Product
    {
        return $this->cache->remember(
            "product-{$id}",
            3600,
            fn () => Product::with(['images', 'variants'])
                ->find($id)
        );
    }
    
    public function warmCache(Collection $products): void
    {
        $products->each(function (Product $product) {
            $this->cache->put(
                "product-{$product->id}",
                $product,
                3600
            );
        });
    }
}
```

**Cache Complex Structures:**
```php
class MenuCache
{
    public function getMenu(): array
    {
        return Cache::remember('site-menu', 86400, function () {
            return [
                'primary' => $this->buildPrimaryMenu(),
                'footer' => $this->buildFooterMenu(),
                'mobile' => $this->buildMobileMenu(),
            ];
        });
    }
    
    private function buildPrimaryMenu(): array
    {
        return MenuItem::query()
            ->where('location', 'primary')
            ->with('children')
            ->orderBy('order')
            ->get()
            ->toArray();
    }
}
```

### Complete Cache Strategy Example

```php
class UserService
{
    public function getUserProfile(int $userId): UserProfile
    {
        // 1. Try request cache first (once)
        return Cache::once("request-user-{$userId}", function () use ($userId) {
            
            // 2. Try tagged cache
            return Cache::tags(['users', "user-{$userId}"])
                ->remember("profile-{$userId}", 3600, function () use ($userId) {
                    
                    // 3. Acquire lock to prevent stampede
                    return Cache::lock("build-profile-{$userId}", 10)
                        ->block(5, function () use ($userId) {
                            
                            // 4. Build expensive profile
                            $user = User::with([
                                'roles.permissions',
                                'subscriptions',
                                'settings'
                            ])->findOrFail($userId);
                            
                            return new UserProfile($user);
                        });
                });
        });
    }
    
    public function invalidateUser(int $userId): void
    {
        // Flush all cache for this user
        Cache::tags(["user-{$userId}"])->flush();
    }
}
```

---

## Infrastructure & Caching: Complete Reference

### Cloud Infrastructure Recap

**Architecture:**
```
AWS Account Sharding
→ Kubernetes (EKS)  
→ RAM Shared VPC
→ Cloudflare Tunnels
→ Event-Sourced Billing (Lago)
```

**Quality Assurance:**
- Pest testing framework
- PHPStan (level 9)
- Laravel Pint
- 99.3% code coverage

**Deployment:**
- Action pattern for business logic
- Fakes for testing
- Job batching and orchestration
- WebSockets with Reverb



---

## Complete Conference Summary

### Day 1 Highlights

**Modern Development:**
- Filament's partial rendering for performance
- TipTap editor for rich content
- AI-assisted coding with Cursor
- Async PHP with Fibers

**Developer Productivity:**
- Avoid destructive practices (excessive on-call, velocity counting)
- Protect learning time and development flow
- Use metrics wisely (DORA, SPACE)
- Choose tools for productivity over cost

**Advanced PHP:**
- Generics with PHPDoc for type safety
- Repository patterns with templates
- PHP 8.1 Fibers for async operations

**Laravel Patterns:**
- Job batching and orchestration
- Kubernetes deployment strategies
- Understanding error patterns with Nightwatch

### Day 2 Highlights

**Laravel Cloud Architecture:**
- Three-tier architecture (Web App / Build Service / Compute)
- Action pattern for clean code
- WebSockets and real-time features
- Event sourcing for audit trails
- Contract-based testing with fakes

**Modern Tooling:**
- PIE for PHP extension management
- Pest, PHPStan, Pint for code quality
- Allure for test reporting
- CircleCI integration

**Frontend Optimization:**
- Inertia.js merge and deepMerge
- WhenVisible for lazy loading
- Reverb broadcasting for real-time updates
- Smart refresh strategies without polling

**AI & Automation:**
- Model Context Protocol (MCP) specification
- JSON-RPC for tool communication
- OAuth 2.1 authentication
- MCP tools, resources, and prompts

**Testing Excellence:**
- Identifying and fixing flaky tests
- Freezing time and seeding random data
- Visual test reports with Allure
- Historical test analysis

**Advanced Caching:**
- Request-scoped with Cache::once()
- Tagged caching for grouped invalidation
- Atomic locks to prevent race conditions
- Caching complex objects and DTOs

### Key Architectural Patterns

**1. Action Pattern**
```php
class ProcessPaymentAction
{
    public function execute(Order $order): PaymentResult
    {
        // Single responsibility
        // Easy to test
        // Reusable
    }
}
```

**2. Contract-Based Testing**
```php
interface PaymentGateway { }
class StripeGateway implements PaymentGateway { }
class FakePaymentGateway implements PaymentGateway { }
```

**3. Job Orchestration**
```php
Bus::batch($jobs)
    ->then(fn () => $this->complete())
    ->dispatch();
```

**4. Event Sourcing**
```php
$events->each(fn ($event) => $order->apply($event));
```

**5. Cache Layering**
```php
Cache::once('request', fn () =>
    Cache::tags(['users'])->remember('user', 3600, fn () =>
        Cache::lock('build-user')->block(5, fn () =>
            $this->buildExpensiveUserData()
        )
    )
);
```

### Technology Stack

**Backend:**
- PHP 8.1+ with Fibers
- Laravel 11
- Kubernetes (EKS)
- Laravel Reverb
- Event Sourcing
- PIE for extensions

**Frontend:**
- Inertia.js
- TipTap Editor
- Real-time WebSockets
- Filament Admin

**Infrastructure:**
- AWS with account sharding
- Kubernetes
- Cloudflare
- RAM Shared VPC
- Redis for caching/queues

**Testing & Quality:**
- Pest
- PHPStan Level 9
- Laravel Pint
- Allure Test Reports
- 99.3% code coverage

**AI & Automation:**
- Cursor IDE
- Model Context Protocol
- JSON-RPC

### Best Practices Checklist

**Developer Experience:**
- ✅ Limit on-call to <15% of time
- ✅ Use metrics for improvement, not punishment
- ✅ Protect focused development time
- ✅ Allocate 20% for learning
- ✅ Choose productivity over cost
- ✅ Fix or delete technical debt

**Code Quality:**
- ✅ Action pattern for business logic
- ✅ Contract-based testing
- ✅ 99%+ test coverage
- ✅ Static analysis (PHPStan level 9)
- ✅ Automated formatting (Pint)
- ✅ Generics via PHPDoc

**Architecture:**
- ✅ Event sourcing for audit trails
- ✅ Job batching for complex workflows
- ✅ WebSockets for real-time features
- ✅ Cache layering (once → tags → locks)
- ✅ Kubernetes for scalability

**Performance:**
- ✅ Partial rendering in admin panels
- ✅ Lazy loading with WhenVisible
- ✅ Cache warm for critical data
- ✅ Atomic locks prevent race conditions
- ✅ Tagged caching for smart invalidation

### Common Pitfalls to Avoid

**Organizational:**
- ❌ 25%+ on-call rotation
- ❌ Velocity as performance metric
- ❌ Misusing DORA/SPACE metrics
- ❌ Unrealistic SLOs without team input
- ❌ Excessive code review checklists
- ❌ Choosing tools based only on cost
- ❌ Identifying issues without fixing them
- ❌ Constant interruptions
- ❌ No protected learning time

**Technical:**
- ❌ Caching without invalidation strategy
- ❌ Race conditions in distributed systems
- ❌ Flaky tests due to time dependencies
- ❌ Over-caching causing stale data
- ❌ N+1 queries without request caching
- ❌ No job batching for complex workflows
- ❌ Synchronous operations that could be async

### Conference Resources

**Official Links:**
- Laravel Documentation: https://laravel.com/docs
- Filament: https://filamentphp.com
- Inertia.js: https://inertiajs.com
- Pest Testing: https://pestphp.com
- Laravel Reverb: https://reverb.laravel.com
- PIE: https://github.com/php/pie

**Tools Mentioned:**
- Cursor AI IDE
- PHPStan (Static Analysis)
- Laravel Pint (Code Formatting)
- Allure (Test Reporting)
- Lago (Billing System)
- Cloudflare Tunnels

---

## Conclusion

Laravel Live 2025 showcased the framework's evolution from a simple MVC framework to a comprehensive ecosystem for building modern, scalable applications. The two-day conference covered:

**Day 1** focused on developer productivity, modern PHP features (Fibers, Generics), and foundational patterns (Job Batches, Kubernetes deployment).

**Day 2** dove deep into Laravel Cloud architecture, cutting-edge tooling (PIE, MCP), frontend optimization with Inertia.js, and advanced caching strategies.

The overarching themes were:
1. **Developer Experience Matters** - Protect focus time, avoid destructive metrics
2. **Modern PHP is Powerful** - Fibers, generics, async capabilities
3. **Architecture for Scale** - Event sourcing, job orchestration, cache layering
4. **AI-Augmented Development** - Cursor, MCP, automated tooling
5. **Testing is Essential** - Fakes, Pest, Allure, high coverage

Whether you're building a small application or a large-scale SaaS platform, the patterns and practices shared at Laravel Live 2025 provide a roadmap for success. From infrastructure (Kubernetes, AWS) to code quality (PHPStan, Pest) to performance (caching strategies, Inertia optimization), every aspect of modern Laravel development was covered.

The Laravel ecosystem continues to evolve, embracing modern development practices while maintaining the elegant, developer-friendly API that made it popular. Laravel Live 2025 proved that Laravel isn't just keeping pace with modern development—it's leading the way.

---

*This comprehensive guide covers presentations from Laravel Live 2025 in London (June 10-11). For the latest updates and resources, visit the Laravel website and follow the Laravel community on social media.*

**Conference Sponsors**: Laravel, 20i, Jump24, Katapult, Propel, Agiledrop, Redberry

**Next Conference**: Laravel Live 2026 dates to be announced
