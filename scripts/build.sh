#!/bin/bash
# scripts/build.sh - Environment-specific build orchestrator

STAGE=$1
# Ensure the stages configuration is available
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/stages.sh"

case $STAGE in
    dev)   URL=$DEV_BASE_URL ;;
    stage) URL=$STAGE_BASE_URL ;;
    prod)  URL=$PROD_BASE_URL ;;
    *)     echo "Usage: $0 {dev|stage|prod}"; exit 1 ;;
esac

echo "🚀 Building for $STAGE..."
echo "🔗 Using BASE_URL: $URL"

npm run build

# Inject the URL into the built index.html
DIST_INDEX="dist/index.html"

if [ -f "$DIST_INDEX" ]; then
    echo "💉 Injecting BASE_URL into $DIST_INDEX..."
    
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # MacOS sed requires an empty string for the -i flag
        sed -i '' "s|globalThis.BASE_URL = '[^']*'|globalThis.BASE_URL = '$URL'|g" "$DIST_INDEX"
    else
        # Standard Linux sed
        sed -i "s|globalThis.BASE_URL = '[^']*'|globalThis.BASE_URL = '$URL'|g" "$DIST_INDEX"
    fi
    
    echo "✅ Successfully injected BASE_URL."
else
    echo "❌ Error: $DIST_INDEX not found. Build might have failed."
    exit 1
fi

echo "✨ Build complete for $STAGE! Output in /dist"
