#!/bin/bash

set -e  # Exit immediately if a command exits with a non-zero status

# Path to package.json
PACKAGE_JSON_PATH="package.json"

# Extract the current version from package.json
CURRENT_VERSION=$(jq -r '.version' "$PACKAGE_JSON_PATH")

# Split the version into major, minor, and patch
IFS='.' read -r MAJOR MINOR PATCH <<< "$CURRENT_VERSION"

# Increment the patch version
NEW_PATCH=$((PATCH + 1))
NEW_VERSION="$MAJOR.$MINOR.$NEW_PATCH"

# Update the version in package.json
jq --arg version "$NEW_VERSION" '.version = $version' "$PACKAGE_JSON_PATH" > tmp.json && mv tmp.json "$PACKAGE_JSON_PATH"

# Commit the updated package.json
git add "$PACKAGE_JSON_PATH"
git commit -m "Release version $NEW_VERSION"

# Create and push a new tag
TAG="v$NEW_VERSION"
git tag -a "$TAG" -m "$TAG"
git push origin main
git push origin "$TAG"

# Output success message
echo "Successfully deployed version $NEW_VERSION as tag $TAG"
