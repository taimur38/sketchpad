import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './App.css';

class App extends Component {
	render() {
		return (
			<div className="App">
				<Link to="/metaball">Metaball</Link>
				<Link to="/waves">Waves</Link>
<<<<<<< HEAD
				<Link to="/plane">Plane</Link>
=======
				<Link to="/sphere">Sphere</Link>
				<Link to="/material">Material</Link>
				<Link to="/cube">Cube</Link>
>>>>>>> 370c0413ff0ff99d2bfbb73b144d553cb4351acb
			</div>
		);
	}
}

export default App;
