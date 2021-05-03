import React from "react";
import LoginForm from './LoginForm';


const Login = (props) => {
    return (
        <div>
            <LoginForm userSession={props.userSession} startSession={props.startSession} endSession={props.endSession} />
        </div>
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