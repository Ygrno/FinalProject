import React from 'react';
import { useState } from 'react';
import { Form, Modal, Button, ConfigProvider, Space, Popconfirm, Card } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import {
    getAllSoldiers,
    getAllVolunteers,
    getAllSoldiers_Volunteers,
    deleteSolANDVol,
    setConfirmEvent,
    getAllUnconfirmEvents,
    getAllOpenEvents,
    getAllHandleEvents,
    getAllClosedEvents,
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
        alignItems: 'center',
        justifyContent: 'center'
    },
    card: {
        padding: theme.spacing(2),
        width: '30%',
        //minWidth: 100,
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
    },
    image: {
        height: '100px',
        display: 'block',
        borderColor: 'white',
        borderWidth: 1,
        borderStyle: 'solid',
        opacity: 1,
        alignItems: 'center',
        margin: theme.spacing(2),
        shadows: '10',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        borderRadius: 65

        // marginInlineStart: '40px',
        //marginInlineEnd: '40px'
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
    const [isModalVisibleOpenEvent, setIsModalVisibleOpenEvent] = useState(false);
    const [isModalVisibleUnConfirmedEvent, setIsModalVisibleUnConfirmedEvent] = useState(false);
    const [isModalVisibleHandledEvent, setIsModalVisibleHandledEvent] = useState(false);
    const [isModalVisibleClosedEvent, setIsModalVisibleClosedEvent] = useState(false);
    const [isModalVisibleVolunteers, setIsModalVisibleVolunteers] = useState(false);
    const [isModalVisibleSolANDVols, setIsModalVisibleSolANDVols] = useState(false);
    const [SodiersDetails, setSodiersDetails] = useState([]);
    const [VolunteersDetails, setVolunteersDetails] = useState([]);
    const [SolANDVolsDetails, setSolANDVolsDetails] = useState([]);
    const [EventConfirmed, setEventConfirmed] = useState([]);
    const [OpenEvent, setOpenEvent] = useState([]);
    const [UnConfirmedEvent, setUnConfirmedEvent] = useState([]);
    const [HandledEvent, setHandledEvent] = useState([]);
    const [ClosedEvent, setClosedEvent] = useState([]);



    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const handleOk2 = () => {
        setIsModalVisible2(false);
    };
    const handleCancel2 = () => {
        setIsModalVisible2(false);
    };

    const getSoldiers = async (props) => {

        var Message = ""
        const viewSoldiers = await getAllSoldiers(props.Data?.API_KEY);
        if (viewSoldiers.data.is_error === 1) {
            Message = "unable to update Contact"
        } else {
            Message = "Successfully updated contact"
        }
        setSodiersDetails(viewSoldiers.data.values);
        setIsModalVisible(true);
    };

    const getVolunteers = async (props) => {
        const viewVolunteers = await getAllVolunteers(props.Data?.API_KEY);
        setVolunteersDetails(viewVolunteers.data.values);
        setIsModalVisibleVolunteers(true);
    };

    const getSoldiersAndVolunteers = async (props) => {
        const viewSolANDVol = await getAllSoldiers_Volunteers(props.Data?.API_KEY);
        setSolANDVolsDetails(viewSolANDVol.data.values);
        setIsModalVisibleSolANDVols(true);
    };

    const DeleteSolANDVol = async (props) => {
        var Message = ""
        const viewSolANDSol = await deleteSolANDVol(props.email, props.Data?.API_KEY);
        console.log("after API delete");
        if (viewSolANDSol.data.is_error === 1) {
            Message = "unable to delete Contact"
        } else {
            Message = "Successfully delete contact"
        }
        console.log("after API delete");
        console.log(Message);
        //  getSoldiersAndVolunteers(props.Data?.API_KEY);
    };


    const getNotConfirmEvent = async (props) => {
        const updateRes = await getAllUnconfirmEvents(props.Data?.API_KEY, props.Data.contact.contact_id);
        setEventConfirmed(Object.values(updateRes.data?.values) ?? []);
        setIsModalVisible2(true);
    };

    const getOpenEvent = async (props) => {
        const updateRes = await getAllOpenEvents(props.Data?.API_KEY, props.Data.contact.contact_id);
        setOpenEvent(Object.values(updateRes.data?.values) ?? []);
        setIsModalVisibleOpenEvent(true);
    };

    const getUnConfirmEvent = async (props) => {
        const updateRes = await getAllUnconfirmEvents(props.Data?.API_KEY, props.Data.contact.contact_id);
        setUnConfirmedEvent(Object.values(updateRes.data?.values) ?? []);
        setIsModalVisibleUnConfirmedEvent(true);
    };

    const getHandleEvents = async (props) => {
        const updateRes = await getAllHandleEvents(props.Data?.API_KEY, props.Data.contact.contact_id);
        setHandledEvent(Object.values(updateRes.data?.values) ?? []);
        setIsModalVisibleHandledEvent(true);
    };

    const getClosedEvents = async (props) => {
        const updateRes = await getAllClosedEvents(props.Data?.API_KEY, props.Data.contact.contact_id);
        setClosedEvent(Object.values(updateRes.data?.values) ?? []);
        setIsModalVisibleClosedEvent(true);
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
        <ConfigProvider direction="rtl" flexDirection='column' alignItems='center'>
            <Box flexDirection='row' justifyContent='center'>
                <Box className={classes.container}>
                    <Card className={classes.card}>
                        <h2 className={classes.title}>רשימות חברי העמותה</h2>
                        <Box display='flex' justifyContent='center'>
                            <img className={classes.image} src='/images/people.png' />
                        </Box>
                        <Form form={form}>
                            <div>
                                <FormItem>
                                    <Button id="existing_soldiers"
                                        onClick={() => getSoldiers(props.userSession, props.startSession)} type="secondary"
                                        shape="round" color="Black" variant="contained" size="large">
                                        רשימת החיילים הקיימים
                                    </Button>
                                </FormItem>
                                <FormItem>
                                    <Button id="existing_soldiers"
                                        onClick={() => getVolunteers(props.userSession, props.startSession)} type="secondary"
                                        shape="round" color="Black" variant="contained" size="large">
                                        רשימת המתנדבים הקיימים
                                    </Button>
                                </FormItem>
                                <FormItem>
                                    <Button id="existing_soldiers"
                                        onClick={() => getSoldiersAndVolunteers(props.userSession, props.startSession)} type="secondary"
                                        shape="round" color="Black" variant="contained" size="large">
                                        מחיקת משתמשים
                                    </Button>
                                </FormItem>
                            </div>
                            <Modal title="רשימת החיילים הבודדים" visible={isModalVisible} footer={[
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
                            <Modal title="רשימת מתנדבים קיימים" visible={isModalVisibleVolunteers} onOk={() => setIsModalVisibleVolunteers(false)} okText="אישור"
                                onCancel={() => setIsModalVisibleVolunteers(false)} cancelText="סגור">
                                <div> {
                                    VolunteersDetails.map(
                                        (x) => {
                                            return (
                                                <div id='app_approve'>
                                                    <h4>{`שם המתנדב : ${x.display_name} `}</h4>
                                                    <h4>{`שם המתנדב : ${x.email} `}</h4>
                                                    <h4>{`--------------------------------------------------------------------------------`}</h4>
                                                </div>
                                            );
                                        }
                                    )}
                                </div>
                            </Modal>
                            <Modal title="מחיקת משתמשים" visible={isModalVisibleSolANDVols} onOk={() => setIsModalVisibleSolANDVols(false)} okText="אישור"
                                onCancel={() => setIsModalVisibleSolANDVols(false)} cancelText="סגור">
                                <div> {
                                    SolANDVolsDetails.map(
                                        (x) => {
                                            return (
                                                <div >
                                                    <h4>{`שם המתנדב : ${x.display_name} `}</h4>
                                                    <h4>{`שם המתנדב : ${x.email} `}</h4>
                                                    <Button id='close_app' onClick={() => DeleteSolANDVol(x.email, props.userSession, props.startSession)} type="secondary" shape="round"
                                                        color="secondary"
                                                        variant="contained"
                                                        size="medium">
                                                        מחק
                                                    </Button>
                                                    <h4>{`--------------------------------------------------------------------------------`}</h4>
                                                </div>
                                            );
                                        }
                                    )}
                                </div>
                            </Modal>

                        </Form>
                    </Card>

                </Box>

                <Box className={classes.container}>
                    <Card className={classes.card}>
                        <h2 className={classes.title}>רשימות לאישור</h2>
                        <Box display='flex' justifyContent='center'>
                            <img className={classes.image} src='/images/v.png' />
                        </Box>
                        <Form form={form}>
                            <div>
                                <Space>
                                    <FormItem>
                                        <Button id="applications_list"
                                            onClick={() => getNotConfirmEvent(props.userSession, props.startSession)}
                                            type="secondary"
                                            shape="round" color="Black" variant="contained" size="large">
                                            רשימת פניות לאישור
                            </Button>
                                    </FormItem>
                                </Space>

                                <Space>
                                    <FormItem>
                                        <Button id="pending_users" className={"list-btn"}
                                            onClick={() => viewPendings(props.userSession)}
                                            type="secondary" shape="round" color="Black" style={{ backroundColor: "#1980ff" }}
                                            variant="contained" size="large">
                                            רשימת משתמשים בהמתנה
                            </Button>
                                    </FormItem>
                                </Space>
                            </div>

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
                                                        type="secondary"
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

                <Box className={classes.container}>
                    <Card className={classes.card}>
                        <h2 className={classes.title}>צפייה בפניות לפי סטטוס</h2>
                        <Form form={form}>
                            <Box display='flex' justifyContent='center'>
                                <img className={classes.image} src='/images/application.png' />
                            </Box>
                            <div>
                                <Space>
                                    <FormItem>
                                        <Button id="applications_list"
                                            onClick={() => getOpenEvent(props.userSession, props.startSession)}
                                            type="secondary"
                                            shape="round" color="Black" variant="contained" size="large">
                                            פניות פתוחות
                            </Button>
                                    </FormItem>
                                </Space>

                                <Space>
                                    <FormItem>
                                        <Button id="pending_users" className={"list-btn"}
                                            onClick={() => getUnConfirmEvent(props.userSession)}
                                            type="secondary" shape="round" color="Black" style={{ backroundColor: "#1980ff" }}
                                            variant="contained" size="large">
                                            פניות ממתינות לאישור ציוות
                            </Button>
                                    </FormItem>
                                </Space>
                                <Space>
                                    <FormItem>
                                        <Button id="applications_list" className={"list-btn"}
                                            onClick={() => getHandleEvents(props.userSession)}
                                            type="secondary" shape="round" color="Black" style={{ backroundColor: "#1980ff" }}
                                            variant="contained" size="large">
                                            פניות בטיפול
                            </Button>
                                    </FormItem>
                                </Space>
                                <Space>
                                    <FormItem>
                                        <Button id="applications_list" className={"list-btn"}
                                            onClick={() => getClosedEvents(props.userSession)}
                                            type="secondary" shape="round" color="Black" style={{ backroundColor: "#1980ff" }}
                                            variant="contained" size="large">
                                            פניות סגורות
                            </Button>
                                    </FormItem>
                                </Space>
                            </div>
                            <Modal title="רשימת פניות פתוחות" visible={isModalVisibleOpenEvent} onOk={() => setIsModalVisibleOpenEvent(false)} okText="אישור"
                                onCancel={() => setIsModalVisibleOpenEvent(false)} cancelText="סגור">
                                <div> {
                                    OpenEvent.map(
                                        (x) => {
                                            return (
                                                <div id='app_approve'>
                                                    <h4>{`מספר הפנייה: ${x.id} `}</h4>
                                                    <h4>{`תקציר הפנייה: ${x.summary} `}</h4>
                                                    <h4>{`נוצרה בתאריך: ${x.start_date} `}</h4>
                                                    <h4>{`--------------------------------------------------------------------------------`}</h4>
                                                </div>

                                            );
                                        }
                                    )}

                                </div>
                            </Modal>
                            <Modal title="רשימת פניות לאישור" visible={isModalVisibleUnConfirmedEvent} onOk={() => setIsModalVisibleUnConfirmedEvent(false)} okText="אישור"
                                onCancel={() => setIsModalVisibleUnConfirmedEvent(false)} cancelText="סגור">
                                <div> {
                                    UnConfirmedEvent.map(
                                        (x) => {
                                            return (<div id='app_approve'>
                                                <h4>{`מספר פנייה: ${x.id} `}</h4>
                                                <h4>{`תקציר הפנייה: ${x.summary} `}</h4>
                                                <h4>{`נוצרה בתאריך: ${x.start_date} `}</h4>
                                                <h4>{`--------------------------------------------------------------------------------`}</h4>

                                            </div>

                                            );
                                        }
                                    )}

                                </div>
                            </Modal>
                            <Modal title="רשימת פניות בטיפול" visible={isModalVisibleHandledEvent} onOk={() => setIsModalVisibleHandledEvent(false)} okText="אישור"
                                onCancel={() => setIsModalVisibleHandledEvent(false)} cancelText="סגור">
                                <div> {
                                    HandledEvent.map(
                                        (x) => {
                                            return (<div id='app_approve'>
                                                <h4>{`מספר פנייה: ${x.id} `}</h4>
                                                <h4>{`תקציר הפנייה: ${x.summary} `}</h4>
                                                <h4>{`נוצרה בתאריך: ${x.start_date} `}</h4>
                                                <h4>{`--------------------------------------------------------------------------------`}</h4>
                                            </div>
                                            );
                                        }
                                    )}

                                </div>
                            </Modal>
                            <Modal title="רשימת פניות סגורות" visible={isModalVisibleClosedEvent} onOk={() => setIsModalVisibleClosedEvent(false)} okText="אישור"
                                onCancel={() => setIsModalVisibleClosedEvent(false)} cancelText="סגור">
                                <div> {
                                    ClosedEvent.map(
                                        (x) => {
                                            return (<div id='app_approve'>
                                                <h4>{`מספר פנייה: ${x.id} `}</h4>
                                                <h4>{`תקציר הפנייה: ${x.summary} `}</h4>
                                                <h4>{`נוצרה בתאריך: ${x.start_date} `}</h4>
                                                <h4>{`--------------------------------------------------------------------------------`}</h4>
                                            </div>
                                            );
                                        }
                                    )}

                                </div>
                            </Modal>
                        </Form>
                    </Card>
                </Box>
            </Box>
        </ConfigProvider>
    )
};
