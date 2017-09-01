
/* these are already supplied ...
uniform mat4 viewMatrix;
uniform vec3 cameraPosition;
*/

uniform float ticks;
varying vec2 _position;

void main () { 

	vec2 center_1 = vec2(0.5, 0.5);

	vec2 center_2 = vec2(0.25, (sin(ticks/10.0) + 1.0)/2.0);

	float d1 = distance(_position, center_1);
	float d2 = distance(_position, center_2);


	float R = 0.2;

	float meta_score = (R / d1 + R / d2) / 2.0;

	if(meta_score < 0.5){
		meta_score = 0.0;
	}

	gl_FragColor = vec4(meta_score, meta_score, meta_score, 1.0); 
}