from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path("assets")
MAX_EDGE = 2400
SUPPORTED = {".png", ".jpg", ".jpeg"}

def make_preview(source: Path) -> None:
    target = source.with_suffix(".webp")
    if target.exists():
        return
    with Image.open(source) as original:
        image = ImageOps.exif_transpose(original)
        has_alpha = "A" in image.getbands() or "transparency" in image.info
        image = image.convert("RGBA" if has_alpha else "RGB")
        image.thumbnail((MAX_EDGE, MAX_EDGE), Image.Resampling.LANCZOS)
        options = {
            "format": "WEBP",
            "method": 6,
            "exact": True,
        }
        if source.suffix.lower() == ".png" and has_alpha:
            options["lossless"] = True
        elif source.suffix.lower() == ".png":
            options.update(lossless=False, quality=92, alpha_quality=100)
        else:
            options.update(lossless=False, quality=90)
        image.save(target, **options)
        print(f"{source} -> {target} ({source.stat().st_size} -> {target.stat().st_size} bytes)")

for path in ROOT.rglob("*"):
    if path.is_file() and path.suffix.lower() in SUPPORTED and not path.name.endswith(".preview"):
        make_preview(path)
