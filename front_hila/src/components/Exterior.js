import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Nav } from './Nav';
import { getAllowedRoutes } from '../routes';
import user from '../user.mock';
import { useState } from "react";
import Login from '../routes/exterior/login';

export const Exterior = (props) => {

    const routes = getAllowedRoutes(props.userSession);
    console.log(typeof (props.startSession));

    return (
        <div>
            <Nav routes={routes} userSession={props.userSession} startSession={props.startSession} endSession={props.endSession} />
            <Switch>
                {
                    routes.map(({ path, component, exact = false }) => {
                        const Component = component;
                        return (<Route key={path} path={path} exact={exact} >
                            <Component userSession={props.userSession} startSession={props.startSession} endSession={props.endSession} />
                        </Route>
                        )
                    })
                }
            </Switch>
        </div>
    )
};