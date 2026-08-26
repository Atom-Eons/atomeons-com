"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import styles from "./SignalField.module.css";

const DESKTOP_PARTICLE_COUNT = 44000;
const MOBILE_PARTICLE_COUNT = 12000;

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uPointer;
  uniform float uPulse;
  uniform float uScroll;
  attribute float aSeed;
  attribute float aSize;
  attribute float aAccent;
  varying float vAccent;
  varying float vGlow;

  void main() {
    vec3 p = position;
    float time = uTime * (0.18 + aSeed * 0.08);

    float breathing = sin(time * 1.7 + aSeed * 18.0 + p.x * 1.8) * 0.045;
    p += normalize(p + vec3(0.001)) * breathing;

    float pointerDistance = max(0.2, distance(p.xy, uPointer * vec2(2.8, 1.8)));
    float pointerWake = 0.11 / (pointerDistance * pointerDistance + 0.35);
    p.z += pointerWake * sin(aSeed * 31.0 + time * 5.0);

    float pulseRing = sin(length(p.xy) * 6.0 - uPulse * 10.0);
    p += normalize(p + vec3(0.001)) * pulseRing * uPulse * 0.16;

    float scrollTurn = uScroll * 0.42;
    mat2 turn = mat2(cos(scrollTurn), -sin(scrollTurn), sin(scrollTurn), cos(scrollTurn));
    p.xz = turn * p.xz;

    vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = (aSize * (1.2 + uPulse * 1.8)) * (13.0 / max(1.0, -mvPosition.z));
    vAccent = aAccent;
    vGlow = clamp(pointerWake * 1.6 + uPulse * 0.7, 0.0, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uInk;
  uniform vec3 uOrange;
  uniform vec3 uBlue;
  varying float vAccent;
  varying float vGlow;

  void main() {
    vec2 center = gl_PointCoord - 0.5;
    float d = length(center);
    if (d > 0.5) discard;
    float alpha = smoothstep(0.5, 0.04, d);
    vec3 color = vAccent < 0.42
      ? uInk
      : (vAccent < 0.78 ? uOrange : uBlue);
    color = mix(color, vec3(1.0), vGlow * 0.4);
    gl_FragColor = vec4(color, alpha * (0.52 + vGlow * 0.35));
  }
`;

function buildArtifactGeometry(particleCount: number) {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const seeds = new Float32Array(particleCount);
  const sizes = new Float32Array(particleCount);
  const accents = new Float32Array(particleCount);

  for (let i = 0; i < particleCount; i += 1) {
    const seed = (i * 0.61803398875) % 1;
    const ribbon = i % 7;
    const t = (i / particleCount) * Math.PI * 18 + ribbon * 0.19;
    const knot = t * 0.333;
    const radius = 1.52 + Math.cos(knot * 3) * 0.38;
    const coreX = radius * Math.cos(knot * 2);
    const coreY = radius * Math.sin(knot * 2) * 0.62;
    const coreZ = Math.sin(knot * 3) * 0.55;
    const dust = ((i * 16807) % 997) / 997;
    const spread = (dust - 0.5) * (ribbon === 0 ? 0.9 : 0.34);
    const angle = t * 4.7 + seed * 8.0;

    positions[i * 3] = coreX + Math.cos(angle) * spread;
    positions[i * 3 + 1] = coreY + Math.sin(angle) * spread * 0.66;
    positions[i * 3 + 2] = coreZ + Math.sin(angle * 0.7) * spread;
    seeds[i] = seed;
    sizes[i] = 0.7 + ((i * 13) % 17) / 10;
    accents[i] = i % 31 === 0 ? 0.92 : i % 11 === 0 ? 0.58 : seed * 0.34;
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
  geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
  geometry.setAttribute("aAccent", new THREE.BufferAttribute(accents, 1));
  return geometry;
}

export function SignalField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const field = fieldRef.current;
    if (!canvas || !field) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const compact = window.matchMedia("(max-width: 820px)").matches;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: false,
        antialias: false,
        powerPreference: compact ? "low-power" : "high-performance",
      });
    } catch {
      field.dataset.fallback = "true";
      return;
    }

    renderer.setClearColor(0xf7f7f2, 1);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, compact ? 1 : 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 0, 8.6);

    const group = new THREE.Group();
    group.position.set(0.08, -0.02, 0);
    group.rotation.set(-0.08, -0.25, -0.08);
    group.scale.setScalar(1.72);
    scene.add(group);

    const geometry = buildArtifactGeometry(compact ? MOBILE_PARTICLE_COUNT : DESKTOP_PARTICLE_COUNT);
    const uniforms = {
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uPulse: { value: 0 },
      uScroll: { value: 0 },
      uInk: { value: new THREE.Color("#11120f") },
      uOrange: { value: new THREE.Color("#ff4f12") },
      uBlue: { value: new THREE.Color("#2257df") },
    };
    const particleMaterial = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });
    const particles = new THREE.Points(geometry, particleMaterial);
    group.add(particles);

    const blackChrome = new THREE.MeshPhysicalMaterial({
      color: 0x151511,
      metalness: 0.84,
      roughness: 0.13,
      clearcoat: 1,
      clearcoatRoughness: 0.08,
      wireframe: true,
      transparent: true,
      opacity: 0.28,
      depthWrite: false,
    });
    const orangeGlass = new THREE.MeshPhysicalMaterial({
      color: 0xff4f12,
      emissive: 0x581000,
      emissiveIntensity: 0.35,
      metalness: 0.32,
      roughness: 0.08,
      clearcoat: 1,
      clearcoatRoughness: 0.04,
    });
    const blueGlass = new THREE.MeshPhysicalMaterial({
      color: 0x2257df,
      emissive: 0x071d69,
      emissiveIntensity: 0.2,
      metalness: 0.6,
      roughness: 0.16,
      clearcoat: 1,
    });

    const core = new THREE.Mesh(new THREE.TorusKnotGeometry(0.82, 0.12, 180, 12, 2, 3), blackChrome);
    core.rotation.set(0.9, 0.2, 0.3);
    group.add(core);

    const ember = new THREE.Mesh(new THREE.IcosahedronGeometry(0.28, 2), orangeGlass);
    ember.position.set(-1.74, -0.64, 0.65);
    group.add(ember);

    const signal = new THREE.Mesh(new THREE.OctahedronGeometry(0.19, 0), blueGlass);
    signal.position.set(1.8, 0.86, 0.55);
    group.add(signal);

    const orbitMaterial = new THREE.MeshBasicMaterial({ color: 0xff4f12, transparent: true, opacity: 0.42 });
    const orbit = new THREE.Mesh(new THREE.TorusGeometry(2.6, 0.008, 5, 220), orbitMaterial);
    orbit.rotation.set(1.12, 0.06, 0.08);
    group.add(orbit);

    scene.add(new THREE.HemisphereLight(0xffffff, 0xe4e1d5, 3.2));
    const key = new THREE.DirectionalLight(0xffffff, 6.4);
    key.position.set(-4, 6, 8);
    scene.add(key);
    const hot = new THREE.PointLight(0xff4f12, 28, 9);
    hot.position.set(-2.1, -1.1, 3.4);
    scene.add(hot);
    const cool = new THREE.PointLight(0x2257df, 18, 8);
    cool.position.set(2.4, 1.2, 2.4);
    scene.add(cool);

    const pointer = new THREE.Vector2();
    const targetPointer = new THREE.Vector2();
    let pulse = 0;
    let pulseVelocity = 0;
    let scrollProgress = 0;

    const onPointer = (event: PointerEvent) => {
      const rect = field.getBoundingClientRect();
      targetPointer.set(
        ((event.clientX - rect.left) / rect.width - 0.5) * 2,
        -((event.clientY - rect.top) / rect.height - 0.5) * 2,
      );
    };
    const onPointerLeave = () => targetPointer.set(0, 0);
    const onPulse = () => {
      if (!reduceMotion) pulseVelocity = 1;
    };
    const onScroll = () => {
      const rect = field.getBoundingClientRect();
      scrollProgress = THREE.MathUtils.clamp(-rect.top / Math.max(1, rect.height), 0, 1);
    };

    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave, { passive: true });
    window.addEventListener("pointerdown", onPulse, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    const resize = () => {
      const width = Math.max(1, field.clientWidth);
      const height = Math.max(1, field.clientHeight);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      const mobile = width < 820;
      group.position.set(mobile ? 0.62 : 0.08, mobile ? -0.62 : -0.02, 0);
      group.scale.setScalar(mobile ? 0.96 : 1.72);
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(field);
    resize();
    onScroll();

    let frame = 0;
    let visible = true;
    const render = (now = 0) => {
      if (!visible) {
        frame = 0;
        return;
      }
      const t = now * 0.001;
      pointer.lerp(targetPointer, reduceMotion ? 1 : 0.045);
      pulseVelocity *= 0.935;
      pulse += pulseVelocity * 0.052;
      const pulseEnvelope = pulseVelocity * Math.max(0, Math.sin(pulse * Math.PI));

      uniforms.uTime.value = reduceMotion ? 0 : t;
      uniforms.uPointer.value.copy(pointer);
      uniforms.uPulse.value = pulseEnvelope;
      uniforms.uScroll.value = scrollProgress;

      if (!reduceMotion) {
        group.rotation.y = -0.25 + pointer.x * 0.12 + Math.sin(t * 0.12) * 0.05;
        group.rotation.x = -0.08 - pointer.y * 0.08;
        core.rotation.y = t * 0.18 + pointer.x * 0.24;
        core.rotation.z = t * 0.11;
        ember.position.y = -0.64 + Math.sin(t * 1.4) * 0.14;
        ember.rotation.y = t * 0.7;
        signal.position.y = 0.86 + Math.cos(t * 1.1) * 0.12;
        signal.rotation.x = -t * 0.9;
        orbit.rotation.z = 0.08 + t * 0.05;
      }

      camera.position.x += (pointer.x * 0.18 - camera.position.x) * 0.025;
      camera.position.y += (pointer.y * 0.12 - camera.position.y) * 0.025;
      camera.lookAt(0.45, -0.04, 0);
      renderer.render(scene, camera);
      if (!reduceMotion) frame = requestAnimationFrame(render);
    };
    render();

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      const nextVisible = entry.isIntersecting && !document.hidden;
      if (nextVisible === visible) return;
      visible = nextVisible;
      if (!visible) {
        cancelAnimationFrame(frame);
        frame = 0;
      } else if (!reduceMotion && frame === 0) {
        frame = requestAnimationFrame(render);
      }
    }, { rootMargin: "120px" });
    visibilityObserver.observe(field);

    return () => {
      cancelAnimationFrame(frame);
      visibilityObserver.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("pointerdown", onPulse);
      window.removeEventListener("scroll", onScroll);
      geometry.dispose();
      core.geometry.dispose();
      ember.geometry.dispose();
      signal.geometry.dispose();
      orbit.geometry.dispose();
      particleMaterial.dispose();
      blackChrome.dispose();
      orangeGlass.dispose();
      blueGlass.dispose();
      orbitMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={fieldRef} className={styles.field} aria-hidden="true">
      <canvas ref={canvasRef} />
      <div className={styles.haze} />
      <div className={styles.fallback} />
      <div className={styles.legend}><span>MOVE</span><span>TOUCH</span><span>DISRUPT</span></div>
    </div>
  );
}
