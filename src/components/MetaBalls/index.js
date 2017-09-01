import React, { Component } from 'react'
import * as THREE from 'three'

/* eslint import/no-webpack-loader-syntax: off */
import planevert from '!raw-loader!./shaders/plane.vert'
import planefrag from '!raw-loader!./shaders/plane.frag'

let ticks = 0;
export default class MetaBalls extends Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {

		this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
		this.camera.position.z = 400;

		this.scene = new THREE.Scene();
		this.scene.background = new THREE.Color(0x47FFFF)

		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setPixelRatio( window.devicePixelRatio );
		this.renderer.setSize(window.innerWidth, window.innerHeight);

		const geometry = new THREE.PlaneBufferGeometry(400, 400, 300, 400);
		const material = new THREE.ShaderMaterial({
			vertexShader: planevert,
			fragmentShader: planefrag,
			uniforms: {
				ticks: {
					value: ticks
				}
			}
		})

		this.plane = new THREE.Mesh(geometry, material);

		this.scene.add(this.plane)

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
		ticks += 1;

		this.plane.material.uniforms.ticks.value = ticks;

		requestAnimationFrame(this.animate);
		this.renderer.render(this.scene, this.camera);
	}

	render() {
		return <div id="container" />
	}
}