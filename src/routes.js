import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

import App from './components/App'
import Cube from './components/Cube'

const Routes = (props) => (
	<BrowserRouter>
		<Switch>
			<Route exact path="/" component={App} />
			<Route path="/cube" component={Cube} />
		</Switch>
	</BrowserRouter>
)

export default Routes;