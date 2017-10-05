
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

	float m_pert = 50.0;
	float col = (_position.z + m_pert) / (2.0 * m_pert);

	vec3 interpolated = col * color1 + (1.0-col) * color2;
	gl_FragColor = vec4(interpolated, 1.0);
	//gl_FragColor = vec4(col, .7 * col, .2 * col, 1.0);

	//gl_FragColor = vec4(normalize(_normal), 1.0);
}