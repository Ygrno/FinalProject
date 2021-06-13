import React, { useEffect } from "react";
import { Card, makeStyles, Checkbox } from '@material-ui/core';
import { Button, message } from "antd";
import {
    setActiveEvent,
    addParticipantToEvent,
    getParticipantToEvent,
    MarkEventAsDone, getActiveEventById
} from "../../../services/api-civicrm-service";
import { getUserTypes } from "../../../utils/user.util";
import { UserType } from "../../../constants";
import { logger } from '../../../Logger'

const useStyle = makeStyles(theme => ({
    container: {
        margin: theme.spacing(2),
        padding: theme.spacing(2),
        backgroundColor: '#e5eded'
    }
}));

export const MyApplicationsPreview = ({ application, userSession, startSession }) => {
    const classes = useStyle();
    const [checked, setChecked] = React.useState(true);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    //Todo change to getUserTypes(userSession)?.includes(UserType.Volunteer)
    const shouldShowCloseButton = () => getUserTypes(userSession)?.includes(UserType.Volunteer) && application.is_active === '1' && application.is_map === '0' && application.is_confirm_enabled === '1';
    const isNotConfirmedYet = () => application.is_map === '0' && application.is_confirm_enabled === '0';
    const isClosed = () => application.is_map === '1';



    const closeEvent = async (applicationId) => {
        try {
            await MarkEventAsDone(userSession.Data?.API_KEY, applicationId)
            const applicationRes = await getActiveEventById(userSession.Data?.API_KEY, applicationId)
            console.log(`APPLICATION RES ${applicationRes.data}`)
            message.success("תודה! הפנייה שטיפלת בה נסגרה.");
            window.location.reload();

        } catch (e) {
            message.error(`מצטערים, לא ניתן לסגור את הפניה המבוקשת. הסיבה היא: ${e}`);
            logger.error(e)
        }

    };

    const getStatus = () => {
        if (application.is_map === '1')
            return 'סגורה';
        if (application.is_active === '0')
            return 'פתוחה';
        if (application.is_map === '0' & application.is_confirm_enabled === '0')
            return 'ממתינה לאישור ציוות';
        if (application.is_confirm_enabled === '1')
            return 'בטיפול';
    }



    console.log("myapplicationprewbiew before return", application)

    return <Card className={classes.container}>
        <h4>{`מספר פנייה: ${application.id} `}</h4>
        <h4>{`כותרת הפנייה: ${application.title} `}</h4>
        <h4 id='application_details'>{`תיאור : ${application.summary} `}</h4>
        <h4>{`נוצרה בתאריך: ${application.start_date} `}</h4>

        <h3 style={{ color: "red" }}><strong>סטטוס הפנייה: </strong>{getStatus()}</h3>

        {
            shouldShowCloseButton() &&
            <Button id='close_app' onClick={() => closeEvent(application.id)} type="secondary" shape="round"
                color="secondary"
                variant="contained"
                size="medium">
                סגור פנייה
            </Button>
        }

    </Card>
};

