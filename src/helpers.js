import * as THREE from 'three'

export const makeTexture = (img) => {
	const image = new Image();
	image.src = img;

	const tex = new THREE.Texture();
	tex.image = image;
	image.onload = () => tex.needsUpdate = true;

	return tex;
}