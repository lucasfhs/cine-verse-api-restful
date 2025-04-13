function Generate-Secret {
    $bytes = New-Object byte[] 32
    [System.Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($bytes)
    return ([System.BitConverter]::ToString($bytes) -replace "-", "").ToLower()
}

$envContent = @"
PORT=8080
MONGO_DB_URI=mongodb://mongo:27017/expressApi
NODE_ENV=development
ACCESS_TOKEN_SECRET=$(Generate-Secret)
ACCESS_TOKEN_EXPIRATION=15m
REFRESH_TOKEN_SECRET=$(Generate-Secret)
REFRESH_TOKEN_EXPIRATION=7d
COOKIE_SECURE=false
COOKIE_SAME_SITE=Strict
COOKIE_HTTP_ONLY=true
MESSAGE_SECRET_KEY=$(Generate-Secret)
"@

Set-Content -Path ".env" -Value $envContent -Encoding UTF8

Write-Host ".env criado com sucesso!"
