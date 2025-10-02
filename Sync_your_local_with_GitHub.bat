@echo off
setlocal ENABLEDELAYEDEXPANSION

set "PROJECT=C:\Users\g_ket\Documents\trust-atlas-ui"

rem --- Go to project directory ---
cd /d "%PROJECT%" || (
  echo [ERROR] Project folder not found: "%PROJECT%"
  echo Press any key to close...
  pause >nul
  exit /b 1
)

echo ===============================
echo   In folder: %CD%
echo ===============================

rem --- Sync with main ---
call git checkout main
call git pull origin main
if errorlevel 1 (
  echo [ERROR] Git commands failed. Fix errors above.
  echo Press any key to close...
  pause >nul
  exit /b 1
)

rem --- Install dependencies ---
call npm install
if errorlevel 1 (
  echo [ERROR] npm install failed. Fix errors above.
  echo Press any key to close...
  pause >nul
  exit /b 1
)

echo.
echo 🚀 Launching Vite dev server in a NEW window that stays open...
start "Vite Dev Server" cmd /k "cd /d %PROJECT% && npm run dev"

echo.
echo ✅ Done. A new window titled "Vite Dev Server" should now be open.
echo    This window will remain open until you press a key.
echo.
pause
