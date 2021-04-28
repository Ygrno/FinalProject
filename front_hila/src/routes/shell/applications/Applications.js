import React from 'react';
import { useHistory } from "react-router-dom";
import { useState } from 'react';
import { Card, Fab } from '@material-ui/core';
import { StaticDialog, useDialog } from 'react-st-modal';
import { Button, Dialog, DialogContent } from '@material-ui/core';
import ApplicationForm from './ApplicationForm';
import { logout } from "../../../services/api-service";
import { Form, Input, Upload, message, InputNumber, Menu, ConfigProvider, Select, Space, Avatar } from 'antd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { AppBar, IconButton, makeStyles, Toolbar, Box } from "@material-ui/core";

const logout_handler = async (session, endSession, onLogoutfinish) => {
    const userDetails = {
        email: session.Data?.contact?.email
    };
    const logoutResult = await logout(userDetails);
    console.log("logout details: ", userDetails);
    if (logoutResult.data["is_error"]) {
        message.error(logoutResult.data["is_error"]);
    } else {
        endSession();
        onLogoutfinish();

    }
};


export const Applications = (props) => {
    let history = useHistory();
    const onLogoutFinish = () => {
        history.push("/login");
    }

    return (
        <div>
            <h1>פניות חיילים </h1>
            <Box>
                <Button type="" shape="round" color="secondary" variant="contained" size="medium" onClick={() => logout_handler(props.userSession, props.endSession, onLogoutFinish)}> יציאה</Button>
            </Box>
        </div>)

};


/*<Button color="secondary" variant="contained" size="medium" onClick={getAllEvents}>
לחץ כאן לרשימת כל הפניות הקיימות
</Button>
*/

//<Button type="" shape="round" color="secondary" variant="contained" size="medium" onClick={() => logout_handler(props.userSession, props.endSession, onLogoutFinish)}> יציאה</Button>








//getAllEvents()

/*
export const Applications = () => {

    const [open, setOpen] = useState(false);

    const onOpen = () => { setOpen(true); }
    const handleClose = () => { setOpen(false); }


    return (
        <div>
            <h1>פניות החיילים</h1>
            <h4>  פניות.....</h4>
            <Button variant="outlined" color="primary" onClick={onOpen}> + </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <ApplicationForm />
            </Dialog>
        </div>)
};
*/

