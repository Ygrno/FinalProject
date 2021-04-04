import React from "react";
import RegisterForm from "../../components/register-form.component.jsx"
import {RegisterPageContainer,Button} from "./register.styles";
import "./register-page.css"

 const RegisterPage = () => {
    return <RegisterPageContainer> 

    <RegisterForm />

    </RegisterPageContainer>
 
};

export default RegisterPage;
