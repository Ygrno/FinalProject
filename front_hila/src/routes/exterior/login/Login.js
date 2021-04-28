

import React from "react";
import LoginForm from './LoginForm';
//import {LoginPageContainer} from "./login-page.styles";
//import WebsiteLogo from "../../images/Icon.jpg";     //<img src={WebsiteLogo}></img>
// async function transfer() {
//
//     window.location.href = "/login";
// }
const Login = (props) => {
    // console.log(typeof (props.startSession));
    return (
        <div>
            <LoginForm startSession={props.startSession} />
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