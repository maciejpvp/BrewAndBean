#!/bin/bash
# scripts/deploy-s3-dev.sh - Build and upload to S3 for dev

BUCKET="ecommerce-website-dev"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

echo "🛠️  Starting build for dev..."
bash "$SCRIPT_DIR/build.sh" dev

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Aborting upload."
    exit 1
fi

echo "🚀 Uploading to S3 bucket: $BUCKET..."
# Syncing dist folder to S3. --delete ensures removed files are also removed from S3.
aws s3 sync "$PROJECT_ROOT/dist" "s3://$BUCKET" --delete

if [ $? -eq 0 ]; then
    echo "✅ Successfully deployed to S3: $BUCKET"
else
    echo "❌ S3 upload failed."
    exit 1
fi
