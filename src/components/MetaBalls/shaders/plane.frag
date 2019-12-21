
/* these are already supplied ...
uniform mat4 viewMatrix;
uniform vec3 cameraPosition;

uniform mat4 modelMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat3 normalMatrix;
uniform vec3 cameraPosition;	
*/

uniform float ticks;
uniform vec2 mouse;
uniform vec2 left_hand;
uniform vec2 head;
uniform float kinect;

varying vec2 _position;

float compute_meta_score(vec3 pos) {
	vec3 center_1 = vec3((sin(ticks/75.0) + 1.0)/2.0, 0.25, 0.0);

	vec3 center_2 = vec3(mouse, 0.0);

	vec3 center_3 = vec3(0.25, (sin(ticks/50.0) + 1.0)/2.0, 0.0);
	vec3 center_4 = vec3((cos(ticks/75.0) + 1.0)/2.0, (sin(ticks/40.0) + 1.0)/2.0, 0.0);
	if(kinect == 1.0) {
		center_3 = vec3(left_hand, 0.0);
		center_4 = vec3(head, 0.0);
	}

	float d1 = distance(pos, center_1);
	float d2 = distance(pos, center_2);
	float d3 = distance(pos, center_3);
	float d4 = distance(pos, center_4);

	float R1 = 0.2;
	float R2 = 0.1;

	float meta_score = (R1 / d1 + R2 / d2 + R2 / d3 + R2 / d4) / 3.0;

	return meta_score;

}

void main () { 


	// assume camera is at 0,0,-100.
	// pixel position is _position from 0, 1 on x,y and z = 0.
	// we want to move along the line from the camera through the pixel

	vec3 cam = vec3(0.0, 0.0, -100.0);


	// make chunk-size 0.001
	// max z value is 100
	//const float step_size = 0.001;
	/*
	nothere
	const float step_size = 1.0;
	for(float i = -100.0; i < 100.0; i += step_size) {
		// check strength at coord (_position.x, _position.y, i)
		// then move along line... 

		vec3 p = (i + 100.0) * vec3(_position, 0.0) + i * cam; 

		float ms = compute_meta_score(p);

		if(ms > 0.1) {
			gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
			break;
		}
	}
	*/

	float meta_score = compute_meta_score(vec3(_position, 0.0));


	if(meta_score < 0.5){
		meta_score = 0.0;
	}
	else {

		float rounded = float(int(meta_score * 10.0)) / 10.0;
		//if(rounded == meta_score) {
		if( meta_score < 0.95 && abs(meta_score - rounded) < 0.001 ) {
			meta_score = 0.0;
		}
		else {
			meta_score =  rounded;
		}

		// redistribute meta_score so it's more extreme.

		//meta_score = meta_score * meta_score;

	}

	float r = 0.99;
	float g = 0.80;
	float b = 0.2055;

	gl_FragColor = vec4(meta_score * r, meta_score * g, meta_score * b, 1.0); 
}