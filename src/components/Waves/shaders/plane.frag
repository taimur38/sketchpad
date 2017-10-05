
uniform float time;
varying vec3 _position;
varying vec3 _normal;

void main () { 

	/*float height = sin((gl_FragCoord.x + gl_FragCoord.y + time)/ 600.0);
	float col = (height + 1.0) / 2.0;

	gl_FragColor = vec4(col, col, col, 1.0);
	*/

	float m_pert = 50.0;
	float col = (_position.z + m_pert) / (2.0 * m_pert);
	gl_FragColor = vec4(col, col, col, 1.0);

	gl_FragColor = vec4(normalize(_normal), 1.0);
}