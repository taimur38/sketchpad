import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';

class App extends Component {
	render() {
		return (
			<div className="App">
				<div><Link to="/material">Material</Link></div>
				<div><Link to="/cube">Cube</Link></div>
				<div><Link to="/metaball">Metaball</Link></div>
				<div><Link to="/waves">Waves</Link></div>
			</div>
		);
	}
}

export default App;
