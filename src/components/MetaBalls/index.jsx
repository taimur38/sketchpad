import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import planevert from './shaders/plane.vert?raw';
import planefrag from './shaders/plane.frag?raw';

export default function MetaBalls() {
  const containerRef = useRef(null);

  useEffect(() => {
    let ticks = 0;
    const mouse = new THREE.Vector2();
    const left_hand = new THREE.Vector2();
    const head = new THREE.Vector2();

    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 400;

    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    const geometry = new THREE.PlaneGeometry(800, 600, 300, 400);
    const material = new THREE.ShaderMaterial({
      vertexShader: planevert,
      fragmentShader: planefrag,
      uniforms: {
        ticks: { value: ticks },
        mouse: { value: mouse },
        left_hand: { value: left_hand },
        head: { value: head },
        kinect: { value: 0 },
      },
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };

    const onMouseMove = (e) => {
      mouse.x = e.clientX / window.innerWidth;
      mouse.y = 1 - e.clientY / window.innerHeight;
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouseMove);

    containerRef.current.appendChild(renderer.domElement);

    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      ticks += 1;
      material.uniforms.ticks.value = ticks;
      material.uniforms.mouse.value = mouse;
      material.uniforms.left_hand.value = left_hand;
      material.uniforms.head.value = head;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} />;
}
