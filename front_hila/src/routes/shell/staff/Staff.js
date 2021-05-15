import React from 'react';
import {useHistory} from "react-router-dom";
import {useState} from 'react';
import {Form, Input, Select, Modal, Button, ConfigProvider, message, Space, Popconfirm, Tooltip} from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import {Card, Box} from '@material-ui/core';
import {
    getAllSoldiers,
    getAllPendingSoldiers,
    setConfirmEvent,
    getAllUnconfirmEvents, removePending, getAllPendings, sendMail, getEventParticipantsContact
} from "../../../services/api-civicrm-service";

const VOLUNTEER_TEMPLATE_ID = 70;
const SOLDIER_TEMPLATE_ID = 71;


const deleteFromPending = async (id, api, url) => {
    // console.log("we deleted him you MotherFUcker and your id is: ",api)
    Modal.info({
        title: "פרטי החייל",
        content:
            <a href={url} target="_blank"> מסמכים </a>
    })
    const removeRes = await removePending(api, id)
    console.log("removeRes is  :", removeRes)

}
const PendingRow = (props) => {
    return (
        <Popconfirm title={"האם אתה בטוח?"}
                    onConfirm={() => deleteFromPending(props.contactId, props.api_key, props.imageURL)}
                    okText={"פתח קובץ"} cancelText={"בטל"}>
            <div style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
                border: "1px solid rgb(0, 0, 0.3)",
                borderRadius: "3px",
                padding: "5px",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"
            }}>
                {props.displayName}
                <Tooltip title={props.imageURL}>
            <span style={{
                width: "150px",
                height: "30px",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden"
            }}>
                {<a href={props.imageURL}> קובץ החייל </a>}
            </span>
                </Tooltip>
            </div>
        </Popconfirm>
    );
}


const viewPendings = async (props) => {
    const pendingRes = await getAllPendings(props.Data.API_KEY)
    console.log("pendingRes is:", pendingRes)
    console.log("pendingRes:", props.Data.API_KEY)
    Modal.info({
            title: "לחץ על משתמש על מנת להוריד אותו מרשימת ההמתנה",
            content:
                pendingRes.data.values.map(pendingUser => <PendingRow displayName={pendingUser.display_name}
                                                                      imageURL={pendingUser.image_URL}
                                                                      contactId={pendingUser.contact_id}
                                                                      api_key={props.Data.API_KEY}/>)
        }
    )
}


export const Staff = (props) => {
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisible2, setIsModalVisible2] = useState(false);
    const [SodiersDetails, setSodiersDetails] = useState([]);
    const [EventConfirmed, setEventConfirmed] = useState([]);
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
    const handleOk2 = () => {
        setIsModalVisible2(false);
        setIsChecked(true);
    };
    const handleCancel2 = () => {
        setIsModalVisible2(false);
        setIsChecked(false);
    };

    const Handletry = async (props) => {
        var Message = ""
        const viewSoldiers = await getAllSoldiers(props.Data?.API_KEY);
        console.log(" view all soldiers:", viewSoldiers);//getAllSoldiers(qtjrB1QzwvBIhMVcPcT3Nw)

        if (viewSoldiers.data.is_error === 1) {
            Message = "unable to update Contact"
        } else {
            Message = "Successfully updated contact"
        }
        console.log(viewSoldiers.data.values);
        setSodiersDetails(viewSoldiers.data.values);
        setIsModalVisible(true);
    };

    const getNotConfirmEvent = async (props) => {
        var Message = ""
        const updateRes = await getAllUnconfirmEvents(props.Data?.API_KEY, props.Data.contact.contact_id);
        console.log("get all unconfirmed events:", updateRes.data.values);//getAllSoldiers(qtjrB1QzwvBIhMVcPcT3Nw)
        setEventConfirmed(Object.values(updateRes.data?.values) ?? []);
        setIsModalVisible2(true);
    };

    const viewevent = async (userSession, application,confirmEvent,handleCancel2) => {
        const partisipents = await getEventParticipantsContact(userSession.Data?.API_KEY, application.id)
        console.log("partisipents in viewevent:", partisipents)
        console.log("the application is:",application)
        let soldier_contact = partisipents.data.values[1]
        let volunteer_contact = partisipents.data.values[0]
        Modal.info({
            title: "נתוני הפניה",
            content: (<div>

                    <p ><strong>שם המתנדב:</strong>  {volunteer_contact.display_name} </p>
                    <p><strong> שם החייל:</strong>  {soldier_contact.display_name} </p>
                    <p> </p>
                    <p><strong>כותרת הפניה: </strong>  {application.title}</p>
                    <p><strong>תיאור: </strong> {application.description}</p>
                    <p> <strong>נוצרה בתאריך: </strong>{application.created_date}</p>
                </div>
            ),
            onOk(){confirmEvent(userSession, application)}


        })
    }

    const confirmEvent = async (userSession, application) => {
        var Message = ""
        const updateRes = await setConfirmEvent(userSession.Data?.API_KEY, application.id);
        const eventPartisipentRes = await getEventParticipantsContact(userSession.Data?.API_KEY, application.id)
        let soldier_id = eventPartisipentRes.data.values[1].contact_id
        let volnteer_id = eventPartisipentRes.data.values[0].contact_id
        console.log("eventPartisipentRes confirm event is:", eventPartisipentRes)
        if (updateRes.status === 200) {
            const sendmailresTosoldier = await sendMail(userSession.Data?.API_KEY, soldier_id, SOLDIER_TEMPLATE_ID);
            const sendmailresToVolunteer = await sendMail(userSession.Data?.API_KEY, volnteer_id, VOLUNTEER_TEMPLATE_ID);

            console.log("sendmailRes is", sendmailresTosoldier)
            // const newpnia2 = await setpnia2();
        }
        setEventConfirmed(Object.values(updateRes.data?.values) ?? []);
        setIsModalVisible2(true);
    };


    return (
        <ConfigProvider direction="rtl">
            <Form form={form}>
                <Space>
                    <FormItem>
                        <Button onClick={() => Handletry(props.userSession, props.startSession)} type="primary"
                                shape="round" color="Black" variant="contained" size="medium">
                            רשימת החיילים הקיימים
                        </Button>
                    </FormItem>
                </Space>
                <Space>
                    <FormItem>
                        <Button onClick={() => getNotConfirmEvent(props.userSession, props.startSession)} type="primary"
                                shape="round" color="Black" variant="contained" size="medium">
                            רשימת פניות לאישור
                        </Button>
                    </FormItem>
                </Space>
                <Space>
                    <FormItem>
                        <Button onClick={() => viewPendings(props.userSession)} shape="round" color="Black"
                                variant="contained" size="medium">
                            רשימת משתמשים בהמתנה
                        </Button>
                    </FormItem>
                </Space>
                <Modal title="רשימת החיילים הבודדים" visible={isModalVisible}
                       onCancel={handleCancel} cancelText="סגור">
                    <div> {
                        SodiersDetails.map(
                            (soldier) => {
                                return (<div><h4>
                                        {`שם החייל: ${soldier.display_name},  `}
                                        {`אימייל: ${soldier.email},  `}
                                        {`מספר רשומה במערכת: ${soldier.contact_id} `}</h4></div>
                                );
                            }
                        )}
                    </div>
                </Modal>
                <Modal title="רשימת פניות לאישור" visible={isModalVisible2} onOk={handleOk2} okText="אישור"
                       onCancel={handleCancel2} cancelText="סגור">
                    <div> {
                        EventConfirmed.map(
                            (x) => {
                                return (<div><h4>
                                        {`מספר פנייה: ${x.id} `}
                                    </h4>
                                        <FormItem>
                                            <Button onClick={() => viewevent(props.userSession, x,confirmEvent,handleCancel2)} type="primary"
                                                    shape="round" color="Black" variant="contained" size="medium">
                                                פתח פנייה
                                            </Button>
                                        </FormItem>
                                    </div>

                                );
                            }
                        )}

                    </div>
                </Modal>
            </Form>
        </ConfigProvider>
    )
};


/*
var ans = null;

    const getMessageByUser = () => {
        var axios = require('axios');

        var config = {
            method: 'get',
            url: 'http://52.90.78.193/modules/contrib/civicrm/extern/rest.php?entity=Contact&action=get&json={"sequential":1,"contact_sub_type":"Student"}&api_key=qtjrB1QzwvBIhMVcPcT3Nw&key=aacce8033f7a9730040b45df047e3191',
            headers: {}
        };

        axios(config)
            .then(function (response) {
                ans = response.data;
                //console.log(JSON.stringify(response.data));
                printUsers(response);
                //return response.data;

            })
            .catch(function (error) {
                console.log(error);
            });
    }


    const printUsers = (response) => {
        if (!response)
            return 'שגיאה בגישה לשרת';
        else {
            return JSON.stringify(response.data);
        }
    }
    */

/*
export const Staff = (props) => {
return (
    <div>

        <h1>אנשי צוות</h1>
        <h4>כאן ניתן יהיה לערוך פרטים, לאשר ציוותים, לאשר מתנדבים/חיילים חדשים</h4>
    </div>)
};
*/