import React from 'react';
import { useHistory } from "react-router-dom";
import { useState } from 'react';
import { Card, Fab } from '@material-ui/core';
//import { Button, Dialog, DialogContent } from '@material-ui/core';
import ApplicationForm from './ApplicationForm';
import { logout } from "../../../services/api-service";
import { Form, Input, Select, Modal, Button, ConfigProvider, message, Space } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { getAllEvents } from '../../../services/api-civicrm-service';


export const Applications = (props) => {

    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleOk = () => {
        setIsModalVisible(false);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const [Eventsdetailes, setEventsdetailes] = useState([]);
    const [isModalVisible2, setIsModalVisible2] = useState(false);
    const handleOk2 = () => {
        setIsModalVisible2(false);
    };
    const handleCancel2 = () => {
        setIsModalVisible2(false);
    };

    const Handletry = async (props, updateSession, MoveToProfile) => {
        var Message = ""
        const updateRes = await getAllEvents(props.Data?.API_KEY); //getAllSoldiers(qtjrB1QzwvBIhMVcPcT3Nw)

        if (updateRes.data.is_error === 1) {
            Message = "unable to update Contact"
        } else {
            Message = "Successfully updated contact"
        }
        console.log(Eventsdetailes);
        setEventsdetailes(updateRes.data.values);
        setIsModalVisible2(true);
        console.log(Eventsdetailes);
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
                <Modal title="פנייה חדשה" visible={isModalVisible} onOk={handleOk} okText="אישור" onCancel={handleCancel} cancelText="חזרה">
                    <ApplicationForm />
                </Modal>
                <Space>
                    <FormItem>
                        <Button onClick={() => Handletry(props.userSession, props.startSession)} type="primary" shape="round" color="secondary" variant="contained" size="medium">
                            רשימת הפניות הקיימות
                        </Button>
                    </FormItem>
                </Space>

                <Modal title="רשימת הפניות הקיימות במערכת:" visible={isModalVisible2} onOk={handleOk2} okText="אישור" onCancel={handleCancel2} cancelText="חזרה">
                    <div> {
                        Eventsdetailes?.map(
                            (details) => {
                                return (<div><h4></h4>
                                    {`מספר פנייה: ${details.id} `}<h4></h4>
                                    {`כותרת הפנייה: ${details.title} `}<h4></h4>
                                    {`תקציר : ${details.summary} `}<h4></h4>
                                    {`נוצרה בתאריך: ${details.created_date} `}<h4></h4>

                                </div>
                                )
                            }
                        )}
                    </div>
                </Modal>
            </Form>
        </ConfigProvider>
    )

};


//<div><h1>פניות חיילים </h1></div>
//
/*<Button color="secondary" variant="contained" size="medium" onClick={getAllEvents}>
לחץ כאן לרשימת כל הפניות הקיימות
</Button>
*/

//<Button type="" shape="round" color="secondary" variant="contained" size="medium" onClick={() => logout_handler(props.userSession, props.endSession, onLogoutFinish)}> יציאה</Button>





