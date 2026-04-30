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

Write-Host "Checking translations for $($languageFiles.Count) languages..."
Write-Host "English has $($enKeys.Count) total keys"
Write-Host ""

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
            Write-Host "✓ $langCode: All keys present" -ForegroundColor Green
        } else {
            Write-Host "✗ $langCode: Missing $($missingKeys.Count) keys:" -ForegroundColor Red
            # Show first 10 missing keys
            $displayCount = [Math]::Min(10, $missingKeys.Count)
            for ($i = 0; $i -lt $displayCount; $i++) {
                Write-Host "  - $($missingKeys[$i])"
            }
            if ($missingKeys.Count -gt 10) {
                Write-Host "  ... and $($missingKeys.Count - 10) more"
            }
            Write-Host ""
        }
    } catch {
        Write-Host "Error processing $file: $_" -ForegroundColor Yellow
    }
}