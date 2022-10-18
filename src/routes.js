import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import App from "./components/App";
import Cube from "./components/Cube";
import MaterialTest from "./components/MaterialTest";
import MetaBalls from "./components/MetaBalls";
import Waves from "./components/Waves";
import Plane from "./components/Plane2";
import Sphere from "./components/Sphere";
import Main from "./components/Main";
import Next from "./components/Next";

const Routes = (props) => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Main} />
      <Route path="/cube" component={Cube} />
      <Route path="/material" component={MaterialTest} />
      <Route path="/metaball" component={MetaBalls} />
      <Route path="/waves" component={Waves} />
      <Route path="/plane" component={Plane} />
      <Route path="/sphere" component={Sphere} />
      <Route path="/list" component={App} />
      <Route path="/next" component={Next} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
