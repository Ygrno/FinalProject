import React from "react";
import {Card, makeStyles, Checkbox} from '@material-ui/core';
import {Button} from "antd";
import {setActiveEvent, addParticipantToEvent, getParticipantToEvent} from "../../../services/api-civicrm-service";
import {getUserTypes} from "../../../utils/user.util";
import {UserType} from "../../../constants";

const useStyle = makeStyles(theme => ({
    container: {
        margin: theme.spacing(2),
        padding: theme.spacing(2),
        backgroundColor: '#e5eded'
    }
}));

export const MyApplicationsPreview = ({application, userSession, startSession}) => {
    const classes = useStyle();
    const [checked, setChecked] = React.useState(true);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    //Todo change to getUserTypes(userSession)?.includes(UserType.Volunteer)
    const shouldShowCloseButton = ()=> getUserTypes(userSession)?.includes(UserType.Volunteer) && application.is_active === '0';

    const closeEvent = async () => {
        // const updateRes = await setActiveEvent(userSession.Data?.API_KEY, application.id); //getAllSoldiers(qtjrB1QzwvBIhMVcPcT3Nw)
        // const res = await addParticipantToEvent(userSession.Data?.API_KEY, application.id, userSession.Data.contact.contact_id);
        // console.log(updateRes);
        // console.log("addParticipantToEvent res=", res);
        // alert("הפנייה שבחרת התקבלה וממתינה לאישור");
    };


    console.log("myapplicationprewbiew before return", application)
    return <Card className={classes.container}  >
        <h4>{`מספר פנייה: ${application.id} `}</h4>
        <h4>{`כותרת הפנייה: ${application.title} `}</h4>
        <h4 id = 'application_details'>{`תיאור : ${application.description} `}</h4>
        <h4>{`נוצרה בתאריך: ${application.created_date} `}</h4>
        {
            shouldShowCloseButton &&
            <Button id = 'close_app' onClick={() => closeEvent()} type="secondary" shape="round" color="secondary"
                    variant="contained"
                    size="medium">
                סגור פנייה
            </Button>
        }

    </Card>
};
//shouldShowHandleButton() &&

