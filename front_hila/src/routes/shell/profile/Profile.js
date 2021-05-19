import React, {useEffect, useRef} from 'react';
import {Form, Input, Modal, ConfigProvider,Spin} from 'antd';
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


const updateValues = async (values,oldValues,api,id) => {
    // console.log(values.name ?? oldValues.name)
    // console.log("TTHE API IS",id)
    const updateProfileRes = await updateProfileContact(api, id, values.name ?? oldValues.name, values.lastName ?? oldValues.lastName)
    const updateAddressRes = await updateProfileAddress(api, id, values.city ?? oldValues.city, values.street ?? oldValues.street, values.building ?? oldValues.building)
    console.log("the updateAddressRes is ", updateAddressRes)

}
    const formItemLayout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 14 },
};

const editDetails = async (props,address) => {
    const oldValues ={
        name:props.Data?.contact.first_name,
        lastName:props.Data?.contact.last_name,
        city:address.city,
        street:address.street_name,
        building:address.street_number
    }

    Modal.info({
        title: "ערוך פרטים",
        content:
            <ConfigProvider direction={"rtl"}>
                <Form name="normal_login" initialValues={{remember: true,}}
                      layout={"horizontal"}
                      {...formItemLayout}
                      onFinish={(values) => updateValues(values,oldValues,props.Data?.API_KEY,props.Data?.contact?.contact_id)}>
                    <Form.Item
                        label="החלף שם פרטי"
                        name="name">

                        <Input placeholder={props.Data?.contact.first_name}/>
                    </Form.Item>
                    <Form.Item
                        label=" החלף שם משפחה"
                        name="lastName">

                        <Input placeholder={props.Data?.contact.last_name}/>
                    </Form.Item>
                    <Form.Item
                        label="החלף עיר"
                        name="city">
                        <Input placeholder={address.city}/>
                    </Form.Item>
                    <Form.Item
                        label="החלף שם רחוב"
                        name="street">
                        <Input placeholder={address.street_name}/>
                    </Form.Item>
                    <Form.Item
                        label="החלף מספר בית"
                        name="building">
                        <Input placeholder={address.street_number}/>
                    </Form.Item>
                    <Button style={{color: "white", background: "lime", border: "lime"}} type="primary"
                            className="login-form-input" shape="round" icon={<DownloadOutlined/>}
                            htmlType="submit">
                        עדכן פרטים
                    </Button>
                </Form>
            </ConfigProvider>,
        okText: 'סגור'

    })
}

export const Profile = (props) => {
    const [form] = Form.useForm();
    const classes = useStyle();
    const [profileDetailes, setProfiledetailes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [adressDetails, setAddressDetails] = useState([]);
    // const renderaddress = useRef()
    // let addressDetails ;
    // let profileDetails;


    const loadProfile = async () => {
        try {
            // setIsLoading(true);
            // console.log("in loadProfile the contact id is:",props.userSession.Data?.contact?.contact_id)
            const res = await getProfile(props.userSession.Data?.API_KEY, props.userSession.Data?.contact?.contact_id);
            const addressRes = await getContactAddress(props.userSession.Data?.API_KEY, props.userSession.Data?.contact?.contact_id)
            // console.log("in loadProfile the addressRes  is:", addressRes);
            setAddressDetails(addressRes.data.values[0] ?? []);
            setProfiledetailes(res.data?.values[0] ?? []);
            // profileDetails = res.data?.values;
            console.log("the res is:", res.data?.values)
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        loadProfile();
    }, [])

    // let contact = profileDetailes[0]
    // let address = adressDetails
    console.log("This is a address call :", adressDetails)
    // console.log("profileDetailes after set:", profileDetailes)
    console.log("the profile: ", profileDetailes)

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
                                        <span>{`שם: ${profileDetailes?.display_name} `}</span>
                                        <span>{`אימייל: ${profileDetailes?.email} `}</span>
                                        <span>{`תאריך לידה: ${profileDetailes?.birth_date} `}</span>
                                        <span>{`עיר: ${adressDetails?.city} `}</span>
                                        <span>{`רחוב: ${adressDetails?.street_name} `}</span>
                                        <span>{`מספר בית: ${adressDetails?.street_number} `}</span>
                                    </div> : <Spin/>}
                                </Box>
                                <FormItem>
                                    <Tooltip title="פתח">
                                        <Button onClick={() => {
                                            editDetails(props.userSession,adressDetails)
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