import * as THREE from 'three';

export const makeTexture = (img) => {
  const loader = new THREE.TextureLoader();
  return loader.load(img);
};
