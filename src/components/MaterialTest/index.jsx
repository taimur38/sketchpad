import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import matteNoise from './matte_noise.png';

export default function MaterialTest() {
  const containerRef = useRef(null);

  useEffect(() => {
    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 400;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xff8da3);

    const lights = [
      new THREE.PointLight(0xffffff, 1, 0),
      new THREE.PointLight(0xffffff, 1, 0),
      new THREE.PointLight(0xffffff, 1, 0),
    ];
    lights[0].position.set(500, 800, 0);
    lights[1].position.set(800, 500, 0);
    lights[2].position.set(0, 0, 800);
    lights.forEach((l) => scene.add(l));

    const geometry = new THREE.BoxGeometry(100, 200, 100);
    const geometry2 = new THREE.BoxGeometry(100, 200, 100);

    const material = new THREE.MeshPhongMaterial({
      color: '#47FFFF',
      shininess: 75,
      reflectivity: 100,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = 175;
    scene.add(mesh);

    const loader = new THREE.TextureLoader();
    const aTex = loader.load(matteNoise);
    aTex.magFilter = THREE.NearestFilter;

    const lambertMaterial = new THREE.MeshLambertMaterial({
      color: '#47FFFF',
      reflectivity: 0,
      alphaMap: aTex,
      transparent: false,
    });

    const otherMesh = new THREE.Mesh(geometry2, lambertMaterial);
    otherMesh.position.x = -175;
    scene.add(otherMesh);

    const renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

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
      mesh.rotation.x += 0.005;
      mesh.rotation.y += 0.01;
      otherMesh.rotation.x += 0.005;
      otherMesh.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} style={{ overflow: 'hidden' }} />;
}
