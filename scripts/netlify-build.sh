#!/usr/bin/env bash
# Builds this branch (latest docs) at / and the 6.x branch at /6.x/.
set -euo pipefail

V6_BRANCH="6.x"
V6_DIR="$(mktemp -d)/v6"
DIST="docs/.vitepress/dist"

cleanup() { git worktree remove --force "$V6_DIR" 2>/dev/null || true; }
trap cleanup EXIT

npm run docs:build

git fetch --depth=1 origin "$V6_BRANCH"
git worktree add --detach "$V6_DIR" FETCH_HEAD
(cd "$V6_DIR" && npm ci && npm run docs:build)

rm -rf "$DIST/6.x"
cp -R "$V6_DIR/$DIST" "$DIST/6.x"
