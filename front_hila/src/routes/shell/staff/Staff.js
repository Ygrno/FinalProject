import React from 'react';
import { useState } from 'react';
import { Form, Modal, Button, ConfigProvider, Space, Popconfirm, Card } from 'antd';
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
import { Box, colors, makeStyles } from "@material-ui/core";

const VOLUNTEER_TEMPLATE_ID = 70;
const SOLDIER_TEMPLATE_ID = 71;
const CONFIRMATION_TAMPLATE_ID = 72;
const CANCLE_TAMPLATE_ID = 73;

const useStyle = makeStyles(theme => ({
    container: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
    },
    card: {
        padding: theme.spacing(2),
        width: '40%',
        minWidth: 500,
        backgroundColor: theme.palette.card,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.8), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        borderRadius: 45,
        justifyContent: 'center'
    },
    title: {
        position: 'relative',
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'center'
    }
}));
const deleteFromPending = async (id, api, url, subtype, removePendingsFunc, cancelFunc, props) => {
    const res = await getProfile(api, id);
    let profileDetails = res.data?.values[0]
    console.log("profileDetails", profileDetails)
    Modal.confirm({
        title: "פרטי המשתמש",
        content:
            <div>
                <p><strong>שם: </strong>{profileDetails.display_name}</p>
                <p><strong>אימייל: </strong>{profileDetails.email}</p>
                <p><strong>עיר: </strong> {profileDetails.city}</p>
                <p><strong>טלפון: </strong> {profileDetails.phone}</p>
                {!props.subtype.includes("StaffMember") ? <p><strong>סוג
                    משתמש: </strong>{profileDetails.contact_sub_type.includes("Soldier") ? "חייל" : "מתנדב"}</p> : null}
                {props.subtype.includes("Soldier") ?
                    <a href={url} target="_blank" rel="noreferrer">פתח מסמכים </a> : null}
            </div>,


        onOk() {
            removePendingsFunc(id, api, subtype)
        },
        onCancel() {
            cancelFunc(id, api)
        },
        okText: 'אשר בקשה',
        cancelText: "סרב בקשה"
    })


};
const PendingRow = (props) => {
    console.log("props.subtype[0] in pendingRow:", props.subtype);
    const removePendingsFunc = async (id, api, subtype) => {
        console.log("in remove pending", id);
        await removePending(api, id, subtype);
        await sendMail(api, id, CONFIRMATION_TAMPLATE_ID)
        window.location.reload();
    };
    const cancleSoldierRequest = async (id, api) => {
        await sendMail(api, id, CANCLE_TAMPLATE_ID)
        // window.location.reload();

    };
    return (
        <Popconfirm title={"פרטי המתמש"}
            onConfirm={() => (deleteFromPending(props.contactId, props.api_key, props.imageURL, props.subtype[1], removePendingsFunc, cancleSoldierRequest, props))}
            okText={"פתח"} cancelText={"בטל"}>
            {!props.subtype.includes("StaffMember") ?
                <div style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                    border: "1px solid rgb(0, 0, 0.3)",
                    borderRadius: "3px",
                    padding: "5px",
                    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                    alignItems: 'center',
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

                </div> : null}
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
                api_key={props.Data.API_KEY} />)
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
        console.log("SodiersDetails is", SodiersDetails)
        setIsModalVisible(true);
    };

    const getNotConfirmEvent = async (props) => {
        var Message = ""
        const updateRes = await getAllUnconfirmEvents(props.Data?.API_KEY, props.Data.contact.contact_id);
        // console.log("get all unconfirmed events:", updateRes.data.values);//getAllSoldiers(qtjrB1QzwvBIhMVcPcT3Nw)
        setEventConfirmed(Object.values(updateRes.data?.values) ?? []);
        setIsModalVisible2(true);
    };

    function getContactByType(data, type) {
        console.log(data)
        return data.find(x => x.contact_sub_type.includes(type));
    }

    const viewevent = async (userSession, application, confirmEvent) => {
        const partisipents = await getEventParticipantsContact(userSession.Data?.API_KEY, application.id)
        let soldier_contact = getContactByType(partisipents.data.values, "Soldier")
        let volunteer_contact = getContactByType(partisipents.data.values, "Volunteer")
        try {
            Modal.confirm({
                title: "נתוני הפניה",
                content: (<div>

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
                okText: "אישר פניה",
                cancelText: "סרב פניה"


            })
        } catch (e) {
            alert(`Unable to show application info. Error is: ${e}`)
        }
    }

    function createVolunteermailString(application, soldier, soldierAddres) {
        // eslint-disable-next-line no-template-curly-in-string
        return `<p><span dir=\\"rtl\\">תודה,%26nbsp; {contact.display_name}<br /> אתה רשאי כעת לטפל בפניה אליה נרשמת בבקשה לטיפול</span></p>  <p>%26nbsp;</p>  <h3><span dir=\\"rtl\\">פרטי הפניה:</span></h3>  <p>%26nbsp;</p>  <p><span dir=\\"rtl\\"><i>כותרת:</i><br /> ${application.event_title}<br /> <br /> <i>תיאור:</i><br /> ${application.event_description}<br /> <br /> <i>תאריך היצירה:</i><br /> ${application.start_date}</span><br /> <br /> %26nbsp;</p>  <h3><span dir=\\"rtl\\">פרטי החייל:</span></h3>  <p><span dir=\\"rtl\\"><i>שם:</i><br /> ${soldier.display_name}<br /> <br /> <i>מייל:</i><br /> ${soldier.email}<br /> <br /> <i>מספר טלפון:</i><br /> ${soldier.phone}<br /> <br /> <i>עיר:</i><br /> ${soldierAddres.city}<br /> <br /> <i>שם הרחוב:</i><br /> ${soldierAddres.street_name}<br /> <br /> <i>מספר:</i><br /> ${soldierAddres.street_number}%26nbsp;</span></p>`
    }

    const confirmEvent = async (userSession, application) => {
        try {
            const updateRes = await setConfirmEvent(userSession.Data?.API_KEY, application.id);
            const eventPartisipentRes = await getEventParticipantsContact(userSession.Data?.API_KEY, application.id)

            let volunteerParticipantContact = getContactByType(eventPartisipentRes.data.values, "Volunteer")
            let soldierParticipantContact = getContactByType(eventPartisipentRes.data.values, "Soldier")

            const soldierContact = await getProfile(userSession.Data?.API_KEY, soldierParticipantContact.contact_id)
            const soldierAddressRes = await getContactAddress(userSession.Data?.API_KEY, soldierParticipantContact.contact_id)

            let msgCreate = createVolunteermailString(application, soldierContact.data.values[0], soldierAddressRes.data.values[0])


            if (updateRes.status === 200) {
                const sendmailresTosoldier = await sendMail(userSession.Data?.API_KEY, soldierParticipantContact.contact_id, SOLDIER_TEMPLATE_ID);
                const templateRes = await CreateTemplate(userSession.Data?.API_KEY, msgCreate, msgCreate)
                const sendmailresToVolunteer = await sendMail(userSession.Data?.API_KEY, volunteerParticipantContact.contact_id, templateRes.data.id);
                const deleteRes = await DeleteTemplate(userSession.Data?.API_KEY, templateRes.data.id)

            }
            setEventConfirmed(Object.values(updateRes.data?.values) ?? []);
            setIsModalVisible2(true);
        } catch (e) {
            alert(`Unable to confirm application. Error: ${e}`)
        }
    };

    const classes = useStyle();
    return (
        <ConfigProvider direction="rtl">
            <Box className={classes.container}>
                <Card className={classes.card}>
                    <h1 className={classes.title}>אנשי צוות</h1>
                    <Form form={form}>
                        <div>
                            <Space>
                                <FormItem>
                                    <Button id="existing_soldiers"
                                        onClick={() => Handletry(props.userSession, props.startSession)} type="primary"
                                        shape="round" color="Black" variant="contained" size="large">
                                        רשימת החיילים הקיימים
                            </Button>
                                </FormItem>
                            </Space>

                            <Space>
                                <FormItem>
                                    <Button id="applications_list"
                                        onClick={() => getNotConfirmEvent(props.userSession, props.startSession)}
                                        type="primary"
                                        shape="round" color="Black" variant="contained" size="large">
                                        רשימת פניות לאישור
                            </Button>
                                </FormItem>
                            </Space>

                            <Space>
                                <FormItem>

                                    <Button id="pending_users" className={"list-btn"}
                                        onClick={() => viewPendings(props.userSession)}
                                        type="primary" shape="round" color="Black" style={{ backroundColor: "#1980ff" }}
                                        variant="contained" size="large">
                                        רשימת משתמשים בהמתנה
                            </Button>
                                </FormItem>
                            </Space>
                        </div>
                        <Modal title="רשימת החיילים הבודדים" visible={isModalVisible}
                            footer={[
                                <Button className={"close-soldier-list-btn"} key="back" onClick={handleCancel} style={{ backgroundColor: "#1980ff", borderRadius: "45px", fontWeight: "bold", color: "white" }} >
                                    סגור
                           </Button>]} onCancel={handleCancel}
                        >
                            <div> {
                                SodiersDetails.map(
                                    (soldier) => {
                                        return (
                                            <Card>
                                                <div style={{
                                                    width: "100%",
                                                    display: "flex",
                                                    marginBottom: "2px",
                                                    borderRadius: "12px",
                                                    padding: "2px",
                                                    boxShadow: "rgba(0, 0, 0, 0.45) 0px 2px 15px",
                                                    alignItems: 'center',
                                                }}>
                                                    שם החייל:
                                            {' '}
                                                    {soldier.display_name}
                                                    <br />
                                            אמייל:
                                            {' '}
                                                    {soldier.email}
                                                    <br />
                                            עיר:
                                            {' '}
                                                    {soldier.city}
                                                    <span style={{
                                                        width: "150px",
                                                        height: "10px",
                                                        textOverflow: "ellipsis",
                                                    }}>
                                                    </span>
                                                </div>
                                            </Card>
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
                                        return (<div id='app_approve'><h4>
                                            {`מספר פנייה: ${x.id} `}
                                        </h4>
                                            <FormItem>
                                                <Button id="open_app"
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
                </Card>

            </Box>
        </ConfigProvider>
    )
};
