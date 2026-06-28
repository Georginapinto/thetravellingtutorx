"""Generate The Travelling Tutor X PWA icons (192, 512, apple-touch 180, favicon 32/64) in brand colours."""
from PIL import Image, ImageDraw, ImageFont
from pathlib import Path
import os, urllib.request, io

OUT = Path(__file__).resolve().parent.parent / "frontend" / "public"
OUT.mkdir(parents=True, exist_ok=True)

PINK = (225, 29, 103, 255)         # #E11D67
PINK_SOFT = (252, 226, 236, 255)
SAGE = (168, 184, 154, 255)
WARM_WHITE = (251, 247, 242, 255)
INK = (42, 31, 38, 255)

# Try to use a handwritten-feeling font available on the system; fallback gracefully
FONT_CANDIDATES = [
    "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
    "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
]


def get_font(size):
    for p in FONT_CANDIDATES:
        if os.path.exists(p):
            return ImageFont.truetype(p, size)
    return ImageFont.load_default()


def render_icon(size: int, rounded: bool = True, maskable: bool = False) -> Image.Image:
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)

    # Background: bold pink gradient-ish
    if rounded and not maskable:
        radius = int(size * 0.22)
        d.rounded_rectangle((0, 0, size, size), radius=radius, fill=PINK)
    else:
        d.rectangle((0, 0, size, size), fill=PINK)

    # Soft pink inner circle for depth
    inset = int(size * 0.16)
    d.ellipse((inset, inset, size - inset, size - inset), fill=PINK_SOFT)

    # Big "tt" monogram in deep pink
    font = get_font(int(size * 0.46))
    text = "tt"
    bbox = d.textbbox((0, 0), text, font=font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    tx = (size - tw) / 2 - bbox[0]
    ty = (size - th) / 2 - bbox[1] - int(size * 0.04)
    d.text((tx, ty), text, font=font, fill=INK)

    # X accent in bold pink (top-right corner)
    xfont = get_font(int(size * 0.22))
    d.text((size * 0.62, size * 0.58), "x", font=xfont, fill=PINK)

    return img


for s in (192, 512):
    render_icon(s).save(OUT / f"icon-{s}.png", "PNG")

# Maskable icons (no rounding — let the OS mask them)
for s in (192, 512):
    render_icon(s, rounded=False, maskable=True).save(OUT / f"icon-maskable-{s}.png", "PNG")

# Apple touch icon
render_icon(180).save(OUT / "apple-touch-icon.png", "PNG")

# Favicon (multi-size ico)
fav32 = render_icon(32)
fav64 = render_icon(64)
fav32.save(OUT / "favicon-32.png", "PNG")
fav32.save(OUT / "favicon.ico", sizes=[(32, 32)])

print("Icons written to:", OUT)
for p in sorted(OUT.glob("icon-*.png")) + sorted(OUT.glob("apple-touch-icon.png")) + sorted(OUT.glob("favicon*")):
    print(" -", p.name, p.stat().st_size, "bytes")
