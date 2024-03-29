import React from "react";
import LoginForm from './LoginForm';
import {Box, Card, makeStyles} from "@material-ui/core";

const useStyle = makeStyles(theme => ({
    container: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
    },
    card: {
        padding: theme.spacing(2),
        width: '40%',
        minWidth: 500,
        backgroundColor: theme.palette.card,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        borderRadius: 65
    },
    title: {
        fontWeight: 'bold'
    }
}));

const Login = (props) => {
    const classes = useStyle();

    return (
        <Box className={classes.container}>
            <Card className={classes.card}>
                <h1 className={classes.title}>כניסה</h1>
                <LoginForm userSession={props.userSession} startSession={props.startSession}
                           endSession={props.endSession}/>
            </Card>
        </Box>
    );
};

export default Login;