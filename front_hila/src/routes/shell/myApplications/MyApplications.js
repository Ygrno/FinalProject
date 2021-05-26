import React, {useEffect} from 'react';
import {useState} from 'react';
import {Form, Modal, Button, ConfigProvider, Space} from 'antd';
import {makeStyles, CircularProgress, Box} from "@material-ui/core";

import {MyApplicationsPreview} from "./MyApplicationsPreview";
import {getAllSoldierEvents, getActiveEventById, getEventsContactIsParticipant} from '../../../services/api-civicrm-service';

const useStyle = makeStyles(theme => ({
        container: {
            display: 'flex',
            flex: 1,
            width: '100%',
            flexDirection: 'column'
        },
        addButton: {
            position: 'fixed',
            bottom: 40,
            left: 40,
            backgroundColor: theme.palette.secondary.main,
            fontSize: 28
        }
    }));

function getEventIds(participantsData){
    return participantsData?.map(participant => participant.event_id)
}

const getContactEvents = async (userSession, eventsIds) => {
    const eventsPromises = eventsIds.map(eventId => getActiveEventById(userSession.Data?.API_KEY, eventId))
    return await Promise.all(eventsPromises);
}

export const MyApplications = ({userSession, endSession}) => {
    const classes = useStyle();
    const [form] = Form.useForm();
    const [myApplications, setApplications] = useState([]);
    const [isLoading, setIsLoading] = useState(false);



    const loadApplications = async () => {
        setIsLoading(true);
        const res = await getEventsContactIsParticipant(userSession.Data?.API_KEY, userSession.Data.contact.contact_id);
        // const res = await getEventsContactIsParticipant(userSession.Data?.API_KEY, 272);

        let eventsIds = getEventIds(res.data.values)
        let contactEvents = await getContactEvents(userSession, eventsIds)
        const events = contactEvents.map(eventRequestRes => eventRequestRes.data.values).map(x => x[0]);

        setApplications(events ?? []);
        // console.log("myApplications: ",myApplications);
        // console.log(res.data?.values);
        setIsLoading(false);
    };


    useEffect(loadApplications, []);

    return (
        <Box className={classes.container}>
            <ConfigProvider direction="rtl">
                <Form form={form}>
                    <Box>
                        {
                            myApplications?.length
                                ? myApplications?.map(x => <MyApplicationsPreview application={x} userSession={userSession}/>)
                                : !isLoading && <h1>לא קיימות פניות</h1>
                        }
                    </Box>
                </Form>
            </ConfigProvider>
            {
                isLoading && <CircularProgress />
            }
        </Box>
    )

};

