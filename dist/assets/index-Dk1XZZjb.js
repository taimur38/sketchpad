import{r as l,j as h}from"./index-4-V2hwTY.js";import{P as d,S as u,W as v,g,f as w,C as m,a as x}from"./three.module-ICs-E19M.js";const _=`/* these are already supplied ...
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

	//float height = sin(x/1000.0) / (position.x * position.y + 0.1);
	float mx = position.x;
	float my = position.y - 0.5;
	float height = 100.0 * sin(x/1000.0 - (mx*mx + my*my)/10000.0);
	//float height = sin((position.x * position.x + position.y + (x/ 10.0))/ 100.0) * 50.0;
	return height;

}

float simple(float x) {
	float height = sin((position.x + position.y + (x/ 10.0))/ 100.0) * 100.0;
	return height;
}

void main() {

	float height = toy(time);
	float future_height = toy(time + 1000.0/60.0);
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
}`;function S(){const e=l.useRef(null);return l.useEffect(()=>{const c=Date.now(),t=new d(70,window.innerWidth/window.innerHeight,1,1e3);t.position.z=800;const o=new u,n=new v;n.setPixelRatio(window.devicePixelRatio),n.setSize(window.innerWidth,window.innerHeight);const f=new g(700,100,100),i=new w({vertexShader:_,wireframe:!0,fragmentShader:y,uniforms:{time:{value:0},color1:{value:new m("#6E2264")},color2:{value:new m("#CC4D33")}}}),p=new x(f,i);o.add(p);const r=()=>{n.setSize(window.innerWidth,window.innerHeight),t.aspect=window.innerWidth/window.innerHeight,t.updateProjectionMatrix()};window.addEventListener("resize",r),e.current.appendChild(n.domElement);let a;const s=()=>{a=requestAnimationFrame(s),i.uniforms.time.value=Date.now()-c,n.render(o,t)};return s(),()=>{cancelAnimationFrame(a),window.removeEventListener("resize",r),n.dispose()}},[]),h.jsx("div",{ref:e})}export{S as default};
