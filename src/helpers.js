import * as THREE from 'three'
import React from 'react'

export const makeTexture = (img) => {
	const image = new Image();
	image.src = img;

	const tex = new THREE.Texture();
	tex.image = image;
	image.onload = () => tex.needsUpdate = true;

	return tex;
}


// fix this pattern later
const forceFullScreenOnTouch = () => {
	const e = document.getElementById("root");
	const f = (e.requestFullscreen || e.webkitRequestFullscreen || e.mozRequestFullScreen || e.msRequestFullScreen).bind(e);
	e.onclick = () => f();
	e.ontouchstart = () => f();
};

const undoFullScreenOnTouch = () => {
	const e = document.getElementById("root");
	e.onclick = () => {}
	e.ontouchstart = () => {}
}

export const fullScreen = (Comp) => {
	return class extends React.Component {

		componentDidMount() {
			forceFullScreenOnTouch();
		}

		componentWillUnmount() {
			undoFullScreenOnTouch();
		}

		render() {
			return <Comp />
		}
	}
}
