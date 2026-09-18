#!/usr/bin/env python3
"""
Genera la clave y el QR para publicar una boleta nueva.

    pip install qrcode pillow
    python tools/nueva_boleta.py

1. Pega el QR generado (tools/qr-<clave>.png) en la boleta de Word, a 2 cm.
2. Exporta la boleta a PDF y a imagen PNG.
3. Guarda ambos como  boleta/docs/<clave>.pdf  y  boleta/docs/<clave>.png
4. git add, commit y push.
"""
import secrets
from pathlib import Path
import qrcode
from qrcode.constants import ERROR_CORRECT_M

BASE = "https://conamatchimalhuacan.com/boleta/?f="
ALFABETO = "abcdefghjkmnpqrstuvwxyz23456789"   # sin 0/o, 1/l/i para evitar confusiones

clave = "".join(secrets.choice(ALFABETO) for _ in range(12))
url = BASE + clave

qr = qrcode.QRCode(error_correction=ERROR_CORRECT_M, box_size=20, border=3)
qr.add_data(url)
qr.make(fit=True)
salida = Path(__file__).parent / f"qr-{clave}.png"
qr.make_image(fill_color="black", back_color="white").save(salida)

print("Clave :", clave)
print("URL   :", url)
print("QR    :", salida)
print(f"Publica: boleta/docs/{clave}.pdf  y  boleta/docs/{clave}.png")
