@echo off
set MSG=%~1
if "%MSG%"=="" set MSG=Aktualizacja strony: %date% %time%
echo ========================================
echo Rozpoczynanie procesu deploymentu...
echo ========================================
echo 1. Dodawanie plikow (git add)...
git add .
echo 2. Tworzenie commita: "%MSG%"...
git commit -m "%MSG%"
echo 3. Wysylanie zrodel do main...
git push origin main
echo 4. Publikacja strony z folderu src na GitHub Pages (gh-pages)...
git subtree push --prefix src origin gh-pages
echo ========================================
echo Gotowe! Strona zostala opublikowana na GitHub Pages.
echo Adres: https://michalmotor123.github.io/Catering/
echo ========================================
