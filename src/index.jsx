import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

import Main from './components/Main';

// Lazy load sketch pages — they pull in Three.js which is heavy
const App = lazy(() => import('./components/App'));
const Cube = lazy(() => import('./components/Cube'));
const MaterialTest = lazy(() => import('./components/MaterialTest'));
const MetaBalls = lazy(() => import('./components/MetaBalls'));
const Waves = lazy(() => import('./components/Waves'));
const Sphere = lazy(() => import('./components/Sphere'));

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/cube" element={<Cube />} />
          <Route path="/material" element={<MaterialTest />} />
          <Route path="/metaball" element={<MetaBalls />} />
          <Route path="/waves" element={<Waves />} />
          <Route path="/sphere" element={<Sphere />} />
          <Route path="/list" element={<App />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
);
