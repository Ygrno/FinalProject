import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {Nav} from './Nav';
import {getAllowedRoutes} from '../routes';
import user from '../user.mock';
import {useState} from "react";
import Login from '../routes/exterior/login';
import Box from "@material-ui/core/Box/Box";
import {formSytles} from "./form.stylex"

export const Exterior = (props) => {

    const routes = getAllowedRoutes(props.userSession);
    console.log(typeof (props.startSession));

    return (
        <formSytles>
            <Box display='flex' flexDirection='column' height='100%'>
                <Nav routes={routes} userSession={props.userSession} startSession={props.startSession}
                     endSession={props.endSession}/>
                <Switch>
                    {
                        routes.map(({path, component, exact = false}) => {
                            const Component = component;
                            return (<Route key={path} path={path} exact={exact}>
                                    <Component userSession={props.userSession} startSession={props.startSession}
                                               endSession={props.endSession}/>
                                </Route>
                            )
                        })
                    }
                </Switch>
            </Box>
        </formSytles>
    )
};