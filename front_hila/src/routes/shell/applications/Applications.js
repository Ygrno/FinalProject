import React from 'react';
import { useHistory } from "react-router-dom";
import { useState } from 'react';
import { Card, Fab } from '@material-ui/core';
import { StaticDialog, useDialog } from 'react-st-modal';
//import { Button, Dialog, DialogContent } from '@material-ui/core';
import ApplicationForm from './ApplicationForm';
import { logout } from "../../../services/api-service";
import { Form, Input, Select, Modal, Button, ConfigProvider, message, Space } from 'antd';
import FormItem from 'antd/lib/form/FormItem';


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
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        setIsChecked(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setIsChecked(false);
    };


    return (
        <ConfigProvider direction="rtl">
            <Form form={form}>
                <Space>
                    <FormItem>
                        <Button onClick={showModal} type="primary" shape="round" color="secondary" variant="contained" size="medium">
                            טופס פנייה חדשה
                        </Button>
                    </FormItem>
                </Space>
                <Modal title="פנייה חדשה" visible={isModalVisible} onOk={handleOk} okText="אישור" onCancel={handleCancel}
                    cancelText="חזרה">
                    <ApplicationForm />
                </Modal>
            </Form>
        </ConfigProvider>



    )

};
//{!isChecked && <h5 style={{ color: "red" }}></h5>}


//<div><h1>פניות חיילים </h1></div>
//
/*<Button color="secondary" variant="contained" size="medium" onClick={getAllEvents}>
לחץ כאן לרשימת כל הפניות הקיימות
</Button>
*/

//<Button type="" shape="round" color="secondary" variant="contained" size="medium" onClick={() => logout_handler(props.userSession, props.endSession, onLogoutFinish)}> יציאה</Button>


/*
<Box>
                <Button type="" shape="round" color="secondary" variant="contained" size="medium" onClick={() => logout_handler(props.userSession, props.endSession, onLogoutFinish)}> יציאה</Button>
            </Box>
*/



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

