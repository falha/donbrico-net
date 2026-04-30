# Read the English JSON file
$enPath = "C:\dev\donbrico-net\locales\en.json"
$enContent = Get-Content $enPath -Raw | ConvertFrom-Json

# Function to flatten JSON object and get all keys with their paths
function Get-FlattenedKeys {
    param($obj, $prefix = "")
    $keys = @()
    foreach ($property in $obj.PSObject.Properties) {
        $keyName = if ($prefix) { "$prefix.$($property.Name)" } else { $property.Name }
        if ($property.Value -is [System.Management.Automation.PSCustomObject]) {
            $keys += Get-FlattenedKeys -obj $property.Value -prefix $keyName
        } else {
            $keys += $keyName
        }
    }
    return $keys
}

# Get all keys from English
$enKeys = Get-FlattenedKeys -obj $enContent

# Get list of language files (excluding English and backups)
$languageFiles = Get-ChildItem "C:\dev\donbrico-net\locales\*.json" | 
    Where-Object { 
        $_.Name -notmatch "en\.json" -and 
        $_.Name -notmatch "\.backup" -and 
        $_.Name -notmatch "\.original"
    } | 
    Select-Object -Expand Name

Write-Host ("Checking translations for {0} languages..." -f $languageFiles.Count)
Write-Host ("English has {0} total keys" -f $enKeys.Count)
Write-Host ("")

# Check each language file
foreach ($file in $languageFiles) {
    $langCode = $file -replace "\.json$", ""
    $filePath = "C:\dev\donbrico-net\locales\$file"
    
    try {
        $langContent = Get-Content $filePath -Raw | ConvertFrom-Json
        $langKeys = Get-FlattenedKeys -obj $langContent
        
        # Find missing keys
        $missingKeys = $enKeys | Where-Object { $_ -notin $langKeys }
        
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