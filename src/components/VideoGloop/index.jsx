import React, { Component } from 'react'
import * as THREE from 'three'

/* eslint import/no-webpack-loader-syntax: off */
import gloopvert from '!raw-loader!./shaders/gloop.vert'
import gloopfrag from '!raw-loader!./shaders/gloop.frag'
//import waterVid from './output.mp4'
//import waterVid from './water.mp4'
import waterVid from './scene1.mp4'
//import waterVid from './crop.mp4'

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
		this.mode_time = 0;
		this.stop = false;
		this.chorus = 0.0;
		this.crazy = 0.0;
		this.vhsOn = 0.0;

		this.crazyrands = [];

		for(let i = 0; i < 15; i++) {
			this.crazyrands.push([Math.random(), Math.random(), Math.random(), Math.random()]);
		}

		return {
			video,
			canvas,
			texture: videoTexture
		}
	}

	componentDidMount() {

		this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
		this.camera.position.z = 1000;

		this.start_time = Date.now();
		this.scene = new THREE.Scene();

		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setPixelRatio( window.devicePixelRatio );
		this.renderer.setSize(window.innerWidth, window.innerHeight);

		window.onresize = this.windowResize;

		this.videoAssets = this.createVideoTexture();

		const geometry = new THREE.PlaneBufferGeometry(1920, 1080);
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
		if(!this.stop)
			this.t = Date.now() - this.start_time;
		this.videoAssets.canvas.getContext('2d').drawImage(this.videoAssets.video, 0, 0, 1024, 1024);
		this.videoAssets.texture.needsUpdate = true;
		this.mesh.material.uniforms.time.value = this.t;
		this.mesh.material.uniforms.mode_time.value = Date.now() - this.mode_time;
		this.mesh.material.uniforms.time.needsUpdate = true;

		this.mesh.material.uniforms.c1.value.x = (Math.sin(this.t/(this.speed * 1000)) + 1)/2;
		this.mesh.material.uniforms.c1.value.y = (Math.cos(this.t/(this.speed * 1000) + 3.14/2) + 1)/2;

		this.mesh.material.uniforms.c2.value.x = (Math.sin(this.t/(this.speed * 1000) + 3.14/2) + 1)/2;
		this.mesh.material.uniforms.c2.value.y = (Math.cos(this.t/(this.speed * 500)) + 1)/2;

		this.mesh.material.uniforms.c3.value.x = (Math.cos(this.t/(this.speed * 1000) + 3.14) + 1)/2;
		this.mesh.material.uniforms.c3.value.y = (Math.tan(this.t/(this.speed * 1000)) + 1)/2;

		this.mesh.material.uniforms.c4.value.x = (Math.sin(this.t/(this.speed * 750) + 3.14/2) + 1)/2;
		this.mesh.material.uniforms.c4.value.y = (Math.sin(this.t/(this.speed * 1000) + 3.14/2) + 1)/2;

		for(let i = 0; i < 5; i++) {
			this.mesh.material.uniforms.cs.value[i].y = (Math.sin(this.t/(this.speed * 900) + 3.14/2) + 1)/2;
		}
		for(let i = 0; i < 15; i++) {
			this.mesh.material.uniforms.crazyC.value[i].x = (Math.sin(this.t/(this.speed * (500 + this.crazyrands[i][0]*500)) + this.crazyrands[i][2]*3.14) + 1)/2;
			this.mesh.material.uniforms.crazyC.value[i].y = (Math.sin(this.t/(this.speed * (500 + this.crazyrands[i][2]*500)) + this.crazyrands[i][3]*3.14) + 1)/2;
		}
		this.mesh.material.uniforms.cs.needsUpdate = true;
		this.mesh.material.uniforms.crazyC.needsUpdate = true;

		this.mesh.material.uniforms.c1.needsUpdate = true;
		this.mesh.material.uniforms.c2.needsUpdate = true;
		this.mesh.material.uniforms.c3.needsUpdate = true;
		this.mesh.material.uniforms.c4.needsUpdate = true;
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
			this.mode_time = Date.now();
		}
		if(e.key == "1") {
			this.mode = 1;
			this.mode_time = Date.now();
		}
		if(e.key == "2") {
			this.mode = 2;
			this.mode_time = Date.now();
		}
		if(e.key == "3") {
			this.mode = 3;
			this.mode_time = Date.now();
		}
		if(e.key == "4") {
			this.mode = 4;
			this.mode_time = Date.now();
		}
		if(e.key == "5") {
			this.mode = 5;
			this.mode_time = Date.now();
		}

		if(e.key == "Enter") {
			this.stop = !this.stop;
		}

		if(e.key == "c") {
			this.chorus = this.chorus > 0.0 ? 0.0 : 1.0;
		}
		if(e.key == "x") {
			this.crazy = this.crazy > 0.0 ? 0.0 : 1.0;
		}
		if(e.key == "v") {
			this.vhsOn = this.vhsOn > 0.0 ? 0.0 : 1.0;
		}

	}

	render() {
			//<video id="test" ref={x => this.video = x} autoPlay controls loop/>
		return <div>
			<div id="container" />
		</div>
			
	}

}