import React from 'react';
import {useState} from 'react';
import {Form, Modal, Button, ConfigProvider, Space, Popconfirm} from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import {
    getAllSoldiers,
    setConfirmEvent,
    getAllUnconfirmEvents,
    removePending,
    getAllPendings,
    sendMail,
    getEventParticipantsContact,
    CreateTemplate,
    getContactAddress, getProfile, DeleteTemplate
} from "../../../services/api-civicrm-service";

const VOLUNTEER_TEMPLATE_ID = 70;
const SOLDIER_TEMPLATE_ID = 71;
const CONFIRMATION_TAMPLATE_ID = 72;
const CANCLE_TAMPLATE_ID = 73;


const deleteFromPending = async (id, api, url, removePendingsFunc, cancelFunc) => {
    Modal.confirm({
        title: "פרטי החייל",
        content:
            <a href={url} target="_blank" rel="noreferrer"> מסמכים </a>,

        onOk() {
            removePendingsFunc(id, api)
        },
        onCancel() {
            cancelFunc(id, api)
        },
        okText: 'אשר חייל',
        cancelText: "סרב בקשה"
    })


};
const PendingRow = (props) => {
    console.log("props.subtype[0] in pendingRow:", props.subtype);
    const removePendingsFunc = async (id, api) => {
        console.log("in remove pending", id);
        await removePending(api, id);
        await sendMail(api, id, CONFIRMATION_TAMPLATE_ID)
    };
    const cancleSoldierRequest = async (id, api) => {
        await sendMail(api, id, CANCLE_TAMPLATE_ID)
    };
    return (
        <Popconfirm title={"מסמכי החייל"}
                    onConfirm={() => deleteFromPending(props.contactId, props.api_key, props.imageURL, removePendingsFunc, cancleSoldierRequest)}
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

                <span style={{
                    width: "150px",
                    height: "30px",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden"
                }}>
                {props.subtype.includes("Soldier") ? <a href={props.imageURL}> קובץ החייל </a> : null}
            </span>

            </div>
        </Popconfirm>
    );
};

const viewPendings = async (props) => {
    const pendingRes = await getAllPendings(props.Data.API_KEY);

    Modal.info({
            title: "לחץ על משתמש על מנת להוריד אותו מרשימת ההמתנה",
            content:
                pendingRes.data.values.map(pendingUser => <PendingRow displayName={pendingUser.display_name}
                                                                      imageURL={pendingUser.image_URL}
                                                                      subtype={pendingUser.contact_sub_type}
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


    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const handleOk2 = () => {
        setIsModalVisible2(false);
    };
    const handleCancel2 = () => {
        setIsModalVisible2(false);
    };

    const Handletry = async (props) => {

        var Message = ""
        const viewSoldiers = await getAllSoldiers(props.Data?.API_KEY);
        // console.log(" view all soldiers:", viewSoldiers);
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
        // console.log("get all unconfirmed events:", updateRes.data.values);//getAllSoldiers(qtjrB1QzwvBIhMVcPcT3Nw)
        setEventConfirmed(Object.values(updateRes.data?.values) ?? []);
        setIsModalVisible2(true);
    };

    const viewevent = async (userSession, application, confirmEvent) => {
        const partisipents = await getEventParticipantsContact(userSession.Data?.API_KEY, application.id)
        let soldier_contact = partisipents.data.values[1]
        let volunteer_contact = partisipents.data.values[0]
        Modal.confirm({
            title: "נתוני הפניה",
            content: (<div id = 'app_approve_details'>

                    <p><strong>שם המתנדב:</strong> {volunteer_contact.display_name} </p>
                    <p><strong> שם החייל:</strong> {soldier_contact.display_name} </p>
                    <p></p>
                    <p><strong>כותרת הפניה: </strong> {application.title}</p>
                    <p><strong>תיאור: </strong> {application.description}</p>
                    <p><strong>נוצרה בתאריך: </strong>{application.created_date}</p>
                </div>
            ),
            onOk() {
                confirmEvent(userSession, application)
            },
            okText: "אשר פניה",
            cancelText: "סרב פניה"


        })
    }
    function createVolunteermailString(application, soldier, soldierAddres) {

       return  `
                Congrats, 
\\r\\n        {contact.display_name} 
\\r\\n        You are now able to help a soldier.
\\r\\n        
\\r\\n        Application details: 
\\r\\n        ${application.event_title}
\\r\\n          
\\r\\n        ${application.event_description}
\r\n        ${application.start_date}
\r\n            
\r\n        Soldier details:
\r\n        name: ${soldier.display_name}       
\r\n        email: ${soldier.email}  
\r\n        City :${soldierAddres.city}
\r\n        Street name: ${soldierAddres.street_name}
\r\n        Building Number  ${soldierAddres.street_number}
       `

    }

    const confirmEvent = async (userSession, application) => {
        const updateRes = await setConfirmEvent(userSession.Data?.API_KEY, application.id);
        // console.log("the application in confirm is :",application)
        const eventPartisipentRes = await getEventParticipantsContact(userSession.Data?.API_KEY, application.id)
        let soldier_id = eventPartisipentRes.data.values[1].contact_id
        const soldierContact = await getProfile(userSession.Data?.API_KEY,soldier_id)
        // console.log(" soldierContact in confirmEvent:",soldierContact)
        let volnteer_id = eventPartisipentRes.data.values[0].contact_id
        const soldierAddressRes = await getContactAddress(userSession.Data?.API_KEY,soldier_id)
        // console.log("soldierAddressRes confirm event is:", soldierAddressRes)
        let msgCreate =  createVolunteermailString(application,soldierContact.data.values[0], soldierAddressRes.data.values[0])
        console.log("the return message is :",msgCreate)
        if (updateRes.status === 200) {
            const sendmailresTosoldier = await sendMail(userSession.Data?.API_KEY, soldier_id, SOLDIER_TEMPLATE_ID);

            const templateRes = await CreateTemplate(userSession.Data?.API_KEY, msgCreate, msgCreate)

            console.log("the template Res is:",templateRes)
            const sendmailresToVolunteer = await sendMail(userSession.Data?.API_KEY, volnteer_id, templateRes.data.id);
            console.log("sendmailresToVolunteer is:",sendmailresToVolunteer)
            const deleteRes = await DeleteTemplate(userSession.Data?.API_KEY,templateRes.data.id)
            console.log("the deleteRes  is:",deleteRes)

        }
        setEventConfirmed(Object.values(updateRes.data?.values) ?? []);
        setIsModalVisible2(true);
    };


    return (
        <ConfigProvider direction="rtl">
            <Form form={form}>
                <Space>
                    <FormItem>
                        <Button id = 'existing_soldiers' onClick={() => Handletry(props.userSession, props.startSession)} type="primary"
                                shape="round" color="Black" variant="contained" size="medium">
                            רשימת החיילים הקיימים
                        </Button>
                    </FormItem>
                </Space>
                <Space>
                    <FormItem>
                        <Button id = 'applications_list' onClick={() => getNotConfirmEvent(props.userSession, props.startSession)} type="primary"
                                shape="round" color="Black" variant="contained" size="medium">
                            רשימת פניות לאישור
                        </Button>
                    </FormItem>
                </Space>
                <Space>
                    <FormItem>
                        <Button id = 'pending_users' onClick={() => viewPendings(props.userSession)} shape="round" color="Black"
                                variant="contained" size="medium">
                            רשימת משתמשים בהמתנה
                        </Button>
                    </FormItem>
                </Space>
                <Modal title = "רשימת החיילים הבודדים" visible={isModalVisible}
                       onCancel={handleCancel} cancelText="סגור">
                    <div> {
                        SodiersDetails.map(
                            (soldier) => {
                                return (<div id = "soldiers_details"><h4>
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
                                return (<div id = 'app_approve'><h4>
                                        {`מספר פנייה: ${x.id} `}
                                    </h4>
                                        <FormItem>
                                            <Button id = 'open_app'
                                                onClick={() => viewevent(props.userSession, x, confirmEvent, handleCancel2)}
                                                type="primary"
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