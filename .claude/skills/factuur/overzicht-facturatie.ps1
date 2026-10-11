# Overzicht facturatie: leest weekstaten en facturen (alleen lezen) en toont
# per week de uren en welke weken al gefactureerd zijn.
# Gebruik: powershell -NoProfile -ExecutionPolicy Bypass -File overzicht-facturatie.ps1
param(
    [string]$Basis = "$env:USERPROFILE\OneDrive - J.L. Post Groenadvies\J.L. Post Groenadvies"
)
$ErrorActionPreference = 'Stop'
$weekMap = Join-Path $Basis '02 Weekstaten'
$factMap = Join-Path $Basis '03 Facturatie'

$x = New-Object -ComObject Excel.Application
$x.Visible = $false; $x.DisplayAlerts = $false
try {
    "=== WEEKSTATEN ==="
    "jaar`tweek`topdracht`tproject`turen"
    Get-ChildItem $weekMap -Filter '*weekstaat*.xlsx' | Sort-Object Name | ForEach-Object {
        $jaar = if ($_.Name -match '^(\d{4})') { $Matches[1] } else { '?' }
        $wb = $x.Workbooks.Open($_.FullName, 0, $true)
        $ws = $wb.Worksheets.Item(1)
        $opdracht = ($ws.Range('A2').Text -replace '^OPDRACHT:\s*', '').Trim()
        $week = if ($ws.Range('A3').Text -match '(\d+)') { $Matches[1] } else { '?' }
        # kolom "Totaal uren" zoeken in rij 4
        $totKol = 0
        for ($k = 1; $k -le 40; $k++) { if ($ws.Cells.Item(4, $k).Text -match 'Totaal') { $totKol = $k; break } }
        $laatste = $ws.UsedRange.Row + $ws.UsedRange.Rows.Count - 1
        for ($r = 5; $r -le $laatste; $r++) {
            $proj = $ws.Cells.Item($r, 1).Text.Trim()
            if ($proj -eq '' -or $totKol -eq 0) { continue }
            $uren = [double]$ws.Cells.Item($r, $totKol).Value2
            if ($uren -ne 0) { "$jaar`t$week`t$opdracht`t$proj`t$uren" }
        }
        $wb.Close($false)
    }

    ""
    "=== FACTUREN ==="
    "nummer`tdatum`tklant`tregels (omschrijving=aantal)`tsubtotaal"
    Get-ChildItem $factMap -Filter 'Factuur *.xlsx' | Sort-Object Name | ForEach-Object {
        $wb = $x.Workbooks.Open($_.FullName, 0, $true)
        $ws = $wb.Worksheets.Item(1)
        $regels = @()
        for ($r = 18; $r -le 31; $r++) {
            $o = $ws.Range("B$r").Text.Trim()
            if ($o -ne '') { $regels += "$o=" + $ws.Range("D$r").Value2 }
        }
        "{0}`t{1}`t{2}`t{3}`t{4}" -f $ws.Range('F10').Text, $ws.Range('F11').Text, $ws.Range('B11').Text, ($regels -join '; '), $ws.Range('G32').Value2
        $wb.Close($false)
    }
}
finally {
    $x.Quit()
    [void][Runtime.InteropServices.Marshal]::ReleaseComObject($x)
}
