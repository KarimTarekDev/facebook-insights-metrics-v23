#!/bin/bash

# Create GitHub Release Script for Facebook Insights Metrics v23 MCP Server
# This script helps create a GitHub release using the GitHub API

set -e

# Configuration
REPO_OWNER="KarimTarekDev"
REPO_NAME="facebook-insights-metrics-v23"
TAG="v1.0.0"
RELEASE_NAME="Facebook Insights Metrics v23 MCP Server v1.0.0"
DRAFT="false"
PRERELEASE="false"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Creating GitHub Release for ${REPO_NAME}${NC}"
echo ""

# Check if GitHub token is set
if [ -z "$GITHUB_TOKEN" ]; then
    echo -e "${RED}❌ Error: GITHUB_TOKEN environment variable is not set${NC}"
    echo ""
    echo "To create a release, you need to:"
    echo "1. Go to https://github.com/settings/tokens"
    echo "2. Generate a new token with 'repo' permissions"
    echo "3. Set the token: export GITHUB_TOKEN=your_token_here"
    echo "4. Run this script again"
    echo ""
    exit 1
fi

# Check if tag exists
echo -e "${YELLOW}🔍 Checking if tag ${TAG} exists...${NC}"
if git rev-parse "$TAG" >/dev/null 2>&1; then
    echo -e "${GREEN}✅ Tag ${TAG} exists${NC}"
else
    echo -e "${RED}❌ Tag ${TAG} does not exist${NC}"
    echo "Creating tag..."
    git tag -a "$TAG" -m "Release $TAG"
    git push origin "$TAG"
    echo -e "${GREEN}✅ Tag ${TAG} created and pushed${NC}"
fi

# Read release notes
RELEASE_NOTES=$(cat RELEASE_NOTES.md)

# Create the release
echo -e "${YELLOW}📝 Creating release...${NC}"

# Create release using GitHub API
RESPONSE=$(curl -s -X POST \
  -H "Authorization: token $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  "https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/releases" \
  -d "{
    \"tag_name\": \"$TAG\",
    \"target_commitish\": \"main\",
    \"name\": \"$RELEASE_NAME\",
    \"body\": \"$RELEASE_NOTES\",
    \"draft\": $DRAFT,
    \"prerelease\": $PRERELEASE
  }")

# Check if release was created successfully
if echo "$RESPONSE" | grep -q '"id"'; then
    RELEASE_URL=$(echo "$RESPONSE" | grep -o '"html_url": "[^"]*"' | cut -d'"' -f4)
    echo -e "${GREEN}✅ Release created successfully!${NC}"
    echo -e "${BLUE}🔗 Release URL: $RELEASE_URL${NC}"
    echo ""
    echo -e "${GREEN}🎉 Your release is now live!${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Visit the release URL to see your release"
    echo "2. Share the release with the community"
    echo "3. Consider publishing to NPM: npm publish"
else
    echo -e "${RED}❌ Failed to create release${NC}"
    echo "Response: $RESPONSE"
    exit 1
fi
