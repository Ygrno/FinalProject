import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './create-theme';

export const Theme = ({ children }) =>
    <MuiThemeProvider theme={theme}>
        {children}
    </MuiThemeProvider>;