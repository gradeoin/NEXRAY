#!/usr/bin/env bash
set -euo pipefail

ROOT="NEXRAY"
rm -rf "$ROOT" NEXRAY.zip
mkdir -p \
  "$ROOT/guide" \
  "$ROOT/css" \
  "$ROOT/js" \
  "$ROOT/assets/icons" \
  "$ROOT/assets/images" \
  "$ROOT/assets/three"

# ------------------------------
# IMPORTANT
# ------------------------------
# Due to chat message size limits, the complete project (all 7 stage pages + full CSS)
# cannot fit into a single message reliably.
#
# This bootstrap script creates the correct folder structure and then pulls the complete
# "project payload" from a single paste file you create locally in step 2.
#
# You will run:
#   bash build-nexray.sh payload.txt
#
# The payload.txt is a plain text file containing ALL files in a simple delimiter format.
#
# I am providing you the payload generator format below; once you paste my payload
# (which I will output next), it will create every file and zip it.
#
# ------------------------------

PAYLOAD="${1:-}"
if [[ -z "${PAYLOAD}" ]]; then
  echo "Usage: bash build-nexray.sh payload.txt"
  echo "Then it will generate ./NEXRAY and ./NEXRAY.zip"
  exit 1
fi
if [[ ! -f "${PAYLOAD}" ]]; then
  echo "Payload file not found: ${PAYLOAD}"
  exit 1
fi

# Payload format:
# ===FILE:path/to/file.ext===
# <file contents>
# ===END===

current=""
while IFS= read -r line || [[ -n "$line" ]]; do
  if [[ "$line" =~ ^===FILE:(.+)===$ ]]; then
    current="${BASH_REMATCH[1]}"
    mkdir -p "$(dirname "$ROOT/$current")"
    : > "$ROOT/$current"
    continue
  fi

  if [[ "$line" == "===END===" ]]; then
    current=""
    continue
  fi

  if [[ -n "$current" ]]; then
    printf "%s\n" "$line" >> "$ROOT/$current"
  fi
done < "$PAYLOAD"

# Build zip
if command -v zip >/dev/null 2>&1; then
  zip -r NEXRAY.zip "$ROOT" >/dev/null
  echo "✅ Created NEXRAY.zip"
else
  echo "⚠️ zip not installed. Install zip then run: zip -r NEXRAY.zip NEXRAY"
fi

echo "Done."