#!/bin/bash

# Load the .env file
source .env.deploy

# Check if TARGET_DIR is set
if [ -z "$TARGET_DIR" ]; then
    echo "TARGET_DIR is not set in .env file"
    exit 1
fi

# Check if the target directory exists
if [ ! -d "$TARGET_DIR" ]; then
    echo "Creating target directory: $TARGET_DIR"
    mkdir -p "$TARGET_DIR"
else
    # Clean the target directory by removing all files
    echo "Cleaning target directory: $TARGET_DIR"
    rm -f "$TARGET_DIR"/*
fi

# Build the plaground
yarn build

# # Move files to the target directory
mv ./build/* "$TARGET_DIR"

# Change the to the target directory
cd "$TARGET_DIR"

# Push the changes to the remote git repository
git add .
git commit -m "Deployed on $(date +'%Y-%m-%d %H:%M:%S')"
git push origin live
