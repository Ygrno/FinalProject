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
        backgroundColor: theme.palette.card
    }
}));

const Login = (props) => {
    const classes = useStyle();

    return (
        <Box className={classes.container}>
            <h1>כניסה</h1>
            <Card className={classes.card}>
                <LoginForm userSession={props.userSession} startSession={props.startSession}
                           endSession={props.endSession}/>
            </Card>
        </Box>
    );
};

export default Login;


/*
import LoginForm from './LoginForm';

export const Login = () => (
    <div>
        <h1>כניסה </h1>
        <LoginForm />
    </div>);
*/