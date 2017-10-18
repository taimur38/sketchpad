import React, { Component } from 'react'
import * as THREE from 'three'

/* eslint import/no-webpack-loader-syntax: off */
import gloopvert from '!raw-loader!./shaders/gloop.vert'
import gloopfrag from '!raw-loader!./shaders/gloop.frag'
//import waterVid from './output.mp4'
import waterVid from './water.mp4'

export default class VideoGloop extends Component {

	createVideoTexture = () => {

		const video = document.createElement('video');

		video.src = waterVid;
		video.height = 1024;
		//video.width = 1820;
		video.muted = true;
		video.play();
		video.autoplay = true;
		video.loop = true;
		if(this.video)
			this.video.src = waterVid;

		const canvas = document.createElement('canvas');
		canvas.width = 1024;
		canvas.height = 1024;
		const ctx = canvas.getContext('2d')
		ctx.fillStyle = "#fff000"
		ctx.fillRect(0, 0, canvas.width, canvas.height)

		const videoTexture = new THREE.Texture(canvas);
		videoTexture.wrapT = THREE.RepeatWrapping;
		videoTexture.wrapS = THREE.RepeatWrapping;

		document.onkeydown = this.onKeyDown;

		this.mode = 0;
		this.R1 = 0.25;
		this.speed = 1;

		return {
			video,
			canvas,
			texture: videoTexture
		}
	}

	componentDidMount() {

		this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
		this.camera.position.z = 1000;

		this.start_time = Date.now();
		this.scene = new THREE.Scene();

		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setPixelRatio( window.devicePixelRatio );
		this.renderer.setSize(window.innerWidth, window.innerHeight);

		window.onresize = this.windowResize;

		this.videoAssets = this.createVideoTexture();

		const geometry = new THREE.PlaneBufferGeometry(1024, 1024);
		const material = new THREE.ShaderMaterial({
			vertexShader: gloopvert,
			fragmentShader: gloopfrag,
			uniforms: {
				tex: {
					type: "t",
					value: this.videoAssets.texture
				},
				time: {
					value: Date.now() - this.start_time
				},
				mode: {
					value: this.mode
				},
				c1: {
					value: new THREE.Vector2(.5, .5)
				},
				c2: {
					value: new THREE.Vector2(.5, .5)
				},
				c3: {
					value: new THREE.Vector2(.5, .5)
				},
				c4: {
					value: new THREE.Vector2(.5, .5)
				},
				R1: {
					value: this.R1
				}
			}
		})

		this.mesh = new THREE.Mesh(geometry, material);
		this.scene.add(this.mesh);

		document.querySelector("#container").appendChild(this.renderer.domElement);
		this.animate();
	}

	animate = () => {

		/*
		vids.videoCanvas.getContext('2d').drawImage(vids.videoElement, 0, 0);
		vids.videoTexture.needsUpdate = true;
		*/

		const t = Date.now() - this.start_time;
		this.videoAssets.canvas.getContext('2d').drawImage(this.videoAssets.video, 0, 0, 1024, 1024);
		this.videoAssets.texture.needsUpdate = true;
		this.mesh.material.uniforms.time.value = t;
		this.mesh.material.uniforms.time.needsUpdate = true;

		this.mesh.material.uniforms.c1.value.x = (Math.sin(t/(this.speed * 1000)) + 1)/2;
		this.mesh.material.uniforms.c1.value.y = (Math.cos(t/(this.speed * 1000) + 3.14/2) + 1)/2;

		this.mesh.material.uniforms.c2.value.x = (Math.sin(t/(this.speed * 1000) + 3.14/2) + 1)/2;
		this.mesh.material.uniforms.c2.value.y = (Math.cos(t/(this.speed * 500)) + 1)/2;

		this.mesh.material.uniforms.c3.value.x = (Math.cos(t/(this.speed * 1000) + 3.14) + 1)/2;
		this.mesh.material.uniforms.c3.value.y = (Math.tan(t/(this.speed * 1000)) + 1)/2;

		this.mesh.material.uniforms.c4.value.x = (Math.sin(t/(this.speed * 750) + 3.14/2) + 1)/2;
		this.mesh.material.uniforms.c4.value.y = (Math.sin(t/(this.speed * 1000) + 3.14/2) + 1)/2;

		this.mesh.material.uniforms.c1.needsUpdate = true;
		this.mesh.material.uniforms.c2.needsUpdate = true;
		this.mesh.material.uniforms.c3.needsUpdate = true;
		this.mesh.material.uniforms.c4.needsUpdate = true;

		this.mesh.material.uniforms.R1.value = this.R1;
		this.mesh.material.uniforms.R1.needsUpdate = true;

		this.mesh.material.uniforms.mode.value = this.mode;
		this.mesh.material.uniforms.mode.needsUpdate = true;

		this.renderer.render(this.scene, this.camera);
		requestAnimationFrame(this.animate);

	}

	windowResize = () => {
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();
	}

	onKeyDown = (e) => {
		if(e.key == "ArrowUp") {
			this.R1 += 0.005;
		}

		if(e.key == "ArrowDown") {
			this.R1 -= 0.005;
		}

		if(e.key == "ArrowLeft") {
			this.speed += 0.05;
		}
		if(e.key == "ArrowRight") {
			this.speed -= 0.05;
		}

		if(e.key == "0") {
			this.mode = 0
		}
		if(e.key == "1") {
			this.mode = 1;
		}
		if(e.key == "2") {
			this.mode = 2;
		}
		if(e.key == "3") {
			this.mode = 3;
		}
		if(e.key == "4") {
			this.mode = 4;
		}
		if(e.key == "5") {
			this.mode = 5;
		}

	}

	render() {
			//<video id="test" ref={x => this.video = x} autoPlay controls loop/>
		return <div>
			<div id="container" />
		</div>
			
	}

}