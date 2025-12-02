#!/bin/bash
set -e

# Create storage directory
mkdir -p /app/storage

# Initialize database if tables don't exist
echo "Initializing database..."
node ./bin/db init \
  --dbname "${DATA_BASE}" \
  --dbhost "${RDS_HOST}" \
  --dbuser "${RDS_USERNAME}" \
  --dbpassword "${RDS_PASSWORD}" \
  --dbport "${RDS_PORT}" \
  --force || echo "Database init failed or already initialized"

# Start the server
echo "Starting CodePush server..."
npm run start
