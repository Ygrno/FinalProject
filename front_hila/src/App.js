import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Box, Typography } from "@material-ui/core";
import { Theme } from "./theme/Theme";
import { Exterior } from "./components/Exterior";
import { Shell } from "./components/Shell";
import user from './user.mock';

const App = () =>
  <Theme>
    <Typography>
      <Box height="100%" display="flex" flexDirection="column">
        <Router>
          {!!user ? <Shell /> : <Exterior />}
        </Router>
      </Box>
    </Typography>
  </Theme>;

export default App;