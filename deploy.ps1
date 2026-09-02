param (
    [string]$msg = ""
)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Rozpoczynanie automatycznego deploymentu..." -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan

if ([string]::IsNullOrWhitespace($msg)) {
    $currentDate = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $msg = "Aktualizacja strony: $currentDate"
}

Write-Host "1. Kopiowanie plikow ze zrodel src do glownego katalogu..." -ForegroundColor Yellow
if (Test-Path "src/index.html") { Copy-Item "src/index.html" -Destination "." -Force }
if (Test-Path "src/catering.html") { Copy-Item "src/catering.html" -Destination "." -Force }
if (Test-Path "src/style.css") { Copy-Item "src/style.css" -Destination "." -Force }
if (Test-Path "src/script.js") { Copy-Item "src/script.js" -Destination "." -Force }

Write-Host "2. Dodawanie zmienionych plikow (git add)..." -ForegroundColor Yellow
git add .

Write-Host "3. Tworzenie commita: $msg ..." -ForegroundColor Yellow
$status = git status --porcelain
if ($status) {
    git commit -m "$msg"
} else {
    Write-Host "Brak nowych zmian do commitowania." -ForegroundColor DarkGray
}

Write-Host "4. Wysylanie zrodel do galezi main (git push origin main)..." -ForegroundColor Yellow
git push origin main

Write-Host "5. Publikacja strony na galezi gh-pages..." -ForegroundColor Yellow
try {
    $splitCommit = (git subtree split --prefix src main).Trim()
    if ($splitCommit) {
        git push origin "${splitCommit}:refs/heads/gh-pages" --force
    } else {
        git subtree push --prefix src origin gh-pages
    }
} catch {
    git subtree push --prefix src origin gh-pages
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Strona zostala pomyslnie wyslana i opublikowana!" -ForegroundColor Green
Write-Host "Adres strony: https://michalmotor123.github.io/Catering/" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
