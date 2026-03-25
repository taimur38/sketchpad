import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import planevert from './shaders/plane.vert?raw';
import planefrag from './shaders/plane.frag?raw';

export default function Waves() {
  const containerRef = useRef(null);

  useEffect(() => {
    const start_time = Date.now();
    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 400;

    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    const geometry = new THREE.PlaneGeometry(1400, 1200, 10, 10);
    const material = new THREE.ShaderMaterial({
      vertexShader: planevert,
      fragmentShader: planefrag,
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color('#6E2264') },
        color2: { value: new THREE.Color('#CC4D33') },
      },
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    containerRef.current.appendChild(renderer.domElement);

    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      material.uniforms.time.value = Date.now() - start_time;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} />;
}
