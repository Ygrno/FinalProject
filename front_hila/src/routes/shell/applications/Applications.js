import React, {useEffect} from 'react';
import {useState} from 'react';
import {Form, Modal, Button, ConfigProvider, Space} from 'antd';

import ApplicationForm from './ApplicationForm';
import FormItem from 'antd/lib/form/FormItem';
import {getAllEvents} from '../../../services/api-civicrm-service';
import {ApplicationPreview} from "./ApplicationPreview";
import Box from "@material-ui/core/Box/Box";
import {makeStyles} from "@material-ui/core";
import Fab from "@material-ui/core/Fab/Fab";
import Tooltip from '@material-ui/core/Tooltip';
import {getUserTypes} from "../../../utils/user.util";
import {UserType} from "../../../constants";


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

export const Applications = ({userSession, endSession}) => {
    const classes = useStyle();
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [applications, setApplications] = useState([]);

    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleOk = () => {
        setIsModalVisible(false);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const loadApplications = async () => {
        const res = await getAllEvents(userSession.Data?.API_KEY);
        setApplications(res.data?.values ?? []);
        console.log("applications: ",applications);
    };

    useEffect(loadApplications, []);

    const shouldShowHandleButton = ()=> getUserTypes(userSession)?.includes(UserType.Soldier);


    return (
        <Box className={classes.container}>
            <ConfigProvider direction="rtl">
                <Form form={form}>
                    {shouldShowHandleButton() &&
                        <FormItem>
                            <Tooltip title="הוסף פנייה חדשה">
                            <Fab onClick={showModal} className={classes.addButton}>
                                +
                            </Fab>
                                </Tooltip>
                        </FormItem>
                    }
                    <Modal title="פנייה חדשה" color="secondary" visible={isModalVisible} onOk={handleOk} okText="אישור"
                           onCancel={handleCancel} cancelText="חזרה">
                        <ApplicationForm userSession={userSession} endSession={endSession}/>
                    </Modal>
                    <Box>
                        {applications?.map(x => <ApplicationPreview application={x} userSession={userSession}/>)}
                    </Box>

                </Form>
            </ConfigProvider>
        </Box>
    )

};

//Box overflow={'auto'}