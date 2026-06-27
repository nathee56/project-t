"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export function ThreeAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio || 1);
    container.appendChild(renderer.domElement);

    // Create a series of elegant, thin rings that pulsate gently
    const ringGroup = new THREE.Group();
    const colors = [0x2d4b43, 0x4a6b61, 0x6b8c82]; // Based on design system's deep green

    const geometries: THREE.TorusGeometry[] = [];
    const materials: THREE.MeshPhongMaterial[] = [];

    for (let i = 0; i < 12; i++) {
      const geometry = new THREE.TorusGeometry(1 + i * 0.2, 0.01, 16, 100);
      geometries.push(geometry);

      const material = new THREE.MeshPhongMaterial({
        color: colors[i % colors.length],
        transparent: true,
        opacity: 0.6 - i * 0.04,
      });
      materials.push(material);

      const ring = new THREE.Mesh(geometry, material);
      ring.rotation.x = Math.random() * Math.PI;
      ring.rotation.y = Math.random() * Math.PI;
      ringGroup.add(ring);
    }
    scene.add(ringGroup);

    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(10, 10, 10);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff, 0.8));

    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const time = Date.now() * 0.0005;

      ringGroup.children.forEach((child, i) => {
        const ring = child as THREE.Mesh;
        ring.rotation.x += 0.002 * (i + 1) * 0.2;
        ring.rotation.y += 0.003 * (i + 1) * 0.2;
        const scale = 1 + Math.sin(time + i * 0.5) * 0.1;
        ring.scale.set(scale, scale, scale);
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);

      // Clean up resources to prevent WebGL context leaks
      geometries.forEach((geom) => geom.dispose());
      materials.forEach((mat) => mat.dispose());
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full" id="threejs-container-ANIMATION_6" />;
}
