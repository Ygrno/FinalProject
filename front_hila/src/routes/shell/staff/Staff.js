import React from 'react';
import { useHistory } from "react-router-dom";
import { useState } from 'react';
import { Form, Input, Select, Modal, Button, ConfigProvider, message, Space } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { Card, Box } from '@material-ui/core';

/*
export const Staff = (props) => {
    return (
        <div>

            <h1>אנשי צוות</h1>
            <h4>כאן ניתן יהיה לערוך פרטים, לאשר ציוותים, לאשר מתנדבים/חיילים חדשים</h4>
        </div>)
};
*/




export const Staff = (props) => {

    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
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

    var ans = null;

    const getAllSoldiers = () => {
        var axios = require('axios');

        var config = {
            method: 'get',
            url: 'http://52.90.78.193/modules/contrib/civicrm/extern/rest.php?entity=Contact&action=get&json={"sequential":1,"contact_sub_type":"Student"}&api_key=qtjrB1QzwvBIhMVcPcT3Nw&key=aacce8033f7a9730040b45df047e3191',
            headers: {}
        };

        axios(config)
            .then(function (response) {
                ans = response.data;
                //        console.log(JSON.stringify(response.data));
                getMessageByUser(response);
                return response.data;

            })
            .catch(function (error) {
                console.log(error);
            });
    }




    const getMessageByUser = (response) => {
        //var response = getAllSoldiers();

        if (!response)
            return 'שגיאה בגישה לשרת';
        else {
            console.log(JSON.stringify(response.data));
            //   var res = JSON.stringify(response);
            // var res = response;
            return response;
        }
    }


    // console.log(typeof (JSON.stringify(getAllSoldiers())));
    //console.log(JSON.stringify(getAllSoldiers().data));
    return (

        <Box>
            <div>
                <Button onClick={getMessageByUser} type="primary" shape="round" color="Black" variant="contained" size="medium">
                    רשימת החיילים הקיימים
                        </Button>
            </div>
            <div>
                <h2>jjjjjjj</h2>
            </div>
        </Box>



    )
};
// <h2>{getMessageByUser()}</h2>
/*
        <ConfigProvider direction="rtl">
            <Form form={form}>
                <Space>
                    <FormItem>
                        <Button onClick={getAllSoldiers} type="primary" shape="round" color="secondary" variant="contained" size="medium">
                            רשימת החיילים הקיימים
                        </Button>
                    </FormItem>
                </Space>
                <Modal title="רשימת החיילים הבודדים הקיימים במערכת" visible={isModalVisible} onOk={handleOk} okText="אישור" onCancel={handleCancel}
                    cancelText="חזרה">
                </Modal>
            </Form>
        </ConfigProvider>
*/