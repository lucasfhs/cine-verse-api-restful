function Generate-Secret {
    $bytes = New-Object byte[] 16  # 16 bytes = 32 hex chars
    [System.Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($bytes)
    return ([System.BitConverter]::ToString($bytes) -replace "-", "").ToLower()
}

# Ask the user to choose between development or production
$envType = Read-Host "Which environment do you want to configure? (dev/prod)"

if ($envType -eq "dev") {
    $envContent = @"
PORT=8080
MONGO_DB_URI=
NODE_ENV=development
ACCESS_TOKEN_SECRET=$(Generate-Secret)
ACCESS_TOKEN_EXPIRATION=15m
REFRESH_TOKEN_SECRET=$(Generate-Secret)
REFRESH_TOKEN_EXPIRATION=7d
COOKIE_SECURE=false
COOKIE_SAME_SITE=Strict
COOKIE_HTTP_ONLY=true
MESSAGE_SECRET_KEY=$(Generate-Secret)
REDIS_HOST=
REDIS_PORT=6379
REDIS_PASSWORD=
REDIS_DB=0
"@
} elseif ($envType -eq "prod") {
    $envContent = @"
PORT=8080
MONGO_DB_URI=mongodb://mongo:27017/expressApi
NODE_ENV=production
ACCESS_TOKEN_SECRET=$(Generate-Secret)
ACCESS_TOKEN_EXPIRATION=15m
REFRESH_TOKEN_SECRET=$(Generate-Secret)
REFRESH_TOKEN_EXPIRATION=7d
COOKIE_SECURE=true
COOKIE_SAME_SITE=Strict
COOKIE_HTTP_ONLY=true
MESSAGE_SECRET_KEY=$(Generate-Secret)
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_DB=0
REDIS_PASSWORD=
"@
} else {
    Write-Host "Invalid option. Please choose 'dev' or 'prod'."
    exit 1
}

Set-Content -Path ".env" -Value $envContent -Encoding UTF8
Write-Host ".env file for $envType has been created successfully!"