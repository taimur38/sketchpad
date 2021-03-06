import React, { Component } from 'react'
import * as THREE from 'three'

/* eslint import/no-webpack-loader-syntax: off */
import gloopvert from '!raw-loader!./shaders/gloop.vert'
import gloopfrag from '!raw-loader!./shaders/gloop.frag'
//import waterVid from './output.mp4'
import scene4 from './scene4.mp4'
import scene1 from './scene1.mp4'
import scene2 from './scene2.mp4'
import scene3 from './scene3.mp4'
//import waterVid from './crop.mp4'

export default class VideoGloop extends Component {

	createVideoTexture = (vid) => {

		const video = document.createElement('video');

		video.src = vid;
		video.height = 1024;
		//video.width = 1820;
		video.muted = true;
		//video.play();
		//video.autoplay = true;
		video.loop = true;
		if(this.video)
			this.video.src = vid;

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

		this.mode = 0;
		this.R1 = 0.25;
		this.speed = 2.0;
		this.mode_time = 0;
		this.stop = false;
		this.chorus = 0.0;
		this.crazy = 0.0;
		this.vhsOn = 0.0;
		this.show_bg = 0.0;
		this.show_bg_time = Date.now();
		this.show_gloop = 0.0;
		this.show_gloop_time = Date.now();

		this.video_index = 0;
		this.video_index_time = 0;

		this.crazyrands = [];

		for(let i = 0; i < 15; i++) {
			this.crazyrands.push([Math.random(), Math.random(), Math.random(), Math.random()]);
		}


		document.onkeydown = this.onKeyDown;

		this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
		this.camera.position.z = 1000;

		this.start_time = Date.now();
		this.scene = new THREE.Scene();

		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setPixelRatio( window.devicePixelRatio );
		this.renderer.setSize(window.innerWidth, window.innerHeight);

		window.onresize = this.windowResize;

		this.videoAssets = [
			this.createVideoTexture(scene2),
			this.createVideoTexture(scene1),
			this.createVideoTexture(scene3),
			this.createVideoTexture(scene4)
		]

		const geometry = new THREE.PlaneBufferGeometry(1920, 1080);
		const material = new THREE.ShaderMaterial({
			vertexShader: gloopvert,
			fragmentShader: gloopfrag,
			uniforms: {
				tex: {
					type: "t",
					value: this.videoAssets[0].texture
				},
				nextex: {
					type: "t",
					value: this.videoAssets[1].texture
				},
				time: {
					value: Date.now() - this.start_time
				},
				mode: {
					value: this.mode
				},
				horsemen: {
					type: 'v2v',
					value: [
						new THREE.Vector2(.5, .5),
						new THREE.Vector2(.5, .5),
						new THREE.Vector2(.5, .5),
						new THREE.Vector2(.5, .5)
					]
				},
				cs: {
					type: 'v2v',
					value: [ new THREE.Vector2( 0.1, 0.0 ), 
							new THREE.Vector2( 0.3, 0.0 ),
							new THREE.Vector2( 0.5, 0.0 ),
							new THREE.Vector2( 0.7, 0.0 ),
							new THREE.Vector2( 0.9, 0.0 )]
				},
				crazyC: {
					type: 'v2v',
					value: [ new THREE.Vector2( 0.1, 0.0 ), 
							new THREE.Vector2( 0.3, 0.0 ),
							new THREE.Vector2( 0.5, 0.0 ),
							new THREE.Vector2( 0.7, 0.0 ),
							new THREE.Vector2( 0.9, 0.0 ),
							new THREE.Vector2( 0.1, 0.0 ), 
							new THREE.Vector2( 0.3, 0.0 ),
							new THREE.Vector2( 0.5, 0.0 ),
							new THREE.Vector2( 0.7, 0.0 ),
							new THREE.Vector2( 0.9, 0.0 ),
							new THREE.Vector2( 0.1, 0.0 ), 
							new THREE.Vector2( 0.3, 0.0 ),
							new THREE.Vector2( 0.5, 0.0 ),
							new THREE.Vector2( 0.7, 0.0 ),
							new THREE.Vector2( 0.9, 0.0 )]
				},
				chorus: {
					value: 0.0
				},
				crazy: {
					value: 0.0
				},
				R1: {
					value: this.R1
				},
				mode_time: {
					value: this.mode_time
				},
				vhsOn: {
					value: 0.0
				},
				show_bg: {
					value: this.show_bg
				},
				show_bg_time: {
					value: this.show_bg_time
				},
				show_gloop: {
					value: this.show_gloop,
				},
				show_gloop_time:{
					value: this.show_gloop_time
				},
				video_index: {
					value: this.video_index
				},
				video_index_time: {
					value: this.video_index_time
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
		if(!this.stop) {
			this.t = Date.now() - this.start_time;
		}
		
		this.mesh.material.uniforms.tex.value = this.videoAssets[(this.video_index + 1) % this.videoAssets.length].texture;
		this.mesh.material.uniforms.tex.needsUpdate = true;
		this.mesh.material.uniforms.nextex.value = this.videoAssets[(this.video_index)].texture;
		this.mesh.material.uniforms.nextex.needsUpdate = true;

		for(let i = 0; i < this.videoAssets.length; i++) {
			this.videoAssets[i].canvas.getContext('2d').drawImage(this.videoAssets[i].video, 0, 0, 1024, 1024);
			this.videoAssets[i].texture.needsUpdate = true;
		}

		this.mesh.material.uniforms.video_index_time.value = Date.now() - this.video_index_time;
		this.mesh.material.uniforms.video_index_time.needsUpdate = true; 

		this.mesh.material.uniforms.video_index.value = this.video_index; 
		this.mesh.material.uniforms.video_index.needsUpdate = true;

		this.mesh.material.uniforms.time.value = this.t;
		this.mesh.material.uniforms.mode_time.value = Date.now() - this.mode_time;
		this.mesh.material.uniforms.time.needsUpdate = true;

		this.mesh.material.uniforms.horsemen.value[0].x = (Math.sin(this.t/(this.speed * 1000)) + 1)/2;
		this.mesh.material.uniforms.horsemen.value[0].y = (Math.cos(this.t/(this.speed * 1000) + 3.14/2) + 1)/2;

		this.mesh.material.uniforms.horsemen.value[1].x = (Math.sin(this.t/(this.speed * 1000) + 3.14/2) + 1)/2;
		this.mesh.material.uniforms.horsemen.value[1].y = (Math.cos(this.t/(this.speed * 500)) + 1)/2;

		this.mesh.material.uniforms.horsemen.value[2].x = (Math.cos(this.t/(this.speed * 1000) + 3.14) + 1)/2;
		this.mesh.material.uniforms.horsemen.value[2].y = (Math.tan(this.t/(this.speed * 1000)) + 1)/2;

		this.mesh.material.uniforms.horsemen.value[3].x = (Math.sin(this.t/(this.speed * 750) + 3.14/2) + 1)/2;
		this.mesh.material.uniforms.horsemen.value[3].y = (Math.sin(this.t/(this.speed * 1000) + 3.14/2) + 1)/2;

		for(let i = 0; i < 5; i++) {
			this.mesh.material.uniforms.cs.value[i].y = (Math.sin(this.t/(this.speed * 900) + 3.14/2) + 1)/2;
		}
		for(let i = 0; i < 15; i++) {
			this.mesh.material.uniforms.crazyC.value[i].x = (Math.sin(this.t/(this.speed * (500 + this.crazyrands[i][0]*500)) + this.crazyrands[i][2]*3.14) + 1)/2;
			this.mesh.material.uniforms.crazyC.value[i].y = (Math.sin(this.t/(this.speed * (500 + this.crazyrands[i][2]*500)) + this.crazyrands[i][3]*3.14) + 1)/2;
		}

		this.mesh.material.uniforms.horsemen.needsUpdate = true;
		this.mesh.material.uniforms.cs.needsUpdate = true;
		this.mesh.material.uniforms.crazyC.needsUpdate = true;

		this.mesh.material.uniforms.cs.needsUpdate = true;

		this.mesh.material.uniforms.chorus.value = this.chorus;
		this.mesh.material.uniforms.chorus.needsUpdate = true;

		this.mesh.material.uniforms.crazy.value = this.crazy;
		this.mesh.material.uniforms.crazy.needsUpdate = true;

		this.mesh.material.uniforms.vhsOn.value = this.vhsOn;
		this.mesh.material.uniforms.vhsOn.needsUpdate = true;

		this.mesh.material.uniforms.R1.value = this.R1;
		this.mesh.material.uniforms.R1.needsUpdate = true;

		this.mesh.material.uniforms.mode.value = this.mode;
		this.mesh.material.uniforms.mode.needsUpdate = true;

		this.mesh.material.uniforms.show_bg_time.value = Date.now() - this.show_bg_time;
		this.mesh.material.uniforms.show_bg_time.needsUpdate = true;

		this.mesh.material.uniforms.show_bg.value = this.show_bg;
		this.mesh.material.uniforms.show_bg.needsUpdate = true;

		this.renderer.render(this.scene, this.camera);
		requestAnimationFrame(this.animate);

	}

	windowResize = () => {
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();
	}

	onKeyDown = (e) => {
		if(e.key === "ArrowUp") {
			this.R1 += 0.005;
		}

		if(e.key === "ArrowDown") {
			this.R1 -= 0.005;
		}

		if(e.key === "ArrowLeft") {
			this.speed += 0.05;
		}
		if(e.key === "ArrowRight") {
			this.speed -= 0.05;
		}

		if(e.key === "0") {
			this.mode = 0
			this.mode_time = Date.now();
		}
		if(e.key === "1") {
			this.mode = 1;
			this.mode_time = Date.now();
		}
		if(e.key === "2") {
			this.mode = 2;
			this.mode_time = Date.now();
		}
		if(e.key === "3") {
			this.mode = 3;
			this.mode_time = Date.now();
		}
		if(e.key === "4") {
			this.mode = 4;
			this.mode_time = Date.now();
		}
		if(e.key === "5") {
			this.mode = 5;
			this.mode_time = Date.now();
		}
		if(e.key === "6") {
			this.mode = 6;
			this.mode_time = Date.now();
		}

		if(e.key === "Enter") {
			this.stop = !this.stop;
		}

		if(e.key === "c") {
			this.chorus = this.chorus > 0.0 ? 0.0 : 1.0;
		}
		if(e.key === "x") {
			this.crazy = this.crazy > 0.0 ? 0.0 : 1.0;
		}
		if(e.key === "v") {
			this.vhsOn = this.vhsOn > 0.0 ? 0.0 : 1.0;
		}

		if(e.key === "b") {
			this.show_bg = 1.0 - this.show_bg;
			this.show_bg_time = Date.now();
		}
		if(e.key == "g") {
			this.show_gloop - 1.0 - this.show_gloop;
			this.show_gloop_time = Date.now();
		}

		if(e.key == "n") {
			this.video_index = (this.video_index + 1) % this.videoAssets.length;

			this.videoAssets[(this.video_index + 1) % this.videoAssets.length].video.currentTime = 0;
			//this.videoAssets[(this.video_index + 1) % this.videoAssets.length].video.play();
			this.videoAssets[(this.video_index + 1) % this.videoAssets.length].video.pause();
			this.video_index_time = Date.now();
			console.log(this.video_index);
		}

		if(e.key == "p") {
			const v = this.videoAssets[(this.video_index + 1) % this.videoAssets.length].video;
			v.paused ? v.play() : v.pause();
		}

	}

	render() {
			//<video id="test" ref={x => this.video = x} autoPlay controls loop/>
		return <div>
			<div id="container" />
		</div>
			
	}

}