@echo off
setlocal enabledelayedexpansion

REM Prima rinomina tutto con nomi temporanei
set t=1
for %%f in (*.jpg) do (
    ren "%%f" "temp_!t!.jpg"
    set /a t+=1
)

REM Ora rinomina in realizzazione_X.jpg senza conflitti
set i=1
for %%f in (temp_*.jpg) do (
    ren "%%f" "realizzazione_!i!.jpg"
    set /a i+=1
)

echo Fatto!
pause
