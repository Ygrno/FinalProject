import React, {useEffect, useRef} from 'react';
import {Form, Input, Select, Modal, ConfigProvider, message, Space, Spin} from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import {
    getContactAddress,
    getProfile,
    updateProfileAddress,
    updateProfileContact
} from "../../../services/api-civicrm-service";
import {useState} from 'react';
import Box from "@material-ui/core/Box/Box";
import {Card, makeStyles, Button, CircularProgress} from '@material-ui/core';
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import {DownloadOutlined} from "@ant-design/icons";
import {CreatejsonResponse, prepareContactData} from "../../../services/utils"
import {useHistory} from "react-router";
import "./profile.scss"
import {logger} from '../../../Logger'

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


const updateValues = async (values, oldValues, api, id, address_id, startSession, loadProfile) => {
    await updateProfileContact(api, id, values.name ?? oldValues.name, values.lastName ?? oldValues.lastName);
    await updateProfileAddress(api, address_id, values.city ?? oldValues.city, values.street ?? oldValues.street, values.building ?? oldValues.building);
    const profileRes = await getProfile(api, id);
    await getContactAddress(api, id);
    let contact_data_json = prepareContactData(api, profileRes.data.values[0]);
    let responeRet = CreatejsonResponse(profileRes.data.is_error, "Successfully retrieved contact details", contact_data_json);
    startSession(responeRet);
    loadProfile();
    window.location.reload();

};
const formItemLayout = {
    labelCol: {span: 10},
    wrapperCol: {span: 14},
};

const editDetails = async (props, address, startSession, loadProfile) => {
    const oldValues = {
        name: props.Data?.contact.first_name,
        lastName: props.Data?.contact.last_name,
        city: address.city,
        street: address.street_name,
        building: address.street_number
    };

    Modal.info({
        title: "ערוך פרטים",
        content:
            <ConfigProvider direction={"rtl"}>
                <Form name="normal_login" initialValues={{remember: true,}}
                      layout={"horizontal"}
                      {...formItemLayout}

                      onFinish={(values) => updateValues(values, oldValues, props.Data?.API_KEY, props.Data?.contact?.contact_id, props.Data?.contact?.address_id, startSession, loadProfile)}>
                   <h3>שם פרטי:</h3>
                    <Form.Item
                        name="name">
                        <Input placeholder={props.Data?.contact.first_name} className={"first_name_input"}/>
                    </Form.Item>
                    <h3>שם משפחה:</h3>
                    <Form.Item

                        name="lastName">

                        <Input placeholder={props.Data?.contact.last_name} className={"first_name_input"}/>
                    </Form.Item>
                    <h3>עיר מגורים:</h3>
                    <Form.Item

                        name="city">
                        <Input placeholder={address.city} className={"first_name_input"}/>
                    </Form.Item>
                    <h3>רחוב:</h3>
                    <Form.Item


                        name="street">
                        <Input placeholder={address.street_name} className={"first_name_input"}/>
                    </Form.Item>
                    <h3>מספר ביתי:</h3>
                    <Form.Item
                        className={"bulding-input"}
                        name="building">
                        <Input placeholder={address.street_number} className={"first_name_input"} />
                    </Form.Item>
                    <Button id = "update_details" style={{color: "white", background: "lime", border: "lime"}} type="primary"
                            className="update_details" shape="round" icon={<DownloadOutlined/>}
                            htmlType="submit">
                        עדכן פרטים
                    </Button>
                </Form>
            </ConfigProvider>,
        okText: 'סגור',

    })
};

export const Profile = (props) => {
    // console.log("props.startSession", props.startSession)
    const [form] = Form.useForm();
    const classes = useStyle();
    const [profileDetailes, setProfiledetailes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [adressDetails, setAddressDetails] = useState([]);

    const loadProfile = async () => {
        try {
            setIsLoading(true);
            const res = await getProfile(props.userSession.Data?.API_KEY, props.userSession.Data?.contact?.contact_id);
            const addressRes = await getContactAddress(props.userSession.Data?.API_KEY, props.userSession.Data?.contact?.contact_id);
            // console.log("in loadProfile the addressRes  is:", addressRes);
            setAddressDetails(addressRes.data.values[0] ?? []);
            setProfiledetailes(res.data?.values[0] ?? []);
            // profileDetails = res.data?.values;
            // console.log("the res is:", res.data?.values)
        } catch (error) {
            console.log(error);
            logger.error(error);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        loadProfile();
    }, []);


    // console.log("This is a address call :", adressDetails)
    // console.log("the profile: ", profileDetailes)

    return (
        <Box>

            <ConfigProvider direction="rtl">
                <Card className={classes.container}>
                    {
                        isLoading ? <CircularProgress/> :
                            <>

                                <Box overflow={'auto'}>
                                    {profileDetailes?.display_name && adressDetails?.city ?
                                        <div style={{display: "flex", flexDirection: "column"}}>
                                            
                                            <span id = 'span_name'>{`שם: ${profileDetailes?.display_name} `}</span>
                                            <span id = 'span_email'>{`אימייל: ${profileDetailes?.email} `}</span>
                                            <span id = 'span_birth'>{`תאריך לידה: ${profileDetailes?.birth_date} `}</span>
                                            <span id = 'span_city'>{`עיר: ${adressDetails?.city} `}</span>
                                            <span id = 'span_street'>{`רחוב: ${adressDetails?.street_name} `}</span>
                                            <span id = 'span_house'>{`מספר בית: ${adressDetails?.street_number} `}</span>
                                        </div> : <Spin/>}
                                </Box>
                                <FormItem>
                                    <Tooltip title="פתח">
                                        <Button id = "edit_details" onClick={() => {
                                            editDetails(props.userSession, adressDetails, props.startSession, loadProfile)
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