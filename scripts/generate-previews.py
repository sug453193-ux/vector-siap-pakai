import json
from pathlib import Path
from urllib.parse import quote
from PIL import Image, ImageOps

ROOT = Path("assets")
IMAGE_ROOT = ROOT / "images"
SUPPORTED = {".png", ".jpg", ".jpeg"}
VARIANTS = [
    (".preview.webp", 640, 86),
    (".webp", 2000, 90),
]
KNOWN = {
    "islamic-ornament": ("Islamic Ornament", "✥", "Ornamen Islami dan motif dekoratif"),
    "swirl-scroll": ("Swirl & Scroll", "❧", "Motif lengkung dan sulur dekoratif"),
    "floral-botanical": ("Floral & Botanical", "❀", "Bunga, daun, dan elemen tumbuhan"),
    "geometric-pattern": ("Geometric Pattern", "◇", "Pola geometri dan motif berulang"),
    "cnc-laser-panel": ("CNC & Laser Panel", "▦", "Panel untuk kebutuhan produksi"),
    "frames-borders": ("Frames & Borders", "▣", "Bingkai dan ornamen tepi"),
    "abstract-ornament": ("Abstract Ornament", "✧", "Motif abstrak dan elemen artistik"),
    "vintage-classic": ("Vintage & Classic", "❖", "Ornamen klasik dan vintage"),
    "kaligrafi-arab": ("Kaligrafi Arab", "۞", "Kaligrafi dan tipografi Arab"),
    "logo-maskapai": ("Logo Maskapai", "✈", "Koleksi logo dan identitas"),
    "logo-pendidikan": ("Logo Pendidikan", "✦", "Logo dan identitas pendidikan"),
    "wallpaper-campuran": ("Wallpaper Campuran", "▧", "Wallpaper, pattern, dan motif"),
}

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

def web_path(path: Path) -> str:
    return "assets/" + quote(path.as_posix(), safe="/")

def title_slug(slug: str) -> str:
    return " ".join(w.upper() if len(w) <= 3 else w.capitalize() for w in slug.split("-"))

def label_of(filename: str) -> str:
    return " ".join(Path(filename).stem.replace("_", " ").replace("-", " ").split()) or "Desain Vector"

for path in ROOT.rglob("*"):
    if path.is_file() and path.suffix.lower() in SUPPORTED:
        make_previews(path)

categories = []
products = []
if IMAGE_ROOT.exists():
    for folder in sorted((p for p in IMAGE_ROOT.iterdir() if p.is_dir()), key=lambda p: p.name.casefold()):
        name, icon, desc = KNOWN.get(folder.name, (title_slug(folder.name), "✦", "Koleksi desain vector dan vektor"))
        categories.append({"id": folder.name, "name": name, "icon": icon, "desc": desc})
        for source in sorted((p for p in folder.iterdir() if p.is_file() and p.suffix.lower() in SUPPORTED), key=lambda p: p.name.casefold()):
            stem = source.stem
            preview = source.with_name(stem + ".preview.webp")
            large = source.with_name(stem + ".webp")
            rel = source.relative_to(ROOT)
            products.append({
                "name": source.name,
                "url": web_path(rel),
                "previewUrl": web_path(preview.relative_to(ROOT)) if preview.exists() else None,
                "largePreviewUrl": web_path(large.relative_to(ROOT)) if large.exists() else None,
                "category": folder.name,
                "categoryName": name,
                "label": label_of(source.name),
                "path": rel.as_posix(),
            })

catalog = {"version": 1, "categories": categories, "products": products}
target = ROOT / "catalog.json"
target.write_text(json.dumps(catalog, ensure_ascii=False, separators=(",", ":")) + "\n", encoding="utf-8")
print(f"Generated {target}: {len(categories)} categories, {len(products)} products")
