import{r as s,j as p}from"./index-C2EAHCLX.js";import{P as u,S as v,W as h,e as g,f as w,C as m,a as x}from"./three.module-ICs-E19M.js";const _=`/* these are already supplied ...
uniform mat4 modelMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat3 normalMatrix;
uniform vec3 cameraPosition;	
attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;
attribute vec2 uv2;
*/

uniform float time;
varying vec3 _position;
varying vec3 _normal;

float toy(float x) {

	float height = sin((position.x * position.x + position.y + (x/ 10.0))/ 100.0) * 50.0;
	return height;

}

float simple(float x) {
	float height = sin((position.x + position.y + (x/ 10.0))/ 100.0) * 100.0;
	return height;
}

void main() {

	float height = simple(time);
	float future_height = simple(time + 1000.0/60.0);
	/*
	float height = sin((position.x * position.x + position.y + (time / 10.0))/ 100.0) * 50.0;

	float future_height = sin((position.x * position.x + position.y + ((time + 1.0) / 10.0))/ 100.0) * 50.0;
	*/

	_position = vec3(position.xy, height);

	if(future_height - height > 0.0) {
		_normal = vec3(1.0, 0.0, 0.0);
	}
	else {
		_normal = vec3(0.0, 0.0, 1.0);
	}
	
	gl_Position = projectionMatrix * modelViewMatrix * vec4(_position, 1.0);

}`,y=`
uniform float time;
varying vec3 _position;
varying vec3 _normal;

uniform vec3 color1;
uniform vec3 color2;


void main () { 

	/*float height = sin((gl_FragCoord.x + gl_FragCoord.y + time)/ 600.0);
	float col = (height + 1.0) / 2.0;

	gl_FragColor = vec4(col, col, col, 1.0);
	*/

	float m_pert = 100.0;
	float col = (_position.z + m_pert) / (2.0 * m_pert);

	vec3 interpolated = col * color1 + (1.0-col) * color2;
	gl_FragColor = vec4(interpolated, 1.0);
	//gl_FragColor = vec4(col, .7 * col, .2 * col, 1.0);

	//gl_FragColor = vec4(normalize(_normal), 1.0);
}`;function z(){const e=s.useRef(null);return s.useEffect(()=>{const c=Date.now(),t=new u(70,window.innerWidth/window.innerHeight,1,1e3);t.position.z=400;const i=new v,n=new h;n.setPixelRatio(window.devicePixelRatio),n.setSize(window.innerWidth,window.innerHeight);const d=new g(1400,1200,10,10),o=new w({vertexShader:_,fragmentShader:y,uniforms:{time:{value:0},color1:{value:new m("#6E2264")},color2:{value:new m("#CC4D33")}}}),f=new x(d,o);i.add(f);const r=()=>{n.setSize(window.innerWidth,window.innerHeight),t.aspect=window.innerWidth/window.innerHeight,t.updateProjectionMatrix()};window.addEventListener("resize",r),e.current.appendChild(n.domElement);let a;const l=()=>{a=requestAnimationFrame(l),o.uniforms.time.value=Date.now()-c,n.render(i,t)};return l(),()=>{cancelAnimationFrame(a),window.removeEventListener("resize",r),n.dispose()}},[]),p.jsx("div",{ref:e})}export{z as default};
