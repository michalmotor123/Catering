param (
    [string]$msg = ""
)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Rozpoczynanie procesu deploymentu..." -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan

if ([string]::IsNullOrWhitespace($msg)) {
    $currentDate = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $msg = "Aktualizacja strony: $currentDate"
}

Write-Host "1. Dodawanie plikow (git add)..." -ForegroundColor Yellow
git add .

Write-Host "2. Tworzenie commita: $msg ..." -ForegroundColor Yellow
git commit -m "$msg"

Write-Host "3. Wysylanie zmian do GitHub (git push)..." -ForegroundColor Yellow
git push origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "Zmiany pomyslnie wyslane na GitHub!" -ForegroundColor Green
    Write-Host "GitHub Actions uruchomil automatyczne wdrazanie na GitHub Pages." -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Cyan
} else {
    Write-Host "Wystapil blad podczas wykonywania git push." -ForegroundColor Red
}
