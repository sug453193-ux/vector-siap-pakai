from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path("assets")
SUPPORTED = {".png", ".jpg", ".jpeg"}
VARIANTS = [
    (".preview.webp", 640, 86),
    (".webp", 2000, 90),
]

def make_previews(source: Path) -> None:
    with Image.open(source) as original:
        base = ImageOps.exif_transpose(original)
        has_alpha = "A" in base.getbands() or "transparency" in base.info
        base = base.convert("RGBA" if has_alpha else "RGB")
        for suffix, max_edge, quality in VARIANTS:
            target = source.with_name(source.stem + suffix)
            if target.exists():
                continue
            image = base.copy()
            image.thumbnail((max_edge, max_edge), Image.Resampling.LANCZOS)
            options = {"format": "WEBP", "method": 6, "exact": True}
            if source.suffix.lower() == ".png" and has_alpha:
                options["lossless"] = True
            else:
                options.update(lossless=False, quality=quality, alpha_quality=100)
            image.save(target, **options)
            print(f"{source} -> {target} ({source.stat().st_size} -> {target.stat().st_size} bytes)")

for path in ROOT.rglob("*"):
    if path.is_file() and path.suffix.lower() in SUPPORTED:
        make_previews(path)
