import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <Link to="/metaball">Metaball</Link>
      <Link to="/waves">Waves</Link>
      <Link to="/sphere">Sphere</Link>
      <Link to="/material">Material</Link>
      <Link to="/cube">Cube</Link>
    </div>
  );
}
