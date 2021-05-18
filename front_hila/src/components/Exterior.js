import React from 'react';
import {Switch, Route} from "react-router-dom";
import {Nav} from './Nav';
import {getAllowedRoutes} from '../routes';
import Box from "@material-ui/core/Box/Box";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyle = makeStyles(theme => ({
    pageContainer: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        overflow: 'auto',
        padding: theme.spacing(2)
    }
}));

export const Exterior = (props) => {
    const classes = useStyle();
    const routes = getAllowedRoutes(props.userSession);
    console.log(typeof (props.startSession));

    return (
        <Box display='flex' flexDirection='column' height='100%'>
            <Nav routes={routes} userSession={props.userSession} startSession={props.startSession}
                 endSession={props.endSession}/>
            <Switch>
                {
                    routes.map(({path, component: Component, exact = false}) => (
                        <Route key={path} path={path} exact={exact}>
                            <Box className={classes.pageContainer}>

                                <Component userSession={props.userSession} startSession={props.startSession}
                                           endSession={props.endSession}/>

                            </Box>
                        </Route>
                    ))
                }
            </Switch>
        </Box>
    )
};