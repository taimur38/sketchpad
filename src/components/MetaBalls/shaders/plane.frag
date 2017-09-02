
/* these are already supplied ...
uniform mat4 viewMatrix;
uniform vec3 cameraPosition;
*/

uniform float ticks;
uniform vec2 mouse;

varying vec2 _position;

void main () { 

	vec2 center_1 = vec2((sin(ticks/50.0) + 1.0)/2.0, 0.25);

	//vec2 center_2 = vec2(0.25, (sin(ticks/25.0) + 1.0)/2.0);
	vec2 center_2 = mouse;

	float d1 = distance(_position, center_1);
	float d2 = distance(_position, center_2);


	float R = 0.2;

	float meta_score = (R / d1 + R / d2) / 2.0;

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
			meta_score =  rounded * rounded * rounded;
		}

		// redistribute meta_score so it's more extreme.

		//meta_score = meta_score * meta_score;

		/*
		if(meta_score > 0.8) {
			meta_score = 1.0;
		}
		else {
			meta_score = 0.5;
		}
		*/
	}

	gl_FragColor = vec4(meta_score, meta_score, meta_score, 1.0); 
}