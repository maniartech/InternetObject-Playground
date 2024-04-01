#!/bin/bash

setup() {
  # Load the environment variables
  source ./.env.local

  # Check if TARGET_DIR is set
  if [ -z "$TARGET_DIR" ]; then
      echo "TARGET_DIR is not set in .env.local file"
      exit 1
  fi

  # Check if the target directory exists
  if [ ! -d "$TARGET_DIR" ]; then
      echo "Creating target directory: $TARGET_DIR"
      mkdir -p "$TARGET_DIR"
  else
      # Clean the target directory by removing all files
      echo "Cleaning target directory: $TARGET_DIR"
      rm -r "$TARGET_DIR"/*
  fi
}

build_playground() {
  # Build the playground
  yarn build

  # # Move files to the target directory
  cp -r build/* "$TARGET_DIR"
}

push_to_live() {
  # Change the to the target directory
  cd "$TARGET_DIR"

  # Check if there are any changes to deploy
  # if git status --porcelain | grep -q '^[AM]'; then
  if [ -n "$(git status --porcelain)" ]; then
    echo
    echo "Deploying the changes to the live site"
    echo "--------------------------------------"
    # Push the changes to the remote git repository
    git checkout live
    git add .
    git commit -m "Deployed on $(date +'%Y-%m-%d %H:%M:%S')"
    git push origin live

    echo "Deployment completed successfully"
    echo "Wait for a few seconds for the changes to reflect on"
    echo "https://play.internetobject.org/"

  else
    echo "No changes to deploy!"
  fi
}

setup
build_playground
push_to_live
