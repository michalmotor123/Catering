@echo off
set MSG=%~1
if "%MSG%"=="" set MSG=Aktualizacja strony: %date% %time%
echo ========================================
echo 🚀 Rozpoczynanie procesu deploymentu...
echo ========================================
echo 📦 1. Dodawanie plikow (git add)...
git add .
echo ✍️ 2. Tworzenie commita: "%MSG%"...
git commit -m "%MSG%"
echo ⬆️ 3. Wysylanie zmian do GitHub (git push)...
git push origin main
echo ========================================
echo ✅ Gotowe! Wdrozenie zostanie uruchomione automatycznie na GitHub Pages.
echo ========================================
