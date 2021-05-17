import React, {useEffect} from 'react';
import {Form, Input, Select, Modal, ConfigProvider, message, Space} from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import {useHistory} from "react-router-dom";
import {getAllEvents, getContactAddress, getProfile} from "../../../services/api-civicrm-service";
import {useState} from 'react';
import Box from "@material-ui/core/Box/Box";
import {Card, makeStyles, Button, CircularProgress} from '@material-ui/core';
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import Fab from "@material-ui/core/Fab/Fab";
import {DownloadOutlined} from "@ant-design/icons";

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


const updateValues = (values, props) => {
    console.log("the new name:", values.name)
}

const editDetails = async (props) => {
    Modal.info({
        title: "ערוך פרטים",
        content:
            <div>
                <Form s name="normal_login" initialValues={{remember: true,}}
                      onFinish={(values) => updateValues(values, props.startSession)}>
                    <Form.Item
                        label="החלף שם פרטי"
                        name="name">

                        <Input placeholder={props.Data?.contact.first_name}/>
                    </Form.Item>
                    <Form.Item
                        label="החלף שם משפחה"
                        name="lastName">

                        <Input placeholder={props.Data?.contact.last_name}/>
                    </Form.Item>
                    <Form.Item
                        label="החלף עיר"
                        name="city">
                        <Input placeholder={props.Data?.contact.last_name}/>
                    </Form.Item>
                    <Form.Item
                        label="החלף שם רחוב"
                        name="street">
                        <Input placeholder={props.Data?.contact.last_name}/>
                    </Form.Item>
                    <Form.Item
                        label="החלף מספר בית"
                        name="building">
                        <Input placeholder={props.Data?.contact.last_name}/>
                    </Form.Item>
                    <Button style={{color: "white", background: "lime", border: "lime"}} type="primary"
                            className="login-form-input" shape="round" icon={<DownloadOutlined/>}
                            htmlType="submit">
                        עדכן פרטים
                    </Button>
                </Form>
            </div>,
        okText: 'סגור'

    })
}

export const Profile = (props) => {
    const [form] = Form.useForm();
    const classes = useStyle();
    const [profileDetailes, setProfiledetailes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [adressDetails, setAddressDetails] = useState([]);


    const okFunction = async () => {

    }
    useEffect(() => {
        loadProfile();
    }, [])
    const loadProfile = async () => {
        try {
            setIsLoading(true);
            // console.log("in loadProfile the contact id is:",props.userSession.Data?.contact?.contact_id)
            const res = await getProfile(props.userSession.Data?.API_KEY, props.userSession.Data?.contact?.contact_id);
            addressRes = await getContactAddress(props.userSession.Data?.API_KEY, props.userSession.Data?.contact?.contact_id)
            console.log("in loadProfile the addressRes  is:", addressRes)
        setAddressDetails(addressRes.data.values ?? [])
            setProfiledetailes2(res.data?.values ?? [])
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    let contact = profileDetailes[0]
    let address = adressDetails
    console.log("the address is amit levizky :", address)
    console.log("profileDetailes after set:", profileDetailes)

    return (
        <Box>
            <ConfigProvider direction="rtl">
                <Card className={classes.container}>
                    {
                        isLoading ? <CircularProgress/> :
                            <>
                                <Box overflow={'auto'}>
                                    {profileDetailes?.map(x => {
                                        return (<div><h2></h2>
                                                {`שם: ${x.display_name} `}<h2></h2>
                                                {`אימייל: ${x.email} `}<h2></h2>
                                                {`תאריך לידה: ${x.birth_date} `}<h2></h2>
                                                {`כתובת: ${x.city} `}<h2></h2>
                                            </div>
                                        );
                                    })}

                                </Box>
                                <FormItem>
                                    <Tooltip title="פתח">
                                        <Button onClick={() => {
                                            editDetails(props.userSession, okFunction)
                                        }} className={classes.editButton}>
                                            ערוך פרטים
                                        </Button>
                                    </Tooltip>
                                </FormItem>
                            </>
                    }
                </Card>
            </ConfigProvider>
        </Box>
    )
};