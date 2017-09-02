import React, { Component } from 'react'
import * as THREE from 'three'

export default class Cube extends Component {

	componentDidMount() {

		this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
		this.camera.position.z = 400;

		this.scene = new THREE.Scene();

		const geometry = new THREE.BoxBufferGeometry(200, 200, 200);
		const material = new THREE.MeshBasicMaterial({
			color: Math.random() * 0xffffff 
		});

		this.mesh = new THREE.Mesh( geometry, material );
		this.scene.add(this.mesh);

		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setPixelRatio( window.devicePixelRatio );
		this.renderer.setSize(window.innerWidth, window.innerHeight);

		window.onresize = this.windowResize;

		document.querySelector("#container").appendChild(this.renderer.domElement);
		this.animate();

	}

	windowResize = () => {
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();
	}

	animate = () => {
		requestAnimationFrame(this.animate);

		this.mesh.rotation.x += 0.005;
		this.mesh.rotation.y += 0.01;

		this.renderer.render(this.scene, this.camera);
	}

	render() {
		return <div id="container" />
	}
}