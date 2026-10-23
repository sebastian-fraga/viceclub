<#
.SYNOPSIS
    Converts PNG images to WebP and adds a custom watermark to each one.

.DESCRIPTION
    For every .png file in <project root>/temp/convert, the script:
    1. Places the watermark in the top-left corner (32px offset),
        resized to fit 450x180 and at 60% opacity.
    2. Saves the result as .webp (quality 60) in
        <project root>/temp/convert/webp.

    The original PNGs are not modified. Existing .webp files with the
    same name in the output folder are overwritten.

.REQUIREMENTS
    - ImageMagick installed and available in PATH (the `magick` command).
    - A folder with the PNG images to convert:
        <project root>/temp/convert/
    - The watermark image:
        <project root>/public/assets/images/app/watermark.png
        (The project root is the parent folder of the script folder.)

.USAGE
    From a PowerShell terminal:
        ./scripts/Convert-Images.ps1

    If script execution is blocked by your policy:
        powershell -ExecutionPolicy Bypass -File ./scripts/Convert-Images.ps1

    The script waits for Enter at the end, so the window stays open
    when it is launched with a double click.
#>

$ErrorActionPreference = "Stop"

try {
    if (-not (Get-Command magick -ErrorAction SilentlyContinue)) {
        throw "ImageMagick is not installed or available in PATH."
    }

    $projectRoot = Split-Path $PSScriptRoot -Parent
    $inputDir = Join-Path $projectRoot "temp/convert"
    $watermark = Join-Path $projectRoot "public/assets/images/app/watermark.png"
    $outputDir = Join-Path $inputDir "webp"

    if (-not (Test-Path $inputDir -PathType Container)) {
        throw "Input directory not found: $inputDir"
    }

    if (-not (Test-Path $watermark -PathType Leaf)) {
        throw "Watermark not found: $watermark"
    }

    New-Item -ItemType Directory -Path $outputDir -Force |
    Out-Null

    $images = @(Get-ChildItem -Path $inputDir -File -Filter "*.png")

    if ($images.Count -eq 0) {
        throw "No PNG images ready to convert."
    }

    foreach ($image in $images) {
        $output = Join-Path $outputDir "$($image.BaseName).webp"

        $arguments = @(
            $image.FullName
            "("
            $watermark
            "-resize", "450x180"
            "-alpha", "set"
            "-channel", "A"
            "-evaluate", "multiply", "0.6"
            "+channel"
            ")"
            "-gravity", "northwest"
            "-geometry", "+32+32"
            "-composite"
            "-quality", "60"
            "-define", "webp:method=6"
            $output
        )

        & magick @arguments

        if ($LASTEXITCODE -ne 0) {
            throw "Error converting $($image.Name)."
        }

        $sizeKB = [math]::Round((Get-Item $output).Length / 1KB)

        Write-Host "Converted: $($image.Name) ($sizeKB KB)" -ForegroundColor Green
    }

    Write-Host "`nCompleted: $($images.Count) images converted." -ForegroundColor Cyan
}
catch {
    Write-Host "`nERROR: $_" -ForegroundColor Red
    exit 1
}
finally {
    Read-Host "Press Enter to exit"
}