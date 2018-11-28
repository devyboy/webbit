import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "./App";
import Login from "./Login";
import Settings from "./Settings";
import Thread from "./Thread";
import FourOhFour from "./FourOhFour";

const AppRouter = () => (
    <Router>
        <Switch>
                <Route exact path="/" component={App} />
                <Route exact path="/home" component={App} />
                <Route exact path="/home/:tid" component={Thread} />
                <Route path="/login" component={Login} />
                <Route path="/settings/" component={Settings} />
                <Route component={FourOhFour} />
        </Switch>
    </Router>
);

export default AppRouter;