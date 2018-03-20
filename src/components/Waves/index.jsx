/* eslint import/no-webpack-loader-syntax: off */

import React, { Component } from 'react'
import * as THREE from 'three'
import planevert from '!raw-loader!./shaders/plane.vert'
import planefrag from '!raw-loader!./shaders/plane.frag'
import { fullScreen } from '../../helpers.js'

class Waves extends Component {

	componentDidMount() {

		this.start_time = Date.now();

		this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
		this.camera.position.z = 400;

		this.scene = new THREE.Scene();

		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setPixelRatio( window.devicePixelRatio );
		this.renderer.setSize(window.innerWidth, window.innerHeight);

		const geometry = new THREE.PlaneBufferGeometry(1400, 1200, 10, 10);
		const material = new THREE.ShaderMaterial({
			vertexShader: planevert,
			fragmentShader: planefrag,
			uniforms: {
				time: {
					value: Date.now()
				},
				color1: {
					value: new THREE.Color("#6E2264")
				},
				color2: {
					value: new THREE.Color("#CC4D33")
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
		requestAnimationFrame(this.animate);

		this.plane.material.uniforms.time.value = Date.now() - this.start_time;

		this.renderer.render(this.scene, this.camera);
	}

	render() {
		return <div id="container" />
	}
}

export default fullScreen(Waves);