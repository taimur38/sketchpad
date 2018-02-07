import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import Routes from './routes'

ReactDOM.render(<Routes />, document.getElementById('root'));
registerServiceWorker();


const e = document.getElementById("root");
const f = (e.requestFullscreen || e.webkitRequestFullscreen || e.mozRequestFullScreen || e.msRequestFullScreen).bind(e);
e.onclick = () => f();
e.ontouchstart = () => f();