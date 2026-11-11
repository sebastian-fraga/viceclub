<#
.SYNOPSIS
    Converts PNG/JPG/JPEG images to WebP and adds a custom watermark to each one.

.DESCRIPTION
    For every .png, .jpg or .jpeg file in <project root>/temp/convert-images, the script:
    1. Applies the EXIF orientation (so rotated photos end up upright).
    2. Places the watermark in the top-left corner (32px offset),
        resized to fit 450x180 and at 60% opacity.
    3. Saves the result as .webp (quality 60) in
        <project root>/temp/convert-images/webp.

    The original images are not modified. Existing .webp files with the
    same name in the output folder are overwritten. If two source images
    share the same name with different extensions (e.g. photo.png and
    photo.jpg), the script aborts to avoid overwriting one with the other.

.REQUIREMENTS
    - ImageMagick installed and available in PATH (the `magick` command).
    - A folder with the PNG/JPG/JPEG images to convert:
        <project root>/temp/convert-images/
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
    $inputDir = Join-Path $projectRoot "temp/convert-images"
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

    $images = @(Get-ChildItem -Path $inputDir -File | Where-Object { $_.Extension -in '.png', '.jpg', '.jpeg' })

    if ($images.Count -eq 0) {
        throw "No images ready to convert."
    }

    $duplicates = @($images | Group-Object BaseName | Where-Object Count -gt 1)

    if ($duplicates.Count -gt 0) {
        throw "Duplicate names would overwrite each other: $($duplicates.Name -join ', ')"
    }

    foreach ($image in $images) {
        $output = Join-Path $outputDir "$($image.BaseName).webp"

        $arguments = @(
            $image.FullName
            "-auto-orient"
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