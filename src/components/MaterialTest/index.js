import React, { Component } from 'react'
import * as THREE from 'three'

export default class MaterialTest extends Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {

		this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
		this.camera.position.z = 400;

		this.scene = new THREE.Scene();
		this.scene.background = new THREE.Color(0xFF8DA3)

		const lights = [
			new THREE.PointLight (0xffffff, 1, 0),
			new THREE.PointLight (0xffffff, 1, 0),
			new THREE.PointLight (0xffffff, 1, 0)
		]

		lights[0].position.set(500, 800, 0);
		lights[1].position.set(800, 500, 0);
		lights[2].position.set(0, 0, 800);
		lights.forEach(l => this.scene.add(l));
		//this.scene.add(light);

		const geometry = new THREE.BoxBufferGeometry(100, 200, 100 );

		const geometry2 = new THREE.BoxBufferGeometry(100, 200, 100);

		const material = new THREE.MeshPhongMaterial({
			color: "#47FFFF",
			shininess: 75,
			specular: 0x67FFFF,
			reflectivity: 100
		});

		this.mesh = new THREE.Mesh( geometry, material );
		this.mesh.position.x = 175;
		this.scene.add(this.mesh);

		const lambertMaterial = new THREE.MeshLambertMaterial({
			color: "#47FFFF",
			reflectivity: 0
		});

		this.other_mesh = new THREE.Mesh(geometry2, lambertMaterial);
		this.other_mesh.position.x = -175;
		this.scene.add(this.other_mesh);

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

		this.other_mesh.rotation.x += 0.005;
		this.other_mesh.rotation.y += 0.01;

		this.renderer.render(this.scene, this.camera);
	}

	render() {
		return <div id="container" />
	}
}