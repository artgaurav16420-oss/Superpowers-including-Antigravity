
$f = Get-ChildItem -Path . -Filter SKILL.md -Recurse
foreach ($i in $f) {
    $c = [System.IO.File]::ReadAllText($i.FullName)
    $c = $c -replace '\r\n', ([char]10)
    $ls = $c.Split([char]10)
    $nl = New-Object System.Collections.Generic.List[string]
    $if = $false
    for ($j = 0; $j -lt $ls.Count; $j++) {
        $l = $ls[$j]
        if ($l.StartsWith(([char]96 + [char]96 + [char]96))) {
            $if = -not $if
            $nl.Add($l)
            continue
        }
        if ($if) {
            $nl.Add($l)
            continue
        }
        if ($l -like '#*') {
            if ($nl.Count -gt 0 -and $nl[-1].Trim().Length -gt 0) {
                $nl.Add('')
            }
            $nl.Add($l)
            if ($j + 1 -lt $ls.Count -and $ls[$j+1].Trim().Length -gt 0) {
                $nl.Add('')
            }
            continue
        }
        $nl.Add($l)
    }
    $res = [string]::Join([char]10, $nl)
    [System.IO.File]::WriteAllText($i.FullName, $res)
}
