import React, {useEffect} from 'react';
import {useState} from 'react';
import {Form, Modal, ConfigProvider, Space} from 'antd';
import {makeStyles, Box, CircularProgress, Fab, Tooltip} from "@material-ui/core";

import ApplicationForm from './ApplicationForm';
import FormItem from 'antd/lib/form/FormItem';
import {getAllEvents} from '../../../services/api-civicrm-service';
import {ApplicationPreview} from "./ApplicationPreview";
import {getUserTypes} from "../../../utils/user.util";
import {UserType} from "../../../constants";


const useStyle = makeStyles(theme => ({
        container: {
            display: 'flex',
            flex: 1,
            width: '100%',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
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
    const [isLoading, setIsLoading] = useState(false);

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
        try {
            setIsLoading(true);
            const res = await getAllEvents(userSession.Data?.API_KEY);
            setApplications(res.data?.values ?? []);
            console.log("applications: ", applications);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(loadApplications, [isModalVisible]);

    const shouldShowHandleButton = () => getUserTypes(userSession)?.includes(UserType.Soldier);


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
                           onCancel={handleCancel} cancelText="חזרה" okButtonProps={{style: {display: 'none'}}}
                           cancelButtonProps={{style: {display: 'none'}}}>
                        <ApplicationForm userSession={userSession} endSession={endSession} onSubmit={handleCancel}/>
                    </Modal>
                    <Box>
                        {applications?.map(x => <ApplicationPreview application={x} userSession={userSession}/>)}
                    </Box>
                </Form>
            </ConfigProvider>
            {
                isLoading && <CircularProgress/>
            }
        </Box>
    )

};