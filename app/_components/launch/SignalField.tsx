"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import styles from "./SignalField.module.css";

export function SignalField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const field = fieldRef.current;
    if (!canvas || !field) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "low-power" });
    } catch {
      field.dataset.fallback = "true";
      return;
    }

    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.65));
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
    camera.position.set(0, 0, 8);

    const darkMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x11120f,
      roughness: 0.23,
      metalness: 0.78,
      clearcoat: 0.8,
      clearcoatRoughness: 0.18,
    });
    const orangeMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xff4f12,
      emissive: 0x531000,
      emissiveIntensity: 0.2,
      roughness: 0.28,
      metalness: 0.45,
      clearcoat: 1,
    });
    const lineMaterial = new THREE.MeshBasicMaterial({ color: 0xff4f12, transparent: true, opacity: 0.48 });

    const objectOne = new THREE.Mesh(new THREE.IcosahedronGeometry(1.04, 2), darkMaterial);
    objectOne.position.set(1.55, 0.25, 0);
    objectOne.scale.set(1, 0.72, 1);
    scene.add(objectOne);

    const objectTwo = new THREE.Mesh(new THREE.OctahedronGeometry(0.46, 1), orangeMaterial);
    objectTwo.position.set(-1.9, -0.52, 0.5);
    scene.add(objectTwo);

    const orbit = new THREE.Mesh(new THREE.TorusGeometry(2.75, 0.012, 8, 180), lineMaterial);
    orbit.rotation.set(1.08, 0.18, 0.2);
    scene.add(orbit);

    const pointsGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(72 * 3);
    for (let i = 0; i < 72; i += 1) {
      const radius = 2.7 + ((i * 17) % 11) * 0.09;
      const angle = i * 2.39996;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.sin(angle) * radius * 0.48;
      positions[i * 3 + 2] = ((i % 9) - 4) * 0.11;
    }
    pointsGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const pointsMaterial = new THREE.PointsMaterial({ color: 0x11120f, size: 0.025, transparent: true, opacity: 0.28 });
    const points = new THREE.Points(pointsGeometry, pointsMaterial);
    scene.add(points);

    scene.add(new THREE.HemisphereLight(0xffffff, 0xdad8ce, 2.8));
    const key = new THREE.DirectionalLight(0xffffff, 5.5);
    key.position.set(-3, 5, 7);
    scene.add(key);
    const ember = new THREE.PointLight(0xff4f12, 16, 8);
    ember.position.set(-2.2, -1, 2.5);
    scene.add(ember);

    const pointer = { x: 0, y: 0 };
    const onPointer = (event: PointerEvent) => {
      const rect = field.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 0.34;
      pointer.y = ((event.clientY - rect.top) / rect.height - 0.5) * 0.24;
    };
    field.addEventListener("pointermove", onPointer, { passive: true });

    const resize = () => {
      const width = Math.max(1, field.clientWidth);
      const height = Math.max(1, field.clientHeight);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(field);
    resize();

    let frame = 0;
    const render = (now = 0) => {
      const t = now * 0.00018;
      objectOne.rotation.set(t * 0.52 + pointer.y, t * 0.83 + pointer.x, t * 0.26);
      objectTwo.position.y = -0.52 + Math.sin(t * 3.1) * 0.16;
      objectTwo.rotation.y = -t * 2;
      orbit.rotation.z = 0.2 + t * 0.16;
      points.rotation.z = -t * 0.08;
      camera.position.x += (pointer.x - camera.position.x) * 0.025;
      camera.position.y += (-pointer.y - camera.position.y) * 0.025;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
      if (!reduceMotion) frame = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      field.removeEventListener("pointermove", onPointer);
      objectOne.geometry.dispose();
      objectTwo.geometry.dispose();
      orbit.geometry.dispose();
      pointsGeometry.dispose();
      darkMaterial.dispose();
      orangeMaterial.dispose();
      lineMaterial.dispose();
      pointsMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={fieldRef} className={styles.field} aria-hidden="true">
      <canvas ref={canvasRef} />
      <div className={styles.fallback} />
    </div>
  );
}
