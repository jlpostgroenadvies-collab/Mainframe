# Maakt een lege weekstaat voor een week, op basis van de meest recente weekstaat
# (zelfde opdrachtgever en projectregels; uren en omschrijvingen leeg).
# Overschrijft NOOIT een bestaand bestand.
# Gebruik: powershell -NoProfile -ExecutionPolicy Bypass -File maak-weekstaat.ps1 -Week 41 [-Jaar 2026]
param(
    [Parameter(Mandatory = $true)][int]$Week,
    [int]$Jaar = (Get-Date).Year,
    [string]$Basis = "$env:USERPROFILE\OneDrive - J.L. Post Groenadvies\J.L. Post Groenadvies"
)
$ErrorActionPreference = 'Stop'
$map = Join-Path $Basis '02 Weekstaten'
$uitvoer = Join-Path $map ("{0} weekstaat wk {1} jp.xlsx" -f $Jaar, $Week)
if (Test-Path $uitvoer) { throw "Bestaat al, niet overschreven: $uitvoer" }

# meest recente weekstaat als sjabloon (hoogste jaar + weeknummer)
$sjabloon = Get-ChildItem $map -Filter '*weekstaat wk *.xlsx' |
    Where-Object { $_.Name -match '^(\d{4}) weekstaat wk (\d+)' } |
    Sort-Object { [int]($_.Name -replace '^(\d{4}).*', '$1') }, { [int]($_.Name -replace '^\d{4} weekstaat wk (\d+).*', '$1') } |
    Select-Object -Last 1
if (-not $sjabloon) { throw "Geen bestaande weekstaat gevonden in $map" }

# maandag van ISO-week
$jan4 = Get-Date -Year $Jaar -Month 1 -Day 4 -Hour 0 -Minute 0 -Second 0 -Millisecond 0
$dow = ([int]$jan4.DayOfWeek + 6) % 7          # maandag = 0
$maandag = $jan4.AddDays(-$dow + 7 * ($Week - 1)).Date

Copy-Item $sjabloon.FullName $uitvoer
$x = New-Object -ComObject Excel.Application
$x.Visible = $false; $x.DisplayAlerts = $false
try {
    $wb = $x.Workbooks.Open($uitvoer)
    $ws = $wb.Worksheets.Item(1)
    $ws.Range('A3').Value2 = "WEEK $Week"
    # datums in B4, D4, ..., N4
    for ($i = 0; $i -lt 7; $i++) { $ws.Cells.Item(4, 2 + 2 * $i).Value2 = $maandag.AddDays($i).ToOADate() }
    # uren en omschrijvingen leeg (kolom B t/m O), projectnamen en totaalformules blijven
    $laatste = $ws.UsedRange.Row + $ws.UsedRange.Rows.Count - 1
    if ($laatste -ge 5) { $ws.Range("B5:O$laatste").ClearContents() | Out-Null }
    $x.CalculateFull()
    $wb.Save()
    $wb.Close($false)
    "Sjabloon:  $($sjabloon.Name)"
    "Gemaakt:   $uitvoer"
    "Week $Week loopt van {0:d-M-yyyy} t/m {1:d-M-yyyy}" -f $maandag, $maandag.AddDays(6)
}
finally {
    $x.Quit()
    [void][Runtime.InteropServices.Marshal]::ReleaseComObject($x)
}
