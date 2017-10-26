
uniform sampler2D tex;
uniform float time;
uniform float mode;
uniform vec2 c1;
uniform vec2 c2;
uniform vec2 c3;
uniform vec2 c4;
uniform vec2 cs[ 5 ];
uniform vec2 crazyC[ 15 ];

uniform float R1;
uniform float mode_time;
uniform float chorus;
uniform float crazy;
uniform float vhsOn;
uniform float show_bg;
uniform float show_bg_time;

varying vec2 _position;

highp float rand(vec2 co)
{
    highp float a = 12.9898;
    highp float b = 78.233;
    highp float c = 43758.5453;
    highp float dt= dot(co.xy ,vec2(a,b));
    highp float sn= mod(dt,3.14);
    return fract(sin(sn) * c);
}

vec4 vhs(vec2 p, float lod) {
	if(vhsOn > 0.0) {
		highp float magnitude = 0.000002;
		
		
		// Set up offset
		vec2 offsetRedUV = p;
		offsetRedUV.x = p.x + rand(vec2(time*0.03,p.y*0.42)) * 0.002;
		offsetRedUV.x += sin(rand(vec2(time*0.2, p.y)))*magnitude;
		
		vec2 offsetGreenUV = p;
		offsetGreenUV.x = p.x + rand(vec2(time*0.004,p.y*0.002)) * 0.007;
		offsetGreenUV.x += sin(time*9.0)*magnitude;
		
		vec2 offsetBlueUV = p;
		offsetBlueUV.x = p.y;
		offsetBlueUV.x += rand(vec2(cos(time*0.01),sin(p.y)));
		
		// Load Texture
		float r = texture2D(tex, offsetRedUV, lod).r;
		float g = texture2D(tex, offsetGreenUV, lod).g;
		float b = texture2D(tex, p, lod).b;
		
		return vec4(r,g,b,0);
	}
	else {
		return texture2D(tex, p, lod);
	}
}

void main() {
	vec4 color;

	vec3 bg = vec3(36.0/255.0, 42.0/255.0, 74.0/255.0);

	float d1 = distance(c1, _position);
	float d2 = distance(c2, _position);
	float d3 = distance(c3, _position);
	float d4 = distance(c4, _position);

	float top = (R1/d1 + R1/d2 + R1/d3 + R1/d4);
	float bottom = 4.0;

	if(chorus > 0.0) {
		float total = 0.0;
		for(int i = 0; i < 5; i++) {
			total += R1 / distance(cs[i], _position);
		}
		top += total;
		bottom += 5.0;
	}

	if(crazy > 0.0) {
		float total = 0.0;
		for(int i = 0; i < 15; i++) {
			total += R1 / distance(crazyC[i], _position);
		}
		top += total;
		bottom += 15.0;
	}

	float meta_score = top / bottom;

	float transition_total = 1000.0;
	float tt = clamp(mode_time/transition_total, 0.0, 1.0);

	if(meta_score > 0.5 && meta_score < 0.5) {
		color = vec4(0.0, 0.0, 0.0, 1.0);
	}
	else if(meta_score < 0.5) {
		
		float opacity = abs(show_bg - clamp(show_bg_time/1000.0, 0.0, 1.0));
		color = vec4(bg, opacity);
		color = opacity * vhs(_position,0.0 );
	}
	else {
		vec4 current = vhs(_position, 0.0);
		color = current;

		float _d = min(min(d1, d2), min(d3, d4));

		float h = (sin(time/200.0 + _d + (0.5 - _position.x) * (0.5 - _position.y) * 60.0) + 1.0)/2.0;
		vec4 col = vhs(_position, 0.0);

		if(h > 0.0) {
			if(mode == 0.0) {
				color = (1.0 - tt) * color;
			}
			if(mode == 4.0) {
				color = tt * color;
			}
			if(mode == 1.0) {
				color = vec4(bg, 1.0);
			}
			if(mode == 2.0) {
				if(meta_score > 0.5 && meta_score < 0.51) {
					color = 0.5 * vhs(_position, 0.0);
				}
				else {
					vec2 p;
					float max_m = 1000.0;
					float m = clamp(mode_time/5000.0, 0.0, 1.0) * meta_score * 30.0;
					p.x = float(int(_position.x * m))/m;
					p.y = float(int(_position.y * m))/m;
					color = vhs(p, 0.0);
				}
			}
			if(mode == 3.0) {
				if(meta_score > 0.5 && meta_score < 0.51) {
					color = 0.5 * vhs(_position, 0.0);
				}
				else {
					float m = clamp(mode_time/1000.0, 0.0, 1.0) * meta_score;
					vec4 temp = vhs(_position, clamp(m * 8.0, 0.0, 6.0));

					color = mix(temp, temp * 0.6, h);
				}
			}
		}
		else {
			color = col;
		}

		//gl_FragColor = mix(col, vec4(0.0, 0.0, 0.0, 1.0), h);

		vec2 newPos;
		newPos.x = _position.x + sin(R1 * _d * time/500.0);
		newPos.y = _position.y + -cos(R1 * _d * _d);

		//gl_FragColor = texture2D(tex, newPos);
	}

	if(mode == 6.0) {
		float m = (sin(mode_time/500.0) + 1.0)/2.0;
		if(meta_score < 0.5) {
			color = m * color;
		}
		else {
			color = (1.0 - m) * color;
		}
	}

	gl_FragColor = color;


}