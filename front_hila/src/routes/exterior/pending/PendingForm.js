import { Form, ConfigProvider, Select, Space, message, Button } from 'antd';
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
//import "./pending-fom.scss"
import { login, logout } from "../../../services/api-service";
import { updateContact } from "../../../services/api-civicrm-service";
import { withRouter } from "react-router";

const { Option } = Select;

function CreatejsonResponse(is_error, message, json_data) {
    return ({
        "is_error": is_error,
        "Message": message,
        "Data": json_data
    });
}

const Handletry = async (props, updateSession, MoveToProfile) => {
    var responsRet = "";
    const updateRes = await updateContact(props.Data?.contact?.email, props.Data?.API_KEY);
    var Message = ""
    var contact_data_json = ""
    var contact_data = ""
    // console.log("response: ",response.data.values[0])
    if (updateRes.data['values']) {
        if (updateRes.data.values[0]) {
            if (updateRes.data.values[0]) {
                contact_data = updateRes.data.values[0]
            }
        }
    }
    if (updateRes.data.is_error === 1) {
        Message = "unable to update Contact"
    } else {
        Message = "Successfully updated contact"
    }
    contact_data_json = {
        "API_KEY": props.Data?.API_KEY,
        "contact": contact_data
    }
    // console.log("before return:", CreatejsonResponse(response.data.is_error,Message,contact_data_json))
    responsRet = CreatejsonResponse(updateRes.data.is_error, Message, contact_data_json)
    // console.log("before return:", responsRet);
    console.log("updateRes: ", responsRet);
    updateSession(responsRet)
    MoveToProfile(props)

};
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
const PendingForm = (props) => {
    <h1>שלום</h1>
    let history = useHistory();
    // useEffect(()=>{
    //     props.startSession(props.userSession)
    //     // window.localStorage.setItem('Hakuna-matata',JSON.stringify(props.userSession))
    // },[props.userSession])
    // console.log("props:  ",props.userSession);
    const onLogoutFinish = () => {
        history.push("/login");
    }
    const ToProfile = (props) => {
        if (props.userSession.Data?.contact?.contact_sub_type.indexOf("Pending") > -1) {
            history.push("/pending");
        } else {
            history.push("/profile");
        }
    }
    const [form] = Form.useForm();

    return (
        <ConfigProvider direction="rtl">
            {/* eslint-disable-next-line no-undef */}
            <Form>

                <div>
                    <h1 className={"1h"} style={{ color: "balck" }}>אודות העמותה</h1>
                    <h5 className={"2h"} style={{ color: "balck" }}> תוכנית מִשֶׁלִי הוקמה בשנת 2018 מתוך מטרה להעניק סיוע
                    בפתרון בעיות ומענה לצרכים היומיומיים לחיילים הבודדים המשוחררים, כדי שיוכלו להשתלב בצורה טובה
                        במציאות החדשה ולהצליח בבניית העתיד המקצועי, התעסוקתי והמשפחתי </h5>
                </div>
                <h1 className={"hellouser"}
                    style={{ color: "balck" }}> שלום {props.userSession ? props.userSession.Data?.contact?.display_name : "אורח"}</h1>
                <h1 style={{ color: "balck" }}> משתמש יקר, אתה בתהליך אישור הרשמה. בימים הקורבים ישלח אליך הודעת מייל
                    ולאחר מכן תוכל להיכנס לאתר. תודה רבה</h1>
                <Form.Item>
                    <Button type="primary" shape="round" htmlType="submit"
                        onClick={() => Handletry(props.userSession, props.startSession, ToProfile)}>
                        רענן
                    </Button>
                </Form.Item>

            </Form>
        </ConfigProvider>
    );
};
export default withRouter(PendingForm);