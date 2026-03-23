#!/usr/bin/env python3
"""Generate PWA icons for JobCraft using Pillow."""
from PIL import Image, ImageDraw, ImageFont
import os

os.makedirs("icons", exist_ok=True)

def make_icon(size):
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Background gradient simulation (solid navy)
    draw.rounded_rectangle([0, 0, size, size], radius=size//5,
                            fill=(30, 58, 95, 255))

    # Inner lighter rectangle for depth
    pad = size // 10
    draw.rounded_rectangle([pad, pad, size-pad, size-pad],
                            radius=size//8, fill=(45, 90, 142, 255))

    # Letter "J" centered
    font_size = int(size * 0.52)
    try:
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf", font_size)
    except:
        try:
            font = ImageFont.truetype("/usr/share/fonts/truetype/liberation/LiberationSerif-Bold.ttf", font_size)
        except:
            font = ImageFont.load_default()

    text = "J"
    bbox = draw.textbbox((0, 0), text, font=font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    x = (size - tw) // 2 - bbox[0]
    y = (size - th) // 2 - bbox[1] - int(size * 0.03)

    # Shadow
    draw.text((x+2, y+2), text, fill=(15, 30, 50, 180), font=font)
    # Main text
    draw.text((x, y), text, fill=(255, 255, 255, 255), font=font)

    # Small dot accent
    dot_r = max(4, size // 18)
    draw.ellipse([size//2 - dot_r, size - pad*2 - dot_r,
                  size//2 + dot_r, size - pad*2 + dot_r],
                 fill=(59, 130, 246, 255))

    return img

for s in [192, 512]:
    icon = make_icon(s)
    path = f"icons/icon-{s}.png"
    icon.save(path, "PNG")
    print(f"✅ {path} créé ({s}x{s})")

print("✅ Icônes générées avec succès !")
