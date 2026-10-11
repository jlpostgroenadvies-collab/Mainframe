# Maakt een nieuwe factuur op basis van een eerdere factuur (sjabloon) en exporteert een PDF.
# Overschrijft NOOIT een bestaand bestand.
# Gebruik: powershell -NoProfile -ExecutionPolicy Bypass -File maak-factuur.ps1 -Invoer <pad naar json>
#
# JSON (UTF-8):
# {
#   "sjabloon": "...\\03 Facturatie\\Factuur 2026-002.xlsx",
#   "uitvoer":  "...\\03 Facturatie\\Factuur 2026-003.xlsx",      (PDF krijgt dezelfde naam)
#   "factuurnummer": "2026-003",
#   "factuurdatum": "2026-10-31",
#   "betaaltermijn_dagen": 30,
#   "klant": ["Naam", "Adres", "Postcode Plaats"],
#   "project": "",
#   "omschrijving": "Facturatie oktober 2026",
#   "regels": [ { "omschrijving": "week 41", "aantal": 6.5, "eenheid": "uur", "tarief": 55 } ]
# }
param([Parameter(Mandatory = $true)][string]$Invoer)
$ErrorActionPreference = 'Stop'

$d = Get-Content -Raw -Encoding UTF8 $Invoer | ConvertFrom-Json
# paden mogen met / in de JSON staan
$d.sjabloon = $d.sjabloon -replace '/', '\'
$d.uitvoer = $d.uitvoer -replace '/', '\'
$pdf = [IO.Path]::ChangeExtension($d.uitvoer, '.pdf')
if (Test-Path $d.uitvoer) { throw "Bestaat al, niet overschreven: $($d.uitvoer)" }
if (Test-Path $pdf) { throw "Bestaat al, niet overschreven: $pdf" }
if (@($d.regels).Count -gt 14) { throw "Maximaal 14 regels op de factuur (rij 18-31)." }
if (@($d.klant).Count -gt 3) { throw "Klantadres maximaal 3 regels." }

Copy-Item $d.sjabloon $d.uitvoer

$x = New-Object -ComObject Excel.Application
$x.Visible = $false; $x.DisplayAlerts = $false
try {
    $wb = $x.Workbooks.Open($d.uitvoer)
    $ws = $wb.Worksheets.Item(1)

    $ws.Range('F6').Value2 = 'info@jlpostgroenadvies.nl'
    $ws.Range('F10').NumberFormat = '@'
    $ws.Range('F10').Value2 = [string]$d.factuurnummer
    $datum = [datetime]::ParseExact($d.factuurdatum, 'yyyy-MM-dd', $null)
    $termijn = if ($d.betaaltermijn_dagen) { [int]$d.betaaltermijn_dagen } else { 30 }
    $ws.Range('F11').Value2 = $datum.ToOADate()
    $ws.Range('F12').Value2 = $datum.AddDays($termijn).ToOADate()
    $ws.Range('F13').Value2 = [string]$d.project

    foreach ($rij in 11..13) { $ws.Range("B$rij").MergeArea.ClearContents() | Out-Null }
    $i = 0
    foreach ($regel in @($d.klant)) { $ws.Range("B$(11 + $i)").Value2 = [string]$regel; $i++ }
    $ws.Range('B14').Value2 = [string]$d.omschrijving

    # oude regels leegmaken (formules in kolom G blijven staan)
    foreach ($rij in 18..31) { foreach ($kol in 'B', 'D', 'E', 'F') { $ws.Range("$kol$rij").MergeArea.ClearContents() | Out-Null } }
    # rij 31 heeft in sommige sjablonen geen formule; zelfde formule als rij 18-30 zetten
    $ws.Range('G31').Formula = '=IF(AND(D31="",F31=""),"",N(D31)*N(F31))'
    $ws.Range('G31').NumberFormat = $ws.Range('G30').NumberFormat
    $r = 18
    foreach ($regel in @($d.regels)) {
        $ws.Range("B$r").Value2 = [string]$regel.omschrijving
        $ws.Range("D$r").Value2 = [double]$regel.aantal
        $ws.Range("E$r").Value2 = [string]$regel.eenheid
        $ws.Range("F$r").Value2 = [double]$regel.tarief
        $r++
    }

    $x.CalculateFull()
    "Subtotaal: {0:N2}" -f $ws.Range('G32').Value2
    "Btw 21%:   {0:N2}" -f $ws.Range('G33').Value2
    "Totaal:    {0:N2}" -f $ws.Range('G34').Value2

    $wb.Save()
    $ws.ExportAsFixedFormat(0, $pdf)
    $wb.Close($false)
    "Opgeslagen: $($d.uitvoer)"
    "PDF:        $pdf"
}
finally {
    $x.Quit()
    [void][Runtime.InteropServices.Marshal]::ReleaseComObject($x)
}
