#!/bin/bash

generate_secret() {
    # 16 bytes = 32 hex chars
    secret=$(openssl rand -hex 16)
    echo "$secret"
}

# Ask the user to choose between development or production
read -p "Which environment do you want to configure? (dev/prod) " envType

if [ "$envType" = "dev" ]; then
    envContent="PORT=8080
MONGO_DB_URI=
NODE_ENV=development
ACCESS_TOKEN_SECRET=$(generate_secret)
ACCESS_TOKEN_EXPIRATION=15m
REFRESH_TOKEN_SECRET=$(generate_secret)
REFRESH_TOKEN_EXPIRATION=7d
COOKIE_SECURE=false
COOKIE_SAME_SITE=Strict
COOKIE_HTTP_ONLY=true
MESSAGE_SECRET_KEY=$(generate_secret)
REDIS_HOST=
REDIS_PORT=6379
REDIS_PASSWORD=
REDIS_DB=0"

elif [ "$envType" = "prod" ]; then
    envContent="PORT=8080
MONGO_DB_URI=mongodb://mongo:27017/expressApi
NODE_ENV=production
ACCESS_TOKEN_SECRET=$(generate_secret)
ACCESS_TOKEN_EXPIRATION=15m
REFRESH_TOKEN_SECRET=$(generate_secret)
REFRESH_TOKEN_EXPIRATION=7d
COOKIE_SECURE=true
COOKIE_SAME_SITE=Strict
COOKIE_HTTP_ONLY=true
MESSAGE_SECRET_KEY=$(generate_secret)
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_DB=0
REDIS_PASSWORD="

else
    echo "Invalid option. Please choose 'dev' or 'prod'."
    exit 1
fi

echo "$envContent" > .env
echo ".env file for $envType has been created successfully!"