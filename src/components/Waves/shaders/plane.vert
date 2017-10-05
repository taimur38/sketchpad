/* these are already supplied ...
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

void main() {

	float height = sin((position.x * position.x + position.y + (time / 10.0))/ 100.0) * 50.0;

	float future_height = sin((position.x * position.x + position.y + ((time + 1.0) / 10.0))/ 100.0) * 50.0;

	_position = vec3(position.xy, height);

	if(future_height > 0.0) {
		_normal = vec3(1.0, 0.0, 0.0);
	}
	else {
		_normal = vec3(0.0, 0.0, 1.0);
	}
	
	gl_Position = projectionMatrix * modelViewMatrix * vec4(_position, 1.0);

}