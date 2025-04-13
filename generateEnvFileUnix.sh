#!/bin/bash

# Gera uma chave segura para AES-256 (32 bytes em hex = 64 caracteres)
generate_secret() {
  openssl rand -hex 32
}

ACCESS_TOKEN_SECRET=$(generate_secret)
REFRESH_TOKEN_SECRET=$(generate_secret)
MESSAGE_SECRET_KEY=$(generate_secret)

cat <<EOF > .env
PORT=8080
MONGO_DB_URI=mongodb://mongo:27017/expressApi
NODE_ENV=development
ACCESS_TOKEN_SECRET=$ACCESS_TOKEN_SECRET
ACCESS_TOKEN_EXPIRATION=15m
REFRESH_TOKEN_SECRET=$REFRESH_TOKEN_SECRET
REFRESH_TOKEN_EXPIRATION=7d
COOKIE_SECURE=false
COOKIE_SAME_SITE=Strict
COOKIE_HTTP_ONLY=true
MESSAGE_SECRET_KEY=$MESSAGE_SECRET_KEY
EOF

echo ".env created!"
