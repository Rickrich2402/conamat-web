# /boleta/ — consulta de boletas por QR

Página oculta: no está enlazada en el sitio y lleva `noindex`.
Se abre con `https://conamatchimalhuacan.com/boleta/?f=<clave>`.

Por cada boleta publicada hay dos archivos en `docs/`:

- `<clave>.pdf` — el que se descarga
- `<clave>.png` — la vista previa (los celulares no muestran PDF incrustados)

Para publicar otra boleta: `python tools/nueva_boleta.py` y sigue los pasos que imprime.
Para retirar una boleta: borra sus dos archivos y haz push.
