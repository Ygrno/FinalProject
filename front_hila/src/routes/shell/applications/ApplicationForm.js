import {Form, Input, Upload, message, InputNumber, Button, ConfigProvider, Select, Space} from 'antd';
import {UploadOutlined} from '@ant-design/icons';
import React, {useEffect, Component, useState} from 'react';
import {useHistory} from "react-router-dom";
//import "./application-form.scss"
import {logout} from "../../../services/api-service";
import axios from "axios";
import {sendApplication, addParticipantToEvent} from "../../../services/api-civicrm-service"

const {Option} = Select;

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
}


const handleApplication  = async(values, props,fileSelectHendler,text) => {
    console.log("title: ", values);
    console.log("props.Data?.API_KEY", props);
    let today = new Date().toISOString().slice(0, 10)
    const details = {
        api_key: props.Data?.API_KEY,
        event_title : values.title,
        event_description: text.target.defaultValue,
        event_type: values.title
    };
    const sendRes = await sendApplication(details.api_key,details.event_title,details.event_type,details.event_description,today);
    console.log("sendRes", sendRes)
    let keys = Object.keys( sendRes.data.values)

    const addParRes = await addParticipantToEvent(props.Data?.API_KEY,keys[0], props.Data.contact.contact_id)
    console.log("addParRes: ", addParRes)


}

const ApplicationForm = (props) => {
    console.log(props);
    const [imageSelected, setimageSelect] = useState(" ");

    const fileSelectHendler = () => {

        const formDate = new FormData()
        formDate.append("file", imageSelected)
        axios.post("http://52.90.78.193/modules/contrib/civicrm/packages/kcfinder/upload.php?cms=civicrm&format=json&type=files", formDate).then((Response) => {
            console.log("the Response is: " ,Response)
            if(Response.status === 200)
                message.success("הבקשה נשלחה. תודה רבה");
            else
                message.error("הבקשה לא עלתה. אנא בדוק שהקובץ שוקל עד 4mb");
        });
    }
    console.log(props.userSession);
   // var type = props.userSession.Data?.contact?.contact_id

    let history = useHistory();
    const [form] = Form.useForm();
    const saveText = (value) => {
        setText(value)
    }
    const onLogoutFinish = () => {
        history.push("/login");
    }
    const onSend = () => {
        history.push("/profile");
    }
    const [text,setText] = useState('');

    return (
        <ConfigProvider direction="rtl">
            <Form onFinish ={(values) => handleApplication(values, props.userSession,fileSelectHendler, text) }>
                <h2 className={"hellouserapp"}
                    style={{color: "white"}}> שלום {props.userSession.Data?.contact?.display_name}</h2>
                <Form.Item
                    name="title" className="login-from input" rules={[{required: false, message: 'יש לבחור סוג פניה'}]}>
                    {/* <Select placeholder="נושא" allowClear>
                        <Option value="Construction">שיפוצים ותיקונים</Option>
                        <Option value="Furniture">ריהוט</Option>
                        <Option value="Education">לימודים</Option>
                        <Option value="Other">אחר</Option>
                    </Select> */}

                    <select className='selector' name="app_subjec" id="app_subject" required='true'>
                    <option disabled selected value> נושא </option>
                    <option value="Construction">שיפוצים ותיקונים</option>
                    <option value="Furniture">ריהוט</option>
                    <option value="Education">לימודים</option>
                    <option value="Other">אחר</option>
                    
                    </select>
                </Form.Item>

                <h3 style={{color: "white"}}>פניה: </h3>
                <Form.Item name="input" className="login-from input">
                    <Input onChange={saveText}   placeholder="פרט את בקשתך כאן" />
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