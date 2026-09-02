@echo off
set MSG=%~1
if "%MSG%"=="" set MSG=Aktualizacja strony: %date% %time%
powershell -ExecutionPolicy Bypass -File "%~dp0deploy.ps1" -msg "%MSG%"

