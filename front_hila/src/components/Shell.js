import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";

import { Nav } from './Nav';
import { getAllowedRoutes } from '../routes';
import user from '../user.mock';

export const Shell = (props) => {
    const routes = getAllowedRoutes(props.userSession);
    // console.log(typeof (props.startSession));
    // console.log(typeof (props.endSession));
    console.log(props.userSession.Data?.contact);

    return (
        <div>
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
        </div>
    )
};