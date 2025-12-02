#!/bin/bash
# Create storage directory if it doesn't exist
mkdir -p ${STORAGE_DIR:-/app/storage}

# Start the application
npm run start
