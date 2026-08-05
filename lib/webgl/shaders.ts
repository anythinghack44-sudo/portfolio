/**
 * Phase 8 — GLSL for the WebGL layer.
 *
 * Kept as plain strings in one module so every scene shares the same noise
 * implementation instead of shipping three copies of it.
 */

/** Ashima's 3D simplex noise. Shared by all three scenes. */
export const SIMPLEX_3D = /* glsl */ `
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 10.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod289(i);
  vec4 p = permute(permute(permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0));

  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);

  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);

  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}
`

/* ─────────────────────────────────────────────────────────────
   HERO — drifting particle field behind (and through) the type
   ───────────────────────────────────────────────────────────── */

export const HERO_VERTEX = /* glsl */ `
uniform float uTime;
uniform vec2 uMouse;
uniform float uPixelRatio;

attribute float aSeed;
attribute float aScale;

varying float vFade;
varying float vTint;

void main() {
  vec3 p = position;

  // Two slow, out-of-phase drifts read as air movement rather than a loop.
  float t = uTime * 0.05 + aSeed * 6.2831853;
  p.x += sin(t * 1.10 + position.y * 0.32) * 0.55;
  p.y += cos(t * 0.85 + position.x * 0.28) * 0.42;
  p.z += sin(t * 0.65) * 0.35;

  // Depth-scaled parallax: nearer motes react more, which sells the volume.
  p.xy += uMouse * (0.12 + aSeed * 0.22);

  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;

  gl_PointSize = aScale * 2.4 * uPixelRatio * (3.0 / -mv.z);

  vFade = aScale;
  vTint = fract(aSeed * 7.31);
}
`

export const HERO_FRAGMENT = /* glsl */ `
uniform float uOpacity;
uniform vec3 uAccent;
uniform vec3 uLight;

varying float vFade;
varying float vTint;

void main() {
  // Soft round mote. Cheaper than a texture and never shows a seam.
  float d = length(gl_PointCoord - 0.5);
  float mask = smoothstep(0.5, 0.06, d);
  if (mask <= 0.001) discard;

  // Only a small minority carry the accent so it stays a highlight.
  vec3 color = mix(uLight, uAccent, step(0.88, vTint));

  gl_FragColor = vec4(color, mask * vFade * uOpacity);
}
`

/* ─────────────────────────────────────────────────────────────
   WORK — noise-displaced crossfade for the cursor preview
   ───────────────────────────────────────────────────────────── */

export const PREVIEW_VERTEX = /* glsl */ `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

export const PREVIEW_FRAGMENT = /* glsl */ `
uniform sampler2D uFrom;
uniform sampler2D uTo;
uniform vec2 uCoverFrom;
uniform vec2 uCoverTo;
uniform float uProgress;
uniform float uReveal;
uniform float uHover;
uniform float uTime;
uniform vec3 uAccent;

varying vec2 vUv;

${SIMPLEX_3D}

/** Object-fit: cover, done in UV space so the plane can stay 1x1. */
vec2 coverUv(vec2 uv, vec2 cover) {
  return (uv - 0.5) * cover + 0.5;
}

void main() {
  // A single slowly-evolving noise field drives both the crossfade ordering
  // and the displacement, so the transition reads as one material moving.
  float n = snoise(vec3(vUv * 3.0, uTime * 0.08));

  float p = clamp(uProgress * 1.35 - n * 0.22, 0.0, 1.0);
  p = smoothstep(0.0, 1.0, p);

  float amp = 0.07;
  vec2 offFrom = vec2(n * amp, n * amp * 0.5) * p;
  vec2 offTo = vec2(n * amp, n * amp * 0.5) * (1.0 - p);

  vec2 uvFrom = coverUv(vUv, uCoverFrom) + offFrom;
  vec2 uvTo = coverUv(vUv, uCoverTo) - offTo;

  // Chromatic split peaks mid-transition, then resolves to a clean image.
  float edge = 1.0 - abs(p * 2.0 - 1.0);
  float shift = 0.004 * edge + 0.0012 * uHover;

  vec3 color;
  color.r = mix(texture2D(uFrom, uvFrom + vec2(shift, 0.0)).r, texture2D(uTo, uvTo + vec2(shift, 0.0)).r, p);
  color.g = mix(texture2D(uFrom, uvFrom).g, texture2D(uTo, uvTo).g, p);
  color.b = mix(texture2D(uFrom, uvFrom - vec2(shift, 0.0)).b, texture2D(uTo, uvTo - vec2(shift, 0.0)).b, p);

  // Reveal wipes upward with a noisy edge. Padded past 0/1 so the first and
  // last rows of pixels fully clear.
  float r = mix(-0.12, 1.12, uReveal) + n * 0.03;
  float mask = 1.0 - smoothstep(r - 0.10, r + 0.02, vUv.y);

  // The one decorative flourish: an accent filament riding the wipe edge.
  float filament = smoothstep(0.020, 0.0, abs(vUv.y - r));
  filament *= step(0.03, uReveal) * step(uReveal, 0.97);
  color += uAccent * filament * 0.65;

  gl_FragColor = vec4(color, mask);
}
`

/* ─────────────────────────────────────────────────────────────
   LAB — displaced solid with a fresnel rim
   ───────────────────────────────────────────────────────────── */

export const LAB_VERTEX = /* glsl */ `
uniform float uTime;
uniform float uHover;

varying vec3 vNormalView;
varying vec3 vViewDir;
varying float vNoise;

${SIMPLEX_3D}

void main() {
  float n = snoise(vec3(normal * 1.6, uTime * 0.12));
  float amp = 0.14 + uHover * 0.09;

  vec3 displaced = position + normal * n * amp;

  vec4 mv = modelViewMatrix * vec4(displaced, 1.0);

  vNoise = n;
  vNormalView = normalize(normalMatrix * normal);
  vViewDir = normalize(-mv.xyz);

  gl_Position = projectionMatrix * mv;
}
`

export const LAB_FRAGMENT = /* glsl */ `
uniform vec3 uAccent;
uniform vec3 uBase;
uniform float uHover;

varying vec3 vNormalView;
varying vec3 vViewDir;
varying float vNoise;

void main() {
  // Unlit fresnel rim keeps the form legible against a near-black card
  // without needing lights in the shared scene.
  float fresnel = pow(1.0 - clamp(dot(vNormalView, vViewDir), 0.0, 1.0), 2.4);

  vec3 color = mix(uBase, uAccent, fresnel * (0.5 + uHover * 0.4));
  color += uAccent * smoothstep(0.55, 1.0, vNoise) * 0.10;

  gl_FragColor = vec4(color, 1.0);
}
`
