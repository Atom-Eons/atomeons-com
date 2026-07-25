# CableBox — webapp (CBX-FINAL-V1 parity)

Same theme PNGs, same aperture rects, same CRT constants as the native
CBX-FINAL-V1 desktop build.

## Run locally

```powershell
python -m http.server 8080 --directory C:\AtomEons\CABLEBOX\webapp
```

Then open <http://127.0.0.1:8080/>.

## Keys

| Key | Action |
|---|---|
| ↑ / ↓ | Channel up / down |
| E | Toggle CRT layer (default ON) |
| \[ / \] | Previous / next cabinet theme |
| F | Fullscreen |
| M | Mute toggle |
| Space | Pause / resume |

## Emscripten (optional)

The CRT effect ships as a WebGL2 fragment shader (`src/crt.js`) that runs
on GPU. `wasm/crt.c` is the equivalent C reference for anyone who wants a
WebAssembly build:

```bash
cd webapp/wasm
emcc -O3 crt.c -o ../src/crt-wasm.js \
     -sMODULARIZE=1 -sEXPORT_ES6=1 -sSINGLE_FILE=1 \
     -sEXPORTED_FUNCTIONS=_crt_apply,_malloc,_free \
     -sEXPORTED_RUNTIME_METHODS=cwrap,HEAPU8 -sENVIRONMENT=web
```

The WebGL path is the default and works on every modern browser.
