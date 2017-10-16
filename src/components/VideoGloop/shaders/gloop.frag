
uniform sampler2D tex;
uniform float time;
uniform float mode;
uniform vec2 c1;
uniform vec2 c2;
uniform vec2 c3;
uniform vec2 c4;

uniform float R1;

varying vec2 _position;

void main() {

	vec3 bg = vec3(195.0/255.0, 164.0/255.0, 125.0/255.0);

	float d1 = distance(c1, _position);
	float d2 = distance(c2, _position);
	float d3 = distance(c3, _position);
	float d4 = distance(c4, _position);

	float meta_score = (R1/d1 + R1/d2 + R1/d3 + R1/d4) /4.0;

	if(meta_score > 0.5 && meta_score < 0.5) {
		gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
	}
	else if(meta_score < 0.5) {
		gl_FragColor = vec4(bg, 1.0);
		gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);

		gl_FragColor = texture2D(tex, _position);
	}
	else {
		gl_FragColor = texture2D(tex, _position);

		float _d = min(min(d1, d2), min(d3, d4));

		float h = (sin(time/700.0 + _d) + 1.0)/2.0;
		vec4 col = texture2D(tex, _position);

		if(h > 0.8) {
			if(mode == 0.0) {
				gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
			}
			else if(mode == 1.0) {
				gl_FragColor = vec4(bg, 1.0);
			}
		}
		else {
			gl_FragColor = col;
		}

		//gl_FragColor = mix(col, vec4(0.0, 0.0, 0.0, 1.0), h);

		vec2 newPos;
		newPos.x = _position.x + sin(R1 * _d * time/500.0);
		newPos.y = _position.y + -cos(R1 * _d * _d);

		//gl_FragColor = texture2D(tex, newPos);
	}


}