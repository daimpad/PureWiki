#!/usr/bin/env bash
# deploy.sh — Push core system files to wiki.nozilla.net via rsync.
# Private data directories (pages/, config/, cache/, backups/) are never
# touched. Run from the repo root after pulling the latest commits.
#
# Usage:
#   ./deploy.sh [user@host] [remote_path]
#
# Defaults:
#   REMOTE_HOST  — set SSH_USER and REMOTE_HOST env vars, or pass as args.
#   REMOTE_PATH  — absolute path on the server (e.g. /var/www/wiki)

set -euo pipefail

REMOTE_USER="${1:-${SSH_USER:-www-data}}"
REMOTE_HOST="${2:-${DEPLOY_HOST:-wiki.nozilla.net}}"
REMOTE_PATH="${3:-${DEPLOY_PATH:-/var/www/wiki}}"
SSH_TARGET="${REMOTE_USER}@${REMOTE_HOST}"

echo "==> Deploying to ${SSH_TARGET}:${REMOTE_PATH}"

# Sync core system files only.
# --delete removes stale files from the remote, but only within the
# transferred set — the excluded dirs are never touched.
rsync -avz --delete \
  --exclude='pages/' \
  --exclude='config/' \
  --exclude='cache/' \
  --exclude='backups/' \
  --exclude='Backups/' \
  --exclude='.git/' \
  --exclude='.github/' \
  --exclude='.dev/' \
  --exclude='deploy.sh' \
  --exclude='*.log' \
  --filter='protect pages/' \
  --filter='protect config/' \
  --filter='protect cache/' \
  --filter='protect backups/' \
  ./ "${SSH_TARGET}:${REMOTE_PATH}/"

echo "==> Deploy complete."

# Reload Apache to pick up any .htaccess changes (optional — remove if not needed).
# ssh "${SSH_TARGET}" "sudo systemctl reload apache2"
