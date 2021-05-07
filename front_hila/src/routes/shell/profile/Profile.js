import React from 'react';
import { Form, Input, Select, Modal, Button, ConfigProvider, message, Space } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { getProfile } from "../../../services/api-civicrm-service";
import { useState } from 'react';







export const Profile = (props) => {
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [Profiledetailes, setProfiledetailes] = useState([]);
    const [isChecked, setIsChecked] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleOk = () => {
        setIsModalVisible(false);
        setIsChecked(true);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
        setIsChecked(false);
    };

    const Handletry = async (props, updateSession, MoveToProfile) => {
        var Message = ""
        const updateRes = await getProfile(props.Data?.API_KEY); //getAllSoldiers(qtjrB1QzwvBIhMVcPcT3Nw)

        if (updateRes.data.is_error === 1) {
            Message = "unable to update Contact"
        } else {
            Message = "Successfully updated contact"
        }
        setProfiledetailes(updateRes.data.values);
        setIsModalVisible(true);
    };


    return (
        <ConfigProvider direction="rtl">
            <Form form={form}>
                <Space>
                    <FormItem>
                        <Button onClick={() => Handletry(props.userSession, props.startSession)} type="primary" shape="round" color="Black" variant="contained" size="medium">
                            פרטים אישיים
                </Button>
                    </FormItem>
                </Space>
                <Modal title="פרטים אישיים" visible={isModalVisible} onOk={handleOk} okText="אישור" onCancel={handleCancel} cancelText="חזרה">
                    <div> {
                        Profiledetailes.map(
                            (details) => {
                                return (<div><h4></h4>
                                    {`שם ושם משפחה: ${details.display_name} `}<h4></h4>
                                    {`אימייל: ${details.email} `}<h4></h4>
                                    {`תאריך לידה: ${details.birth_date} `}<h4></h4>
                                    {`עיר מגורים: ${details.city} `}<h4></h4>
                                    {`מספר רשומה במערכת: ${details.contact_id} `}</div>
                                );
                            }
                        )}
                    </div>
                </Modal>
            </Form>
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