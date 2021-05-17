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
    const shouldShowHandleButton = ()=> application.is_confirm_enabled === '1';

    console.log("myapplicationprewbiew before return", application)
    return <Card className={classes.container}  >
        <h4>{`מספר פנייה: ${application.id} `}</h4>
        <h4>{`כותרת הפנייה: ${application.title} `}</h4>
        <h4 id = 'application_details'> {`תיאור : ${application.description} `} </h4>
        <h4>{`נוצרה בתאריך: ${application.created_date} `}</h4>

    </Card>
};

