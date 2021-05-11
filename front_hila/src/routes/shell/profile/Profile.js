import React, {useEffect} from 'react';
import { Form, Input, Select, Modal, ConfigProvider, message, Space } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import {getAllEvents, getProfile} from "../../../services/api-civicrm-service";
import { useState } from 'react';
import Box from "@material-ui/core/Box/Box";
import {Card, makeStyles, Button} from '@material-ui/core';
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import Fab from "@material-ui/core/Fab/Fab";

const useStyle = makeStyles(theme => ({
    container: {
        margin: theme.spacing(4),
        padding: theme.spacing(4),
        backgroundColor: '#e5eded',
        fontSize: 18
    },
    editButton: {
        position: 'fixed',
        backgroundColor: theme.palette.secondary.main,
        fontSize: 14,
        shape: 'round'
    }
}));
//        position: 'fixed',


export const Profile = (props) => {
    const [form] = Form.useForm();
    const classes = useStyle();
    const [profileDetailes, setProfiledetailes2] = useState([]);


    const loadProfile = async () => {
        const res = await getProfile(props.userSession.Data?.API_KEY);
        setProfiledetailes2(res.data?.values ?? []);
    };

    useEffect(loadProfile, []);

    return (
        <ConfigProvider direction="rtl">
            <Card className={classes.container}>
                <Box overflow={'auto'}>
                    {profileDetailes?.map(x => {
                        return (<div><h2></h2>
                                {`שם: ${x.display_name} `}<h2></h2>
                                {`אימייל: ${x.email} `}<h2></h2>
                                {`תאריך לידה: ${x.birth_date} `}<h2></h2>
                                {`עיר מגורים: ${x.city} `}<h2></h2>
                                {`מספר רשומה במערכת: ${x.contact_id} `}</div>
                        );
                    })}
                </Box>
                <FormItem>
                    <Tooltip title="הוסף פנייה חדשה">
                        <Button onClick={()=> {console.log("")}} className={classes.editButton}>
                            ערוך פרטים
                        </Button>
                    </Tooltip>
                </FormItem>
            </Card>
        </ConfigProvider>
    )
};



/*
const Profile = (props) => {

    const [form] = Form.useForm();
    return (
        <ConfigProvider direction="rtl">
            <Form>
                <h2> שלום </h2>
            </Form>
        </ConfigProvider>
    );
};
export default Profile;
*/