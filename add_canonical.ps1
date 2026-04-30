$basePath = "c:\dev\donbrico-net"
$domain = "https://donbrico.net"
Get-ChildItem -Path $basePath -Filter *.html -Recurse | ForEach-Object {
    $relativePath = $_.FullName.Substring($basePath.Length).Replace('\', '/')
    
    if ($relativePath.EndsWith('/index.html')) {
        $canonicalPath = $relativePath.Substring(0, $relativePath.Length - 10)
    } elseif ($relativePath -eq '/index.html') {
        $canonicalPath = '/'
    } else {
        $canonicalPath = $relativePath
    }
    
    $canonicalUrl = $domain + $canonicalPath
    $canonicalTag = '<link rel="canonical" href="' + $canonicalUrl + '">'
    
    $content = Get-Content $_.FullName -Raw
    if ($content -notmatch '<link[^>]*rel="canonical"') {
        $newContent = $content -replace '</head>', "
    $canonicalTag
</head>"
        Set-Content -Path $_.FullName -Value $newContent -NoNewline
        Write-Host "Updated $($_.FullName) with $canonicalUrl"
    } else {
        Write-Host "Skipped $($_.FullName)"
    }
}
