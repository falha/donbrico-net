# Set the path to the jq executable we just downloaded
$jqPath = "C:\dev\donbrico-net\jq.exe"

# Function to get all key paths from a JSON file using jq
function Get-JsonKeys {
    param([string]$filePath)
    & $jqPath -r 'paths(scalars) | map(tostring) | join(".")' $filePath
}

# Get all keys from English
$enFile = "C:\dev\donbrico-net\locales\en.json"
if (-Not (Test-Path $enFile)) {
    Write-Host "Error: English file not found at $enFile" -ForegroundColor Red
    exit 1
}

$enKeys = Get-JsonKeys $enFile
Write-Host ("English has {0} total keys" -f ($enKeys | Measure-Object).Count)

# Get list of language files (excluding English and backups)
$localeDir = "C:\dev\donbrico-net\locales"
$languageFiles = Get-ChildItem $localeDir\*.json | 
    Where-Object { 
        $_.Name -notmatch "en\.json" -and 
        $_.Name -notmatch "\.backup" -and 
        $_.Name -notmatch "\.original"
    } | 
    Select-Object -Expand Name

Write-Host ("Checking translations for {0} languages..." -f $languageFiles.Count)
Write-Host ("")

# Check each language file
foreach ($file in $languageFiles) {
    $langCode = $file -replace "\.json$", ""
    $filePath = Join-Path $localeDir $file
    
    try {
        $langKeys = Get-JsonKeys $filePath
        $langKeysArray = $langKeys -split "`n"
        
        # Find missing keys
        $missingKeys = $enKeys | Where-Object { $_ -notin $langKeysArray }
        
        if ($missingKeys.Count -eq 0) {
            Write-Host ("✓ {0}: All keys present" -f $langCode) -ForegroundColor Green
        } else {
            Write-Host ("✗ {0}: Missing {1} keys:" -f $langCode, $missingKeys.Count) -ForegroundColor Red
            # Show first 10 missing keys
            $displayCount = [Math]::Min(10, $missingKeys.Count)
            for ($i = 0; $i -lt $displayCount; $i++) {
                Write-Host ("  - {0}" -f $missingKeys[$i])
            }
            if ($missingKeys.Count -gt 10) {
                Write-Host ("  ... and {0} more" -f ($missingKeys.Count - 10))
            }
            Write-Host ("")
        }
    } catch {
        Write-Host ("Error processing {0}: {1}" -f $file, $_.Exception.Message) -ForegroundColor Yellow
    }
}