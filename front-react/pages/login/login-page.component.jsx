import React from "react";
import LoginForm from "../../components/login-form.component.jsx"
import {LoginPageContainer} from "./login-page.styles";
import "./login-page.css"
 const LoginPage = () => {
    return <LoginPageContainer>
    <LoginForm/>
    </LoginPageContainer>
};

export default LoginPage;
