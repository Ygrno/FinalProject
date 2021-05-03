import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Box, Typography } from "@material-ui/core";
import { Theme } from "./theme/Theme";
import { Exterior } from "./components/Exterior";
import { Shell } from "./components/Shell";
import user from './user.mock';
import { useState, useEffect } from "react";
import Pending from "./routes/exterior/pending/Pending";

function App() {

  const [userSession, setUserSession] = useState(null);
  const startSession = (newSession) => {
    setUserSession(newSession);
  };
  const endSession = () => {
    setUserSession(null);
  };

  useEffect(() => {
    const formData = window.localStorage.getItem('Hakuna-matata');
    setUserSession(JSON.parse(formData));
  }, []);
  useEffect(() => {
    window.localStorage.setItem('Hakuna-matata', JSON.stringify(userSession));
    if (userSession)
      console.log(userSession.Data?.contact?.contact_sub_type);
  });



  return (
    <Theme>
      <Typography>
        <Box height="100%" display="flex" flexDirection="column" >
          <Router >
            {(!userSession || userSession.Data?.contact?.contact_sub_type.includes("Pending")) ?
              <Exterior userSession={userSession} startSession={startSession} endSession={endSession} /> :
              <Shell userSession={userSession} endSession={endSession} />}
          </Router>
        </Box>
      </Typography>
    </Theme>
  );
}
export default App;

//


//{(!!userSession && (userSession.Data?.contact?.contact_sub_type.indexOf("Pending") < -1)) ? <Shell userSession={userSession} endSession={endSession} /> : <Exterior userSession={userSession} startSession={startSession} endSession={endSession} />}

//Shell startSession={startSession} userSession={userSession} endSession={endSession}

/*import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Box, Typography } from "@material-ui/core";
import { Theme } from "./theme/Theme";
import { Exterior } from "./components/Exterior";
import { Shell } from "./components/Shell";
import user from './user.mock';
import { useState } from "react";
import Login from "./routes/exterior/login/Login";
import { Applications } from "./routes/shell/applications/Applications";
import { Home } from "./routes/exterior/home/Home";

function App() {
  const [userSession, setUserSession] = useState({});

  const startSession = (newSession) => {
    setUserSession(newSession);
  };
  const endSession = () => {
    setUserSession({});
  };

  return (
    <Theme>
      <Typography>
        <Box height="100%" display="flex" flexDirection="column">
          <Router>
            <Route path="/" exact={true} component={() => < Home startSession={startSession} />} />
            <Route path="/login" component={() => <Login startSession={startSession} />} />
            <Route path="/application" component={() => <Applications userSession={userSession} endSession={endSession} />} />
          </Router>
        </Box>
      </Typography>
    </Theme>
  );
}
export default App;
*/



/*
import './App.css';
import RegisterPage from './pages/register/register-page.component';
import LoginPage from './pages/login/login-page.component';
import ApplicationPage from './pages/application/application-page.component';
import {BrowserRouter as Router, Route} from "react-router-dom";
import React, {useState} from "react";

function App() {
    const [userSession, setUserSession] = useState({});

    const startSession = (newSession) => {
        setUserSession(newSession);
    };
    const endSession = () => {
        setUserSession({});
    };
    return (
        <div className={"App"}>
            <Router>
                <Route path="/" exact={true} component={() => < LoginPage startSession={startSession}/>}/>
                <Route path="/login" component={() => <LoginPage startSession={startSession}/>}/>
                <Route path="/register" component={() => <RegisterPage startSession={startSession}/>}/>
                <Route path="/application" component={() => <ApplicationPage userSession={userSession} endSession={endSession}/>}/>
            </Router>
        </div>
    );
}
export default App;

*/






/*
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Box, Typography } from "@material-ui/core";
import { Theme } from "./theme/Theme";
import { Exterior } from "./components/Exterior";
import { Shell } from "./components/Shell";
import user from './user.mock';
import { useState } from "react";

function App() {
  const [userSession, setUserSession] = useState({});

  const startSession = (newSession) => {
    setUserSession(newSession);
  };
  const endSession = () => {
    setUserSession({});
  };

  return (
    <Theme>
      <Typography>
        <Box height="100%" display="flex" flexDirection="column">
          <Router>
            <Exterior startSession={startSession} />
            {user ? < Shell startSession={startSession} userSession={userSession} endSession={endSession} /> : Exterior}
          </Router>
        </Box>
      </Typography>
    </Theme>
  );
}
export default App;
*/