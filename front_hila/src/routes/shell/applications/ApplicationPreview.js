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

export const ApplicationPreview = ({application, userSession, startSession}) => {
    const classes = useStyle();


    //Todo change to getUserTypes(userSession)?.includes(UserType.Volunteer)
    const shouldShowHandleButton = ()=> getUserTypes(userSession)?.includes(UserType.Volunteer) && application.is_active === '0';


    const changeActiveEvent = async () => {
        const updateRes = await setActiveEvent(userSession.Data?.API_KEY, application.id); //getAllSoldiers(qtjrB1QzwvBIhMVcPcT3Nw)
        const res = await addParticipantToEvent(userSession.Data?.API_KEY, application.id, userSession.Data.contact.contact_id);
        console.log(updateRes);
        console.log("addParticipantToEvent res=" , res);
        alert("הפנייה שבחרת התקבלה וממתינה לאישור");
    };

    return <Card className={classes.container}  >
        <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
        {`מספר פנייה: ${application.id} `}<h4></h4>
        {`כותרת הפנייה: ${application.title} `}<h4></h4>
        {`תיאור : ${application.description} `}<h4></h4>
        {`נוצרה בתאריך: ${application.created_date} `}<h4></h4>
        {shouldShowHandleButton() &&
        <Button onClick={() => changeActiveEvent()} type="secondary" shape="round" color="secondary" variant="contained"
                size="medium">
            טפל בפנייה
        </Button>
        }


    </Card>
};

/*
   <Checkbox
            checked={checked}
            onChange={handleChange}
            inputProps={{'aria-label': 'primary checkbox'}}
        />
 */