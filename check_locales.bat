@echo off
setlocal enabledelayedexpansion

REM Set the path to the jq executable we just downloaded
set JQ_PATH=C:\dev\donbrico-net\jq.exe

REM Get all keys from English
set EN_FILE=C:\dev\donbrico-net\locales\en.json
if not exist "%EN_FILE%" (
    echo Error: English file not found at %EN_FILE%
    exit /b 1
)

REM Get English keys using jq
for /f "usebackq delims=" %%k in (`"%JQ_PATH%" -r 'paths(scalars) | map(tostring) | join(".")' "%EN_FILE%"`) do (
    set "EN_KEYS[!random!]=%%k"
)

REM Count English keys
set /a EN_COUNT=0
for %%v in (EN_KEYS[*]) do set /a EN_COUNT+=1
echo English has %EN_COUNT% total keys.
echo.

REM Get list of language files (excluding English and backups)
set LOCALE_DIR=C:\dev\donbrico-net\locales
set LANGUAGE_FILES=
for %%f in ("%LOCALE_DIR%\*.json") do (
    set "FILE_NAME=%%~nf%%~xf"
    if not "!FILE_NAME:~0,2!"=="en" if not "!FILE_NAME:~-9!"==".backup" if not "!FILE_NAME:~-9!"==".original" (
        set LANGUAGE_FILES=!LANGUAGE_FILES! "!FILE_NAME!"
    )
)

REM Count language files
set /a LANG_COUNT=0
for %%f in (%LANGUAGE_FILES%) do set /a LANG_COUNT+=1
echo Checking translations for %LANG_COUNT% languages.
echo.

REM Check each language file
for %%f in (%LANGUAGE_FILES%) do (
    set "LANG_CODE=%%~nf"
    set "FILE_PATH=%LOCALE_DIR%\%%f"
    
    REM Get language keys using jq
    set "LANG_KEYS="
    for /f "usebackq delims=" %%k in (`"%JQ_PATH%" -r 'paths(scalars) | map(tostring) | join(".")' "!FILE_PATH!" 2^>nul`) do (
        set "LANG_KEYS[!random!]=%%k"
    )
    
    REM Count language keys
    set /a LANG_KEY_COUNT=0
    for %%v in (LANG_KEYS[*]) do set /a LANG_KEY_COUNT+=1
    
    REM Find missing keys
    set MISSING_KEYS=
    set /a MISSING_COUNT=0
    for %%v in (EN_KEYS[*]) do (
        set "KEY=%%v"
        set "FOUND=0"
        for %%w in (LANG_KEYS[*]) do (
            if "!%%w!"=="!KEY!" set "FOUND=1"
        )
        if !FOUND!==0 (
            set MISSING_KEYS=!MISSING_KEYS! !KEY!
            set /a MISSING_COUNT+=1
        )
    )
    
    if !MISSING_COUNT!==0 (
        echo ✗ !LANG_CODE!: Missing !MISSING_COUNT! keys:
        REM Show first 10 missing keys
        set /a SHOW_COUNT=0
        for %%k in (!MISSING_KEYS!) do (
            if !SHOW_COUNT! LSS 10 (
                echo   - %%k
                set /a SHOW_COUNT+=1
            )
        )
        if !MISSING_COUNT! GTR 10 (
            set /a MORE=!MISSING_COUNT!-10
            echo   ... and !MORE! more
        )
        echo.
    ) else (
        echo ✓ !LANG_CODE!: All keys present
        echo.
    )
)

endlocal