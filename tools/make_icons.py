"""Erzeugt die App-Icons von Repwerk als PNG (ohne externe Bibliotheken).

Aufruf:  python tools/make_icons.py   (im Ordner repwerk)
"""
import os, struct, zlib

OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "icons")
os.makedirs(OUT, exist_ok=True)

TOP = (0xFB, 0x92, 0x3C)    # Orange hell
BOT = (0xEA, 0x58, 0x0C)    # Orange dunkel
WHITE = (0x0F, 0x17, 0x2A)  # Hantel: Nachtblau
CORAL = (0xFF, 0xFF, 0xFF)  # Scheiben: Weiß


def rrect(x, y, cx, cy, w, h, r):
    """True, wenn (x,y) im abgerundeten Rechteck mit Mittelpunkt cx,cy liegt."""
    dx = abs(x - cx) - (w / 2 - r)
    dy = abs(y - cy) - (h / 2 - r)
    if dx <= 0 and dy <= 0:
        return True
    return max(dx, 0) ** 2 + max(dy, 0) ** 2 <= r * r


def shade(u, v, rounded):
    """Farbe (r,g,b,a) an der normierten Position u,v in [0,1]."""
    if rounded and not rrect(u, v, .5, .5, 1, 1, .22):
        return (0, 0, 0, 0)
    t = min(1, max(0, (u * .35 + v * .65)))
    bg = tuple(TOP[i] + (BOT[i] - TOP[i]) * t for i in range(3))
    # Hantel, leicht nach oben versetzt; Inhalt liegt in der sicheren Zone (80 %)
    cy = .5
    s = .78  # Skalierung des Motivs
    def sx(a): return .5 + (a - .5) * s
    bar = rrect(u, v, .5, cy, .62 * s, .07 * s, .035 * s)
    outer = rrect(u, v, sx(.205), cy, .075 * s, .30 * s, .03 * s) or rrect(u, v, sx(.795), cy, .075 * s, .30 * s, .03 * s)
    inner = rrect(u, v, sx(.29), cy, .085 * s, .44 * s, .035 * s) or rrect(u, v, sx(.71), cy, .085 * s, .44 * s, .035 * s)
    if inner:
        return CORAL + (255,)
    if outer or bar:
        return WHITE + (255,)
    return tuple(int(c) for c in bg) + (255,)


def render(size, rounded, ss=3):
    rows = []
    n = ss * ss
    for py in range(size):
        row = bytearray([0])
        for px in range(size):
            acc = [0, 0, 0, 0]
            for sy in range(ss):
                for sx_ in range(ss):
                    c = shade((px + (sx_ + .5) / ss) / size, (py + (sy + .5) / ss) / size, rounded)
                    a = c[3]
                    acc[0] += c[0] * a; acc[1] += c[1] * a; acc[2] += c[2] * a; acc[3] += a
            a = acc[3] / n
            if acc[3]:
                row += bytes((int(acc[0] / acc[3]), int(acc[1] / acc[3]), int(acc[2] / acc[3]), int(round(a))))
            else:
                row += b"\0\0\0\0"
        rows.append(bytes(row))
    return b"".join(rows)


def png(path, size, rounded):
    raw = render(size, rounded)
    def chunk(t, d): return struct.pack(">I", len(d)) + t + d + struct.pack(">I", zlib.crc32(t + d) & 0xffffffff)
    data = b"\x89PNG\r\n\x1a\n" + chunk(b"IHDR", struct.pack(">IIBBBBB", size, size, 8, 6, 0, 0, 0)) \
        + chunk(b"IDAT", zlib.compress(raw, 9)) + chunk(b"IEND", b"")
    with open(path, "wb") as f:
        f.write(data)
    print("geschrieben:", os.path.relpath(path))


png(os.path.join(OUT, "icon-192.png"), 192, True)
png(os.path.join(OUT, "icon-512.png"), 512, True)
png(os.path.join(OUT, "maskable-512.png"), 512, False)
png(os.path.join(OUT, "apple-touch-icon.png"), 180, False)
png(os.path.join(OUT, "favicon-32.png"), 32, True)
