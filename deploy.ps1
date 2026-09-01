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

Write-Host "1. Dodawanie zmienionych plikow (git add)..." -ForegroundColor Yellow
git add .

Write-Host "2. Tworzenie commita: $msg ..." -ForegroundColor Yellow
git commit -m "$msg"

Write-Host "3. Wysylanie zrodel do galezi main (git push origin main)..." -ForegroundColor Yellow
git push origin main

Write-Host "4. Publikacja strony z folderu src na GitHub Pages (gh-pages)..." -ForegroundColor Yellow
git subtree push --prefix src origin gh-pages

if ($LASTEXITCODE -eq 0) {
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "Strona zostala pomyslnie wyslana i opublikowana!" -ForegroundColor Green
    Write-Host "Adres strony: https://michalmotor123.github.io/Catering/" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Cyan
} else {
    Write-Host "Wystapil problem podczas publikacji na gh-pages." -ForegroundColor Red
}
