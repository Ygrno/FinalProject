import {Form, ConfigProvider, Select, Space, message, Button} from 'antd';
import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
// import "./pending-fom.scss"
// import {uploadImg, logout} from "../services/api-service";
// import {updateContact} from "../services/api_civicrm_service";
import axios from "axios";
import {getContactDetail, logout, uploadImg} from "../../../services/api-service";


const {Option} = Select;

function CreatejsonResponse(is_error, message, json_data,url) {
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

const Handletry = async (props, updateSession, MoveToProfile, urlUpload) => {

    const userDetails = {
        email: props.Data?.contact?.email
    };


    let responsRet = "";
    const updateRes = await getContactDetail(userDetails);
    var Message = ""
    console.log("the new update res is:", updateRes)
    var contact_data_json = ""
    var contact_data = ""
    // if (updateRes.data['values']) {
    //     if (updateRes.data.values[0]) {
    //         contact_data = updateRes.data.values[0]
    //     }
    // }

    const userurlDetails = {
        email: props.Data?.contact?.email,
        image_URL: urlUpload
    };
    const uploadResult = await uploadImg(userurlDetails);
    console.log("uploadResult is:",uploadResult)
    if (updateRes.data.is_error === 1) {
        Message = "unable to update Contact"
    } else {
        Message = "Successfully updated contact"
        // const uploadResult = await uploadImg(userurlDetails);
        updateRes.data.Data.contact.image_URL = userurlDetails.image_URL;
        contact_data = updateRes.data.Data.contact

    }

    console.log(Message);
    // console.log("the email is: ", props.Data?.contact?.email)
    contact_data_json = {
        "API_KEY": props.Data?.API_KEY,
        "contact": contact_data
    }
    // console.log("before return:", CreatejsonResponse(response.data.is_error,Message,contact_data_json))
    responsRet = CreatejsonResponse(updateRes.data.is_error, Message, contact_data_json,userurlDetails.image_URL)
    // console.log("responsRet: ",responsRet)
    updateSession(responsRet)
    // MoveToProfile(props)

};
const logout_handler = async (session, endSession, onLogoutfinish) => {
    const userDetails = {
        email: session.Data?.contact?.email
    };
    const logoutResult = await logout(userDetails);
    // console.log("logout details: ", userDetails);
    if (logoutResult.data["is_error"]) {
        message.error(logoutResult.data["is_error"]);
    } else {
        endSession();
        onLogoutfinish();

    }
}
const PendingForm = (props) => {
    const [imageSelected, setimageSelect] = useState(" ");
    const fileSelectHendler = () => {

        const formDate = new FormData()
        formDate.append("file", imageSelected)
        axios.post("http://52.90.78.193/modules/contrib/civicrm/packages/kcfinder/upload.php?cms=civicrm&format=json&type=files", formDate).then((Response) => {
            // console.log("the Response is: ", Response.data.url)
            if (Response.status === 200) {
                Handletry(props.userSession, props.startSession, ToProfile, Response.data.url)
                // return Response;
            } else
                message.error("הבקשה לא עלתה. אנא בדוק שהקובץ שוקל עד 4mb");
        });
    }

    let flag = false;
    let flagSoldier = false;
    if (props.userSession.Data?.contact?.contact_sub_type.indexOf("Pending") > -1) {
        flag = true;
    } else {
        flag = false;
    }

    if (props.userSession.Data?.contact?.contact_sub_type.indexOf("Soldier") > -1) {
        flagSoldier = true;
    } else {
        flagSoldier = false;
    }

    let history = useHistory();
    // useEffect(()=>{
    //     props.startSession(props.userSession)
    //     // window.localStorage.setItem('Hakuna-matata',JSON.stringify(props.userSession))
    // },[props.userSession])
    // console.log("props:  ",props.userSession);
    const onLogoutFinish = () => {
        history.push("/login");
    }
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
                <button type="" shape="round" className="logout-btn"
                        onClick={() => logout_handler(props.userSession, props.endSession, onLogoutFinish)}> יציאה
                </button>

                <h2 className={"hellouser"}
                    style={{color: "black"}}> שלום {props.userSession ? props.userSession.Data?.contact?.display_name : "אורח"}</h2>
                {flag ?
                    <h2 style={{color: "black"}}> {props.userSession.Data?.contact?.display_name}
                        , הנך בתהליך אישור הרשמה. בימים הקורבים ישלח אליך הודעת מייל
                        ולאחר מכן ינתן אישור כניסה לאתר. תודה רבה.</h2> :
                    <h1 style={{color: "black"}}> {props.userSession.Data?.contact?.display_name} חשבונך אושר, אפשר
                        לעבור לעמוד הפרופיל</h1>
                }
                {flagSoldier ?
                    <Form.Item><h2 style={{color: "black"}}>חייל/ת יקר/ה, על מת שנאשר את בקשתך אנא צריף/י את המסמכים
                        הרלוונטים אליך. </h2>
                        <input className={"upload-input"} type="file" title={"העלה קובצים מתאים"}
                               onChange={(values) => setimageSelect(values.target.files[0])}/>
                        <button className={"upload-button"} onClick={fileSelectHendler}> העלה קובץ</button>
                    </Form.Item> : null}
                {flag ?
                    <Form.Item>
                        {/*<Button type="primary" shape="round" htmlType="submit"*/}
                        {/*        onClick={() => Handletry(props.userSession, props.startSession, ToProfile)}>*/}
                        {/*    לבדיקת אישור לחץ כאן*/}
                        {/*</Button>*/}
                    </Form.Item> :
                    <Form.Item>
                        <button shape="round" className="prof-btn"
                                style={{color: "black", background: "lime", border: "lime"}} size={"large"}
                                onClick={() => movetoprof(props.userSession, ToProfile)}>
                            לעמוד פרופיל
                        </button>
                    </Form.Item>}


            </Form>
        </ConfigProvider>
    );
};
export default PendingForm;