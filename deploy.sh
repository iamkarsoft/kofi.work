#!/bin/sh
set -e

echo "Deploying application ..."
    # Update codebase
    git fetch origin master
    git reset --hard origin/master
    git pull origin master

echo "Application deployed!"
