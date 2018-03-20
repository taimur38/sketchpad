import React, { Component } from 'react'
import * as THREE from 'three'

/* eslint import/no-webpack-loader-syntax: off */
import planevert from '!raw-loader!./shaders/plane.vert'
import planefrag from '!raw-loader!./shaders/plane.frag'
import { fullScreen } from '../../helpers.js'

let ticks = 0;

class MetaBalls extends Component {

	constructor(props) {
		super(props)

		this.state = {
			kinect: false
		}
	}

	on_msg = (msg) => {

		try {
			const parsed = JSON.parse(msg.data);
			//console.log(parsed.bodies)

			const hand = parsed.bodies[0].joints.find(j => j.type === "HandRight");
			const left_hand = parsed.bodies[0].joints.find(j => j.type === "HandLeft");
			const head = parsed.bodies[0].joints.find(j => j.type === "Head")


			//console.log(hand.x, hand.y, hand.z, hand.trackingState);

			const x_scale = 2.0;
			const y_scale = 2.0;

			this.mouse.x = hand.x / x_scale + 0.5;
			this.mouse.y = hand.y / y_scale;

			this.left_hand.x = left_hand.x / x_scale + 0.5;
			this.left_hand.y = left_hand.y / y_scale;

			this.head.x = head.x / x_scale + 0.5;
			this.head.y = head.y / y_scale;

		}
		catch(e) {
			console.error(e)
		}

	}

	componentDidMount() {

		this.ws = new WebSocket("ws://192.168.0.15:8181/kinect");
		this.ws.onmessage = this.on_msg;
		this.ws.onopen = () => {
			this.setState({ kinect: true });
			this.plane.material.uniforms.kinect.value = 1;

		}
		this.ws.onerror = err => {

			this.setState({
				kinect: false 
			})
		}

		this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
		this.camera.position.z = 400;

		this.raycaster = new THREE.Raycaster();
		this.mouse = new THREE.Vector2();
		this.left_hand = new THREE.Vector2();
		this.head = new THREE.Vector2();

		this.scene = new THREE.Scene();
		//this.scene.background = new THREE.Color(0x47FFFF)

		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setPixelRatio( window.devicePixelRatio );
		this.renderer.setSize(window.innerWidth, window.innerHeight);

		const geometry = new THREE.PlaneBufferGeometry(800, 600, 300, 400);
		const material = new THREE.ShaderMaterial({
			vertexShader: planevert,
			fragmentShader: planefrag,
			uniforms: {
				ticks: {
					value: ticks
				},
				mouse: {
					value: this.mouse
				},
				left_hand: {
					value: this.left_hand
				},
				head: {
					value: this.head
				},
				kinect: {
					value: this.state.kinect ? 1 : 0
				}
			}
		})

		this.plane = new THREE.Mesh(geometry, material);

		this.scene.add(this.plane)

		window.onresize = this.windowResize;
		window.onmousemove = this.mouseMove;

		document.querySelector("#container").appendChild(this.renderer.domElement);
		this.animate();

	}

	windowResize = () => {
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();
	}

	mouseMove = e => {
		if(!this.state.kinect) {
			this.mouse.x = (e.clientX / window.innerWidth); 
			this.mouse.y = 1 - (e.clientY / window.innerHeight);
		}
	}

	animate = () => {
		ticks += 1;

		this.plane.material.uniforms.ticks.value = ticks;

		this.plane.material.uniforms.mouse.value = this.mouse;
		this.plane.material.uniforms.left_hand.value = this.left_hand;
		this.plane.material.uniforms.head.value = this.head;

		requestAnimationFrame(this.animate);
		this.renderer.render(this.scene, this.camera);
	}

	render() {
		return <div id="container" />
	}
}

export default fullScreen(MetaBalls)