import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";

import { Nav } from './Nav';
import { getAllowedRoutes } from '../routes';
import user from '../user.mock';
import Box from "@material-ui/core/Box/Box";

export const Shell = (props) => {
    const routes = getAllowedRoutes(props.userSession);
    console.log(routes);
    console.log(props.userSession.Data?.contact);

    return (
        <Box display='flex' flexDirection='column' height='100%'>
            <Nav routes={routes} userSession={props.userSession} endSession={props.endSession} />
            <Switch>
                {
                    routes.map(({ path, component, exact = false }) => {
                        const Component = component;
                        return (<Route key={path} path={path} exact={exact} >
                            <Component userSession={props.userSession} endSession={props.endSession} />
                        </Route>
                        )
                    })
                }
            </Switch>
        </Box>
    )
};