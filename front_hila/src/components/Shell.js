import React from 'react';
import {Switch, Route} from "react-router-dom";

import {Nav} from './Nav';
import {getAllowedRoutes} from '../routes';
import Box from "@material-ui/core/Box/Box";
import makeStyles from "@material-ui/core/styles/makeStyles";
import background from '../images/soldiers2.jpg';

const useStyle = makeStyles(theme => ({
    pageContainer: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        overflow: 'auto',
        padding: theme.spacing(2),
        zIndex: 100,
        '&::before': {
            content: '""',
            backgroundImage: `url(${background})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100%',
            width: '100%',
            position: 'absolute',
            top: 0,
            right: 0,
            opacity: 0.4,
            zIndex: -1
        }
    }
}));

export const Shell = (props) => {
    const classes = useStyle();
    const routes = getAllowedRoutes(props.userSession);
    console.log(routes);
    console.log(props.userSession.Data?.contact);

    return (
        <Box display='flex' flexDirection='column' height='100%'>
            <Nav routes={routes} userSession={props.userSession} endSession={props.endSession}/>
            <Switch>
                {
                    routes.map(({path, component, exact = false}) => {
                        const Component = component;
                        return (<Route key={path} path={path} exact={exact}>
                                <Box className={classes.pageContainer}>
                                    <Component userSession={props.userSession} startSession={props.startSession}
                                               endSession={props.endSession}/>
                                </Box>
                            </Route>
                        )
                    })
                }
            </Switch>
        </Box>
    )
};