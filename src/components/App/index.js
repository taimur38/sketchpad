import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';

class App extends Component {
	render() {
		return (
			<div className="App">
				<Link to="/material">Material</Link>
				<Link to="/cube">Cube</Link>
				<Link to="/metaball">Metaball</Link>
				<Link to="/waves">Waves</Link>
				<Link to="/plane">Plane</Link>
			</div>
		);
	}
}

export default App;
