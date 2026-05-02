$files = Get-ChildItem -Path . -Filter SKILL.md -Recurse
foreach ($file in $files) {
    Write-Host "Cleaning fences in: $($file.FullName)"
    $content = [System.IO.File]::ReadAllText($file.FullName)
    $content = $content -replace "\r\n", ([char]10)
    $lines = $content.Split([char]10)
    $newLines = New-Object System.Collections.Generic.List[string]
    $inFence = $false
    
    for ($i = 0; $i -lt $lines.Count; $i++) {
        $line = $lines[$i]
        
        if ($line.StartsWith("```")) {
            $inFence = -not $inFence
            $newLines.Add($line)
            continue
        }
        
        # Skip empty lines only if inside a fence
        if ($inFence -and $line.Trim().Length -eq 0) {
            continue
        }
        
        $newLines.Add($line)
    }
    
    $finalContent = [string]::Join([char]10, $newLines)
    [System.IO.File]::WriteAllText($file.FullName, $finalContent)
}
