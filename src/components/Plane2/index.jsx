import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Plane2({ height, width }) {
  const containerRef = useRef(null);
  const stateRef = useRef(null);

  useEffect(() => {
    const canvas_height = height || window.innerHeight;
    const canvas_width = width || window.innerWidth;
    const start_time = Date.now();

    const camera = new THREE.PerspectiveCamera(70, canvas_width / canvas_height, 1, 1000);
    camera.position.z = 400;

    const scene = new THREE.Scene();

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(canvas_width, canvas_height);
    renderer.setClearColor(0xfafafa, 0);

    const geometry = new THREE.DodecahedronGeometry(200, 3);
    const color = '#dddddd';

    const material = new THREE.MeshPhongMaterial({
      color,
      shininess: 50,
      specular: 50,
      flatShading: true,
    });

    const lights = [
      new THREE.PointLight(0x6e22f4, 0.7),
      new THREE.PointLight(0xcc4d33, 0.9),
      new THREE.HemisphereLight(0xffffff, 0x000000, 0.9),
    ];

    lights[0].position.set(500, 0, 300);
    lights[0].castShadow = true;
    lights[1].position.set(-500, 0, 300);
    lights[1].castShadow = true;

    lights.forEach((l) => scene.add(l));

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Store original positions for animation
    const posAttr = geometry.getAttribute('position');
    const originalPositions = new Float32Array(posAttr.array);

    containerRef.current.appendChild(renderer.domElement);

    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = (Date.now() - start_time) / 400;

      for (let i = 0; i < posAttr.count; i++) {
        const ox = originalPositions[i * 3];
        const oy = originalPositions[i * 3 + 1];
        const oz = originalPositions[i * 3 + 2];
        const x = ox / 200;
        const y = oy / 200;
        const displacement = Math.sin(t / 3.5 - (2 * x + y) * 2 * Math.PI) * 25 +
                            Math.sin(t / 4.0 - y * 2.5 * Math.PI) * 25;
        // Apply displacement along the vertex normal direction (radial for dodecahedron)
        const len = Math.sqrt(ox * ox + oy * oy + oz * oz) || 1;
        posAttr.setXYZ(i,
          ox + (ox / len) * displacement * 0.1,
          oy + (oy / len) * displacement * 0.1,
          oz + (oz / len) * displacement * 0.1
        );
      }
      posAttr.needsUpdate = true;
      geometry.computeVertexNormals();

      renderer.render(scene, camera);
    };
    animate();

    stateRef.current = { renderer, camera, animId };

    return () => {
      cancelAnimationFrame(animId);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  // Handle resize
  useEffect(() => {
    if (!stateRef.current) return;
    const { renderer, camera } = stateRef.current;
    const w = width || window.innerWidth;
    const h = height || window.innerHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }, [width, height]);

  return <div ref={containerRef} />;
}
