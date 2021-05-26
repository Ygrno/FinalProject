import {Form, Input, Upload, message, InputNumber, Button, ConfigProvider, Select, Space} from 'antd';
import React, {useEffect, Component, useState} from 'react';
import {sendApplication, addParticipantToEvent} from "../../../services/api-civicrm-service";
import applicationTypes from '../../../utils/application-type-translator';
import "./Application-form.scss"

const {Option} = Select;

const handleApplication = async ({title, summary, description}, userSession) => {
    let current_time = new Date().toISOString()
    let _date = current_time.slice(0, 10)
    let _hour = current_time.slice(11, 19)
    console.log(`THE DATE IS: ${new Date().toISOString()}`)
    debugger;
    const details = {
        api_key: userSession.Data?.API_KEY,
        event_title: title,
        summary,
        event_description: description,
        event_type: title
    };

    const sendRes = await sendApplication(details.api_key, details.event_title, details.event_type, details.event_description, summary, _date + " " + _hour);
    let keys = Object.keys(sendRes.data.values)

    const addParRes = await addParticipantToEvent(userSession.Data?.API_KEY, keys[0], userSession.Data.contact.contact_id)
    console.log("addParRes: ", addParRes)
}

const ApplicationForm = props => {
    const onFinish = async values => {
        await handleApplication(values, props.userSession);
        props.onSubmit();
    };

    return (
        <ConfigProvider direction="rtl">
            <Form onFinish={onFinish}>
                <h3>נושא הפנייה:</h3>
                <Form.Item
                    name="title" className="login-from input" rules={[{required: false, message: 'יש לבחור סוג פניה'}]}>
                    <select class = "selector" id = "app_subject" placeholder="נושא" allowClear>
                        {
                            Object.keys(applicationTypes).map(key =>
                                <option key={key} value={key}>{applicationTypes[key]}</option>)
                        }
                    </select>
                </Form.Item>

                <h3>תקציר: </h3>
                <Form.Item name="summary" className="login-from input">
                    <Input/>
                </Form.Item>

                <h3>פירוט: </h3>
                <Form.Item name="description">
                    <Input.TextArea placeholder=" פרט את בקשתך כאן (ישאר חסוי)" size={"flex"}
                                    className={"descriptionn"}/>
                </Form.Item>

                <Form.Item>
                    <Button id = "send_app" type="primary" shape="round" htmlType="submit" className={"ant-btn-app"}>
                        שלח
                    </Button>
                </Form.Item>
            </Form>

        </ConfigProvider>

    );

};

export default ApplicationForm;