import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './App.css';

class App extends Component {
	render() {
		return (
			<div className="App">
				<Link to="/metaball">Metaball</Link>
				<Link to="/waves">Waves</Link>
				<Link to="/plane">Plane</Link>
				<Link to="/sphere">Sphere</Link>
				<Link to="/material">Material</Link>
				<Link to="/cube">Cube</Link>
			</div>
		);
	}
}

export default App;
