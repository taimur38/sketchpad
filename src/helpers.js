import * as THREE from 'three'

export const makeTexture = (img) => {
	const image = new Image();
	image.src = img;

	const tex = new THREE.Texture();
	tex.image = image;
	image.onload = () => tex.needsUpdate = true;

	return tex;
}

export const forceFullScreenOnTouch = () => {
	const e = document.getElementById("root");
	const f = (e.requestFullscreen || e.webkitRequestFullscreen || e.mozRequestFullScreen || e.msRequestFullScreen).bind(e);
	e.onclick = () => f();
	e.ontouchstart = () => f();
}