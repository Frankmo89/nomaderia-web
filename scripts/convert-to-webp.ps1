# Convierte JPG/JPEG a WebP para archivos >200KB en public/images
# Requiere: cwebp (recomendado) o ImageMagick (magick)
$folders = @("public\\images\\hero","public\\images\\parks")
Get-ChildItem -Path $folders -File -Recurse | Where-Object { $_.Length -gt 200KB } | ForEach-Object {
    $orig = $_.FullName
    $dest = [System.IO.Path]::ChangeExtension($orig, '.webp')
    if (Get-Command cwebp -ErrorAction SilentlyContinue) {
        Write-Host "Convirtiendo (cwebp): $orig -> $dest"
        & cwebp -q 75 -mt "$orig" -o "$dest"
    } elseif (Get-Command magick -ErrorAction SilentlyContinue) {
        Write-Host "Convirtiendo (magick): $orig -> $dest"
        & magick "$orig" -quality 75 "$dest"
    } else {
        Write-Host "Error: ni 'cwebp' ni 'magick' están disponibles en PATH. Instale uno e intente de nuevo."
        exit 1
    }
}

Write-Host "Conversión completada (siempre que cwebp/magick estén instalados)."