import React, {useEffect} from 'react';
import {useState} from 'react';
import {Form, Modal, Button, ConfigProvider, Space} from 'antd';

import FormItem from 'antd/lib/form/FormItem';
import {getAllContactsEvent} from '../../../services/api-civicrm-service';
import Box from "@material-ui/core/Box/Box";
import {makeStyles} from "@material-ui/core";
import Fab from "@material-ui/core/Fab/Fab";
import {MyApplicationsPreview} from "./MyApplicationsPreview";
import {ApplicationPreview} from "../applications/ApplicationPreview";


const useStyle = makeStyles(theme => ({
        container: {
            display: 'flex',
            height: '100%',
            width: '100%',
            flexDirection: 'column',
            overflow: 'auto'
        },
        addButton: {
            position: 'fixed',
            bottom: 40,
            left: 40,
            backgroundColor: theme.palette.secondary.main,
            fontSize: 28
        }
    }))
;

export const MyApplications = ({userSession, endSession}) => {
    const classes = useStyle();
    const [form] = Form.useForm();
    const [myApplications, setApplications] = useState([]);

    const loadApplications = async () => {
        const res = await getAllContactsEvent(userSession.Data?.API_KEY, userSession.Data.contact.contact_id);
        setApplications(res.data?.values ?? []);
        console.log("myApplications: ",myApplications);
        console.log(res.data?.values);

    };

    useEffect(loadApplications, []);

    return (
        <Box className={classes.container}>
            <ConfigProvider direction="rtl">
                <Form form={form}>
                    <Box>
                        {myApplications?.map(x => <MyApplicationsPreview application={x} userSession={userSession}/>)}
                    </Box>
                </Form>
            </ConfigProvider>
        </Box>
    )

};

