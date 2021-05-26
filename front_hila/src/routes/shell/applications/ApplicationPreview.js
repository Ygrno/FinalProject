import React, {useEffect, useState} from "react";
import {Card, makeStyles, Checkbox} from '@material-ui/core';
import {Button} from "antd";
import {
    setActiveEvent,
    addParticipantToEvent,
    getParticipantToEvent,
    getProfile
} from "../../../services/api-civicrm-service";
import {getUserTypes} from "../../../utils/user.util";
import {UserType} from "../../../constants";
import applicationTypes from '../../../utils/application-type-translator';

const useStyle = makeStyles(theme => ({
    container: {
        margin: theme.spacing(1),
        padding: theme.spacing(2),
        backgroundColor: '#e5eded',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.9), 0 6px 20px 0 rgba(0, 0, 0, 2.19)',
        minWidth: 500,
        width: '40%',
        alignItems: 'stretch',
        display: 'flex',
        flexDirection: 'column',
        alignContent:"flex-start",

    },
    title: {
        fontWeight: 600
    }
}));

export const ApplicationPreview = ({application, userSession, startSession}) => {
    const classes = useStyle();
    const [profile, setProfile] = useState({});

    useEffect(() => {
        const asyncCall = async  () => {
            const userProfile = await getProfile(userSession.Data?.API_KEY, application.created_id)
            if (userProfile.data?.values?.length > 0) {
                setProfile(userProfile.data.values[0]);
            }
        }

        asyncCall();
    }, [])

    //Todo change to getUserTypes(userSession)?.includes(UserType.Volunteer)
    const shouldShowHandleButton = () => getUserTypes(userSession)?.includes(UserType.Volunteer) && application.is_active === '0';

    const changeActiveEvent = async () => {
        const updateRes = await setActiveEvent(userSession.Data?.API_KEY, application.id); //getAllSoldiers(qtjrB1QzwvBIhMVcPcT3Nw)
        const res = await addParticipantToEvent(userSession.Data?.API_KEY, application.id, userSession.Data.contact.contact_id);
        console.log(updateRes);
        console.log("addParticipantToEvent res=", res);
        alert("הפנייה שבחרת התקבלה וממתינה לאישור");
    };

    return (
        <Card id='app_card' className={classes.container}>
            <h3 className={classes.title}>{applicationTypes[application.title] || application.title}</h3>
            <h4><strong>תקציר הפנייה: </strong>{application.summary}</h4>
            <h4><strong>מספר פנייה: </strong>{application.id}</h4>
            <h4><strong>נוצרה בתאריך: </strong>{application.created_date}</h4>
            <h4><strong>עיר מגורים: </strong>{profile.city ? profile.city : "חסוי/לא קיימת עיר עבור המשתמש שיצר את הפניה הנוכחית"}</h4>
            {
                shouldShowHandleButton() &&
                <Button id='take_care' onClick={() => changeActiveEvent()} type="secondary" shape="round"
                        color="secondary"
                        variant="contained"
                        size="medium">
                    טפל בפנייה
                </Button>
            }
        </Card>
    );
};