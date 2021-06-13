import { Form, ConfigProvider, Select, Space, message, Button } from 'antd';
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { prepareContactData } from "../../../services/utils"
import axios from "axios";
import { getContactDetail, uploadImg } from "../../../services/api-service";
import "./pending-form.scss"
import { logger } from '../../../Logger'

const { Option } = Select;

function CreatejsonResponseImage(is_error, message, json_data, url) {
    return ({
        "is_error": is_error,
        "Message": message,
        "Data": json_data,
        "image_URL": url
    });
}

const movetoprof = (session, onMovetoprof) => {
    onMovetoprof();
}


const Handletry = async (props, updateSession, MoveToProfile, urlUpload, updateStatus) => {

    try {
        updateStatus(LOADING)
        const userDetails = {
            email: props.Data?.contact?.email
        };


        let responsRet = "";
        const updateRes = await getContactDetail(userDetails);
        var Message = ""
        console.log("the new update res is:", updateRes)
        var contact_data_json = ""
        var contact_data = ""
        const userurlDetails = {
            email: props.Data?.contact?.email,
            image_URL: urlUpload
        };
        const uploadResult = await uploadImg(userurlDetails);
        console.log("uploadResult is:", uploadResult)
        if (updateRes.data.is_error === 1) {
            Message = "unable to update Contact"
        } else {
            Message = "Successfully updated contact"
            updateRes.data.Data.contact.image_URL = userurlDetails.image_URL;
            contact_data = updateRes.data.Data.contact

        }

        // console.log(Message);
        // console.log("the email is: ", props.Data?.contact?.email)
        contact_data_json = prepareContactData(props.Data?.API_KEY, contact_data);
        responsRet = CreatejsonResponseImage(updateRes.data.is_error, Message, contact_data_json, userurlDetails.image_URL)
        updateSession(responsRet)
        message.success(Message, [5]);

    } catch (e) {
        message.error(`Unable to upload file. Reason is: ${e}`)
        logger.error(`upload file failed: ${e}`)

    } finally {
        updateStatus("")
    }

};

const LOADING = "loading";

const PendingForm = (props) => {
    const [imageSelected, setimageSelect] = useState(" ");
    const [loadingStatus, SetLoadingStatus] = useState("");
    const fileSelectHendler = () => {

        const formDate = new FormData()
        formDate.append("file", imageSelected)
        axios.post("https://amuta-login-and-register.herokuapp.com/upload_file", formDate).then((Response) => {
            // console.log("the Response is: ", Response.data.url)
            if (Response.status === 200) {
                Handletry(props.userSession, props.startSession, ToProfile, Response.data.url, SetLoadingStatus)
                // return Response;
            } else
                message.error("הבקשה לא עלתה. אנא בדוק שהקובץ שוקל עד 4mb");
        });
    }

    let flag = false;
    let flagSoldier = false;
    if (props.userSession?.Data?.contact?.contact_sub_type.indexOf("Pending") > -1) {
        console.log("this is a true false question: ", props.userSession?.Data?.contact?.image_URL === "")
        flag = true;
    } else {
        flag = false;
    }

    if (props.userSession?.Data?.contact?.contact_sub_type.indexOf("Soldier") > -1) {
        flagSoldier = true;
    } else {
        flagSoldier = false;
    }

    let history = useHistory();


    const ToProfile = () => {
        console.log("props status: ", props)
        if (props.Data?.contact?.contact_sub_type.indexOf("Pending") > -1) {
            flag = true;
            history.push("/pending");
        } else {
            flag = false;
            history.push("/home");
        }
    }
    const [form] = Form.useForm();

    return (
        <ConfigProvider direction="rtl">
            <Form>
                <h2 className={"hellouser"}
                    style={{ color: "black" }}> שלום {props.userSession ? props.userSession.Data?.contact?.display_name : "אורח"}</h2>
                {flag ?
                    <div style={{ color: "black" }}><h1> שלום {props.userSession?.Data?.contact?.display_name}!</h1>
                        <h2> הנך נמצא בתהליך אישור הרשמה,</h2>
                        <h2> בימים הקורבים תשלח אליך הודעת מייל
                        ולאחר מכן ינתן אישור כניסה לאתר.</h2>
                        <h1> תודה רבה! </h1>
                    </div>
                    :

                    <h1 style={{ color: "black" }}> {props.userSession?.Data?.contact?.display_name} חשבונך אושר, אפשר
                        לעבור לעמוד הפרופיל</h1>
                }
                {flagSoldier ?
                    <Form.Item><h2 style={{ color: "black" }}>חייל/ת יקר/ה, על מת שנאשר את בקשתך אנא צריף/י את המסמכים
                        הרלוונטים אליך. </h2>
                        <input className={"upload-input"} type="file" placeholder={"נא לעלות קבצים מתאימים"} id={"file-input"}
                            onChange={(values) => setimageSelect(values.target.files[0])} />

                        <Button loading={loadingStatus === LOADING} className={"upload-button"} onClick={fileSelectHendler}> העלה קובץ</Button>
                    </Form.Item> : null}
            </Form>
        </ConfigProvider>
    );
};
export default PendingForm;