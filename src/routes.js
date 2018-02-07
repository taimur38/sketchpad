import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

import App from './components/App'
import Cube from './components/Cube'
import MaterialTest from './components/MaterialTest'
import MetaBalls from './components/MetaBalls'
import Waves from './components/Waves'
import VideoGloop from './components/VideoGloop'
import Sphere from './components/Sphere'

const Routes = (props) => (
	<BrowserRouter>
		<Switch>
			<Route exact path="/" component={App} />
			<Route path="/cube" component={Cube} />
			<Route path="/material" component={MaterialTest} />
			<Route path="/metaball" component={MetaBalls} />
			<Route path="/waves" component={Waves} />
			<Route path="/videogloop" component={VideoGloop} />
			<Route path="/sphere" component={Sphere} />
		</Switch>
	</BrowserRouter>
)

export default Routes;