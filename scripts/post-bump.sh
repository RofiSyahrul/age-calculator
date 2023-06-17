#!/usr/bin/env sh

APP_VERSION=$(awk -F'"' '/"version": ".+"/{ print $4; exit; }' package.json)

pnpm build:extension
git add .
git commit -m "chore: update archived build to v$APP_VERSION" --no-verify
