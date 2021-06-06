import React from 'react';
import { useState } from 'react';

import { Box, Card, makeStyles } from "@material-ui/core";
import {Button, ConfigProvider, Modal, Popconfirm, Space} from "antd";
import FormItem from "antd/lib/form/FormItem";
import {getAllPendings, getProfile, removePending, sendMail} from "../../../services/api-civicrm-service";


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
        borderRadius: 45
    },
    title: {
        fontWeight: 'bold'
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
            {props.subtype.includes("StaffMember")?
            <div style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
                border: "1px solid rgb(0, 0, 0.3)",
                borderRadius: "8px",
                padding: "5px",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                alignItems: 'center',
            }}>
                {props.displayName}

                <span style={{
                    width: "100px",
                    height: "30px",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden"
                }}>
                {props.subtype.includes("Soldier") ? <a href={props.imageURL}> קובץ החייל </a> : null}
            </span>

            </div>
            :null}
        </Popconfirm>
    );
};
const viewPendings = async (props) => {
    const pendingRes = await getAllPendings(props.Data.API_KEY);

    Modal.info({
            title: "לחץ על משתמש על מנת לאשר את האיש צוות",
            content:
                pendingRes.data.values.map(pendingUser => <PendingRow displayName={pendingUser.display_name}
                                                                      imageURL={pendingUser.image_URL}
                                                                      subtype={pendingUser.contact_sub_type}
                                                                      contactId={pendingUser.contact_id}
                                                                      api_key={props.Data.API_KEY}/>)
        }
    )
}


export const Manager = (props) => {
    const classes = useStyle();

    return (
        <ConfigProvider direction="rtl">
        <Box className={classes.container}>
            <Card className={classes.card}>
                <h1 className={classes.title}>מנהל</h1>
                <Space>
                    <FormItem>
                        <Button id="pending_users" className={"list-btn"}
                                onClick={() => viewPendings(props.userSession)}
                                type="primary" shape="round" color="Black" style={{backroundColor: "#1980ff"}}
                                variant="contained" size="large">
                            רשימת אנשי צוות בהמתנה
                        </Button>
                    </FormItem>
                </Space>
            </Card>

        </Box>
        </ConfigProvider>
    );
};

