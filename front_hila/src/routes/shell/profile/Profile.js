import React from 'react';
import { Form, Button, Menu, ConfigProvider } from 'antd';

const Profile = (props) => {

    const [form] = Form.useForm();
    return (
        <ConfigProvider direction="rtl">
            {/* eslint-disable-next-line no-undef */}
            <Form>
                <h2> שלום </h2>
            </Form>
        </ConfigProvider>
    );
};
export default Profile;


//{props.userSession.Data?.contact?.display_name}

/*
export const Profile = () => (
    <div>
        <h1>פרופיל אישי</h1>
        <h4>שם: ....</h4>
    </div>);
    */