import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Nav } from './Nav';
import { getAllowedRoutes } from '../routes';
import user from '../user.mock';

export const Shell = () => {
    debugger;
    const routes = getAllowedRoutes(user);

    return (<Router>
        <div>
            <Nav routes={routes} />
            <Switch>
                {
                    routes.map(({ path, component, exact = false }) => {

                        return (<Route key={path} path={path} exact={exact}>
                            {component}
                        </Route>
                        )
                    })
                }
            </Switch>
        </div>
    </Router>)
};