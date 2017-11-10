/* eslint import/no-webpack-loader-syntax: off */

import React, { Component } from 'react'
import * as THREE from 'three'

export default class Plane2 extends Component {

	componentDidMount() {

		this.start_time = Date.now();

		this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
		this.camera.position.z = 400;

		this.scene = new THREE.Scene();

		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setPixelRatio( window.devicePixelRatio );
		this.renderer.setSize(window.innerWidth, window.innerHeight);

		const geometry = new THREE.PlaneGeometry(1400, 1200, 10, 10);
		const material = new THREE.MeshLambertMaterial({
			color: "#47FFFF",
		});

		const lights = [
			new THREE.PointLight(0xfffffff, 1),
			new THREE.PointLight (0xffffff, 1),
			//new THREE.PointLight (0xffffff, 1, 0)
		];

		lights[0].position.set(500, 0, 300);
		lights[1].position.set(-800, 500, 200);
		lights[0].castShadow = true;
		lights[1].castShadow = true;
		//lights[2].position.set(0, 0, 800);
		lights.forEach(l => this.scene.add(l));

		this.plane = new THREE.Mesh(geometry, material);
		this.plane.position.z = 0;
		this.scene.add(this.plane);

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

		//this.plane.material.uniforms.time.value = Date.now() - this.start_time;
		//console.log(this.plane.geometry.attributes.position)
		
		const t = Date.now() - this.start_time;
		//console.log(this.plane.geometry.vertices)
		for(let i = 0; i < this.plane.geometry.vertices.length; i++) {
			const curr = this.plane.geometry.vertices[i];
			this.plane.geometry.vertices[i].z = Math.sin(t / 1000.0 + curr.x + curr.y) * 100;
		}
		this.plane.geometry.computeFaceNormals();
		this.plane.geometry.verticesNeedUpdate = true;

		/*
		for(let i = 0; i < this.plane.geometry.attributes.position.array - 3; i += 3) {
			const x = this.plane.geometry.attributes.position.array[i];
			const y = this.plane.geometry.attributes.position.array[i + 1];
			const z = this.plane.geometry.attributes.position.array[i + 2];

			this.plane.geometry.attributes.position.array[i + 2] = Math.sin(t/100.0 + x * 2) * 100;

		}

		/*
		this.plane.geometry.vertices = this.plane.geometry.vertices.map(x => {
			console.log(x);
			return x;
		})*/

		this.renderer.render(this.scene, this.camera);
	}

	render() {
		return <div id="container" />
	}
}