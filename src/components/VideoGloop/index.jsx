import React, { Component } from 'react'
import * as THREE from 'three'

/* eslint import/no-webpack-loader-syntax: off */
import gloopvert from '!raw-loader!./shaders/gloop.vert'
import gloopfrag from '!raw-loader!./shaders/gloop.frag'
import waterVid from './output.mp4'

export default class VideoGloop extends Component {

	createVideoTexture = () => {

		const video = document.createElement('video');

		video.src = waterVid;
		video.height = 1024;
		video.width = 1024;
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

		this.videoAssets.canvas.getContext('2d').drawImage(this.videoAssets.video, 0, 0);
		this.videoAssets.texture.needsUpdate = true;
		this.mesh.material.uniforms.time.value = Date.now() - this.start_time;
		this.mesh.material.uniforms.time.needsUpdate = true;

		this.renderer.render(this.scene, this.camera);
		requestAnimationFrame(this.animate);

		//console.log(this.videoAssets.video.currentTime)

	}

	windowResize = () => {
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();
	}

	render() {
			//<video id="test" ref={x => this.video = x} autoPlay controls loop/>
		return <div>
			<div id="container" />
		</div>
			
	}

}