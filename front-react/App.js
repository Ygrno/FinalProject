import './App.css';
import ReactDOM from "react-dom";
import RegisterPage from './pages/register/register-page.component';
import LoginPage from './pages/login/login-page.component';
import ApplicationPage from './pages/application/application-page.component';
import { BrowserRouter as Router, Route } from "react-router-dom";
import React from  "react";
function App() {
  return (
    <Router>
    <Route path="/login" component={LoginPage}/>
    <Route path="/register" component={RegisterPage}/>
    <Route path="/application" component={ApplicationPage}/>
    </Router>
  );
}

export default App;
