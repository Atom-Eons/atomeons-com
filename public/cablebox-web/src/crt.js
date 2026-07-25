// CRT filter — WebGL2 fragment shader mirroring CBX-FINAL-V1 native constants:
//   TvShellOverlayForm.DrawEmulatorScanlines:  dark alpha 52, warm 18, every 4 rows, scale 0.65
//   TvShellOverlayForm.DrawPhosphorTriads:     R/G/B alpha 12/10/12 stripe every 3 px
//   CableDepthEngine.RiderBloom = 0.55:        soft halation on bright tail
//
// Parallel wasm/crt.c holds the same math as C-for-Emscripten (see wasm/README.md).

const VS = `#version 300 es
in vec2 pos;
out vec2 uv;
void main() {
  uv = 0.5 * (pos + 1.0);
  uv.y = 1.0 - uv.y;
  gl_Position = vec4(pos, 0.0, 1.0);
}`;

const FS = `#version 300 es
precision highp float;
in vec2 uv;
out vec4 frag;
uniform sampler2D u_tex;
uniform vec2 u_res;

void main() {
  vec4 c = texture(u_tex, uv);
  float y = uv.y * u_res.y;
  float x = uv.x * u_res.x;

  // Scanline dark line every 4th row, alpha 52/255 * 0.65 = 0.1325.
  float scanRow = mod(y, 4.0);
  float darkMask = step(3.0, scanRow) * step(scanRow, 4.0);
  c.rgb *= (1.0 - 0.1325 * darkMask);

  // Warm bright line 2 rows after (alpha 18/255 * 0.65 = 0.0459).
  float warmRow = mod(y + 2.0, 4.0);
  float warmMask = step(1.5, warmRow) * step(warmRow, 2.5);
  c.rgb += vec3(0.973, 0.902, 0.674) * (0.0459 * warmMask);

  // Phosphor triads (alpha ~12/255 = 0.047).
  float phase = mod(x, 3.0);
  vec3 triad = vec3(0.0);
  if (phase < 1.0)      triad = vec3(0.047, 0.0, 0.0);
  else if (phase < 2.0) triad = vec3(0.0, 0.039, 0.0);
  else                  triad = vec3(0.0, 0.0, 0.047);
  c.rgb += triad * 0.5;

  // Halation bloom — cross-sample cheap 5-tap.
  vec2 px = 2.0 / u_res;
  vec3 blur =
      texture(u_tex, uv + vec2( px.x, 0.0)).rgb +
      texture(u_tex, uv + vec2(-px.x, 0.0)).rgb +
      texture(u_tex, uv + vec2(0.0,  px.y)).rgb +
      texture(u_tex, uv + vec2(0.0, -px.y)).rgb;
  blur *= 0.25;
  float lum = max(max(blur.r, blur.g), blur.b);
  float k = smoothstep(0.55, 1.0, lum) * 0.35;
  c.rgb += blur * k;

  frag = vec4(clamp(c.rgb, 0.0, 1.0), 1.0);
}`;

let raf = 0, running = false;
let gl = null, prog = null, tex = null, uRes = null;
let attachedVideo = null;

function compile(gl, type, src) {
  const s = gl.createShader(type);
  gl.shaderSource(s, src); gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { console.error(gl.getShaderInfoLog(s)); return null; }
  return s;
}

function init(canvas) {
  gl = canvas.getContext('webgl2', { alpha: true, premultipliedAlpha: false });
  if (!gl) { console.warn('no webgl2, CRT disabled'); return false; }
  const vs = compile(gl, gl.VERTEX_SHADER, VS);
  const fs = compile(gl, gl.FRAGMENT_SHADER, FS);
  prog = gl.createProgram(); gl.attachShader(prog, vs); gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { console.error(gl.getProgramInfoLog(prog)); return false; }
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
  const posLoc = gl.getAttribLocation(prog, 'pos');
  gl.enableVertexAttribArray(posLoc);
  gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

  tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

  uRes = gl.getUniformLocation(prog, 'u_res');
  gl.uniform1i(gl.getUniformLocation(prog, 'u_tex'), 0);
  return true;
}

export function resizeCrt(canvas) {
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
  const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
  if (canvas.width !== w || canvas.height !== h) {
    canvas.width = w; canvas.height = h;
    if (gl) { gl.viewport(0, 0, w, h); gl.uniform2f(uRes, w, h); }
  }
}

function tick() {
  if (!running) return;
  if (attachedVideo && attachedVideo.readyState >= 2) {
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, attachedVideo);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
  raf = requestAnimationFrame(tick);
}

export function startCrt(videoEl, canvasEl) {
  attachedVideo = videoEl;
  if (!gl && !init(canvasEl)) return;
  resizeCrt(canvasEl);
  running = true;
  cancelAnimationFrame(raf);
  raf = requestAnimationFrame(tick);
}
export function stopCrt() {
  running = false;
  cancelAnimationFrame(raf);
}
