// CBX-FINAL-V1 CRT filter — C-for-Emscripten reference implementation.
// The WebGL path in ../src/crt.js is what runs by default (GPU, fast).
// This C code emits the same math for anyone who wants the WASM path
// (SharedArrayBuffer contexts, headless render, node bench, etc.).
//
// Build (from webapp/wasm/):
//   emcc -O3 crt.c -o ../src/crt-wasm.js \
//        -sMODULARIZE=1 -sEXPORT_ES6=1 -sSINGLE_FILE=1 \
//        -sEXPORTED_FUNCTIONS=_crt_apply,_malloc,_free \
//        -sEXPORTED_RUNTIME_METHODS=cwrap,HEAPU8 -sENVIRONMENT=web
//
// Runtime (JS):
//   import Module from './crt-wasm.js';
//   const m = await Module();
//   const apply = m.cwrap('crt_apply', null, ['number','number','number','number']);
//   apply(bufPtr, W, H, phase);

#include <stdint.h>
#include <math.h>

#define SCAN_DARK   (52.0f  / 255.0f * 0.65f)
#define SCAN_WARM   (18.0f  / 255.0f * 0.65f)
#define TRIAD_R     (12.0f  / 255.0f)
#define TRIAD_G     (10.0f  / 255.0f)
#define TRIAD_B     (12.0f  / 255.0f)
#define BLOOM_KNEE  0.55f
#define BLOOM_MUL   0.35f

static inline uint8_t sat8(float v) { return v <= 0.f ? 0 : (v >= 255.f ? 255 : (uint8_t)v); }

void crt_apply(uint8_t* buf, int w, int h, int phase) {
    if (!buf || w <= 0 || h <= 0) return;
    for (int y = 0; y < h; y++) {
        float dark = ((y & 3) == 3) ? SCAN_DARK : 0.f;
        float warm = (((y + 2) & 3) == 2) ? SCAN_WARM : 0.f;
        for (int x = 0; x < w; x++) {
            int i = (y * w + x) * 4;
            float r = buf[i], g = buf[i + 1], b = buf[i + 2];
            r *= (1.f - dark); g *= (1.f - dark); b *= (1.f - dark);
            r += 248.f * warm; g += 230.f * warm; b += 172.f * warm;
            int p = x % 3;
            if (p == 0) r += 255.f * TRIAD_R;
            else if (p == 1) g += 255.f * TRIAD_G;
            else b += 255.f * TRIAD_B;
            if (x >= 2 && x < w - 2 && y >= 2 && y < h - 2) {
                int ol = i - 8, or_ = i + 8, ou = i - w * 8, od = i + w * 8;
                float br = (buf[ol]     + buf[or_]     + buf[ou]     + buf[od])     * 0.25f;
                float bg = (buf[ol + 1] + buf[or_ + 1] + buf[ou + 1] + buf[od + 1]) * 0.25f;
                float bb = (buf[ol + 2] + buf[or_ + 2] + buf[ou + 2] + buf[od + 2]) * 0.25f;
                float lum = fmaxf(fmaxf(br, bg), bb) / 255.f;
                if (lum > BLOOM_KNEE) {
                    float k = (lum - BLOOM_KNEE) / (1.f - BLOOM_KNEE) * BLOOM_MUL;
                    r += br * k; g += bg * k; b += bb * k;
                }
            }
            buf[i] = sat8(r); buf[i + 1] = sat8(g); buf[i + 2] = sat8(b);
        }
    }
    (void)phase;
}
