import React from 'react';
import { useState } from 'react';
import { Card, Fab } from '@material-ui/core';
import { StaticDialog, useDialog } from 'react-st-modal';
import { Button, Dialog, DialogContent } from '@material-ui/core'
import ApplicationForm from './ApplicationForm';


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



