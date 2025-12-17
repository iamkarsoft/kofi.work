---
layout: post
title:  "A Practical CI/CD Git Flow for Web Apps"
date:   2025-12-17
categories: devops ci cd ai-explains
---

# A Practical CI/CD Git Flow for Web Apps

This guide explains a **clean, modern, and production-safe CI/CD workflow** using Git branches, tags, and releases. It is suitable for **web apps, websites, Laravel projects, and Shopify apps**.

---

## 1. Core Concepts

### Branches

* **`main` (or `master`)**

  * Always represents **production-ready code**
  * Must be deployable at any time

* **`develop`**

  * Integration branch for the **next release**
  * Automatically deployed to staging

* **`feature/*`**

  * Short-lived branches for features or fixes
  * Merged into `develop` via pull requests

* **`hotfix/*` (optional)**

  * Emergency fixes branched from `main`

---

### Tags

* A **tag** is a label pointing to an exact commit
* Used to mark **production versions**
* Example: `v1.4.0`

**Tags are for machines and automation.**

---

### Releases

* A **release** is a human-readable wrapper around a tag
* Contains:

  * Version number
  * Changelog
  * Release notes
  * Optional build artifacts

**Releases are for humans.**

---

## 2. High-Level Workflow

```text
feature/* branches
      |
      |  PR (tests + lint)
      v
   develop
      |
      |  auto-deploy
      v
   STAGING
      |
      |  merge when stable
      v
    main  ─────▶  TAG (v1.4.0)  ─────▶  PRODUCTION
                      |
                      └── GitHub Release
```

---

## 3. Branch-Level Visualization

```text
main ────────────────────────────────●────────●────────●──▶
                                      v1.3.0   v1.4.0   v1.4.1
                                       ↑        ↑        ↑
develop ─────────●────●────●──────────┘        │        │
                  ↑    ↑    ↑                   │        │
feature/login     |    |    |                   │        │
feature/cart      |    |    |                   │        │
feature/search ───┘    |    └───────────────────┘        │
                       └──────── hotfix/payment ─────────┘
```

---

## 4. Deployment Rules

| Event             | Action               |
| ----------------- | -------------------- |
| PR → `develop`    | Run tests & lint     |
| Merge → `develop` | Deploy to staging    |
| Tag on `main`     | Deploy to production |
| Hotfix tag        | Deploy to production |

---

## 5. CI/CD Templates (GitHub Actions)

### A. CI for Pull Requests

`.github/workflows/ci.yml`

```yaml
name: CI

on:
  pull_request:
    branches:
      - develop

jobs:
  tests:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup PHP
        uses: shivammathur/setup-php@v2
        with:
          php-version: '8.2'

      - name: Install dependencies
        run: composer install --no-interaction --prefer-dist

      - name: Run tests
        run: php artisan test

      - name: Lint
        run: composer lint || true
```

---

### B. Deploy to Staging

`.github/workflows/staging.yml`

```yaml
name: Deploy to Staging

on:
  push:
    branches:
      - develop

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Build app
        run: |
          composer install --no-dev --prefer-dist
          php artisan optimize

      - name: Deploy to staging
        run: |
          echo "Deploying to STAGING..."
```

---

### C. Deploy to Production via Tags

`.github/workflows/production.yml`

```yaml
name: Deploy to Production

on:
  push:
    tags:
      - 'v*'

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Build app
        run: |
          composer install --no-dev --prefer-dist
          php artisan optimize

      - name: Deploy to production
        run: |
          echo "Deploying to PRODUCTION..."
```

---

## 6. Creating a Release

### Manual (Recommended)

1. Merge `develop` → `main`
2. Create a tag:

```bash
git tag v1.4.0
git push origin v1.4.0
```

3. Create a GitHub/GitLab Release from the tag

---

### Automatic Release Notes (Optional)

```yaml
- name: Create GitHub Release
  uses: softprops/action-gh-release@v1
  with:
    generate_release_notes: true
```

---

## 7. Hotfix Flow

```text
main
  ↓
hotfix/checkout-bug
  ↓
main (tag v1.4.1)
  ↓
develop
```

Commands:

```bash
git checkout main
git checkout -b hotfix/checkout-bug
# fix bug
git commit -am "Fix checkout bug"
git checkout main
git merge hotfix/checkout-bug
git tag v1.4.1
git push origin main --tags
git checkout develop
git merge hotfix/checkout-bug
```

---

## 8. Versioning Rules (Semantic Versioning)

```text
vMAJOR.MINOR.PATCH
```

| Change          | Version |
| --------------- | ------- |
| New feature     | MINOR   |
| Bug fix         | PATCH   |
| Breaking change | MAJOR   |

---

## 9. Do You Always Need Releases?

### Skip releases if:

* Personal or experimental projects
* No production environment

### Use releases if:

* Client-facing apps
* Shopify apps
* Team-based development
* You want rollback capability

---

## 10. Simple Mental Model

> **Branches = work in progress**
> **Tags = exact production state**
> **Releases = documented production changes**

---

## 11. Optional Simplification

If this flow becomes too heavy, you can switch to **trunk-based development**:

```text
main + feature branches + tags
```

This guide, however, provides the best balance of **safety, clarity, and scalability** for most web applications.
