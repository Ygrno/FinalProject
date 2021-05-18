import React, {useEffect} from 'react';
import {useState} from 'react';
import {Form, Modal, Button, ConfigProvider, Space} from 'antd';
import {makeStyles, CircularProgress, Box} from "@material-ui/core";

import {MyApplicationsPreview} from "./MyApplicationsPreview";
import {getAllSoldierEvents} from '../../../services/api-civicrm-service';

const useStyle = makeStyles(theme => ({
        container: {
            display: 'flex',
            flex: 1,
            width: '100%',
            flexDirection: 'column'
        },
        addButton: {
            position: 'fixed',
            bottom: 40,
            left: 40,
            backgroundColor: theme.palette.secondary.main,
            fontSize: 28
        }
    }));

export const MyApplications = ({userSession, endSession}) => {
    const classes = useStyle();
    const [form] = Form.useForm();
    const [myApplications, setApplications] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const loadApplications = async () => {
        setIsLoading(true);
        const res = await getAllSoldierEvents(userSession.Data?.API_KEY, userSession.Data.contact.contact_id);
        setApplications(res.data?.values ?? []);
        console.log("myApplications: ",myApplications);
        console.log(res.data?.values);
        setIsLoading(false);
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
            {
                isLoading && <CircularProgress />
            }
        </Box>
    )

};

