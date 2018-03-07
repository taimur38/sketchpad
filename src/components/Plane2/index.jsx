/* eslint import/no-webpack-loader-syntax: off */

import React, { Component } from 'react'
import * as THREE from 'three'

import { forceFullScreenOnTouch } from '../../helpers.js'

export default class Plane2 extends Component {

	componentDidMount() {

		const canvas_height = this.props.height || window.innerHeight;
		const canvas_width = this.props.width || window.innerWidth;

		this.start_time = Date.now();

		const aspect_ratio = canvas_width / canvas_height;
		this.camera = new THREE.PerspectiveCamera(70, canvas_width / canvas_height, 1, 1000);
		this.camera.position.z = 400;

		this.scene = new THREE.Scene();

		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setPixelRatio( window.devicePixelRatio );
		this.renderer.setSize(canvas_width, canvas_height);

		let geometry = new THREE.PlaneGeometry(1400, 1200, 30, 30);
		if(aspect_ratio < 1.0)
			geometry = new THREE.PlaneGeometry(1200, 1400, 30, 30);

		//const color = Math.random() * 0xffffff;
		const color = "#4793ff"
		//const color = "#f4a460";
		//const color = "#47FFFF";
		console.log(color)
		const material = new THREE.MeshPhongMaterial({
			color: color,
			shininess: 30,
			specular: 0,
			shading: THREE.FlatShading,
		});

		const lights = [
			new THREE.PointLight(0xfffffff, 0.5),
			//new THREE.PointLight (0xffffff, 1),
			new THREE.HemisphereLight(0xaaaaaa, 0x000000, 0.9)
			//new THREE.PointLight (0xffffff, 1, 0)
		];

		lights[0].position.set(500, 0, 300);
		lights[0].castShadow = true;
		lights[0].shadow.mapSize.width = 2048;
		lights[0].shadow.mapSize.height = 2048;
		lights.forEach(l => this.scene.add(l));

		this.plane = new THREE.Mesh(geometry, material);
		this.plane.position.z = 0;
		this.plane.position.x = 0;
		this.plane.position.y = 0;
		this.scene.add(this.plane);

		window.onresize = () => {
			if(this.props.height === undefined) {
				this.renderer.setSize(window.innerWidth, window.innerHeight);
				this.camera.aspect = window.innerWidth / window.innerHeight;
				this.camera.updateProjectionMatrix();
			}
		}

		if(this.props.height === undefined) {
			forceFullScreenOnTouch();
		}

		document.querySelector("#container").appendChild(this.renderer.domElement);
		this.animate();
	}

	componentWillReceiveProps(nextProps) {
		this.renderer.setSize(nextProps.width, nextProps.height);
		this.camera.aspect = nextProps.width / nextProps.height;
		this.camera.updateProjectionMatrix();
	}

	animate = () => {
		requestAnimationFrame(this.animate);

		const t = Date.now() - this.start_time;
		for(let i = 0; i < this.plane.geometry.vertices.length; i++) {
			const curr = this.plane.geometry.vertices[i];
			const x = curr.x / (1400/2);
			const y = curr.y / (1200/2);
			this.plane.geometry.vertices[i].z = Math.sin(t / 3500.0 - (2*x + y) * 2 * 3.1415) * 25 + Math.sin(t / 4000.0 - (y) * 2.5 * 3.1415) * 25;
		}
		this.plane.geometry.computeFaceNormals();
		this.plane.geometry.verticesNeedUpdate = true;

		this.renderer.render(this.scene, this.camera);
	}

	componentWillUnmount() {
		console.log('component unmount');
	}

	render() {
		return <div id="container" />
	}
}