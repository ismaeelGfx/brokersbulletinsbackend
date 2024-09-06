#!/bin/bash

echo -e "Store puppeteer executable in cache\n"

# Create the .cache directory if it doesn't exist
mkdir -p ./.cache

# Check if the puppeteer directory exists before trying to move it
if [ -d "/app/.cache/puppeteer" ]; then
  mv /app/.cache/puppeteer ./.cache
else
  echo "Puppeteer cache directory not found, skipping move."
fi
