import React from 'react';
import { useHistory } from "react-router-dom";
import { useState } from 'react';
import { Form, Input, Select, Modal, Button, ConfigProvider, message, Space } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { Card, Box } from '@material-ui/core';
import { getAllSoldiers, getAllPendingSoldiers } from "../../../services/api-civicrm-service";


export const Staff = (props) => {
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [SodiersDetails, setSodiersDetails] = useState([]);
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
        const updateRes = await getAllSoldiers(props.Data?.API_KEY);
        console.log(props.Data) //getAllSoldiers(qtjrB1QzwvBIhMVcPcT3Nw)

        if (updateRes.data.is_error === 1) {
            Message = "unable to update Contact"
        } else {
            Message = "Successfully updated contact"
        }
        setSodiersDetails(updateRes.data.values);
        setIsModalVisible(true);
    };


    return (
        <ConfigProvider direction="rtl">
            <Form form={form}>
                <Space>
                    <FormItem>
                        <Button onClick={() => Handletry(props.userSession, props.startSession)} type="primary" shape="round" color="Black" variant="contained" size="medium">
                            רשימת החיילים הקיימים
                </Button>
                    </FormItem>
                </Space>
                <Modal title="רשימת החיילים הבודדים" visible={isModalVisible} onOk={handleOk} okText="אישור" onCancel={handleCancel} cancelText="חזרה">
                    <div> {
                        SodiersDetails.map(
                            (soldier) => {
                                return (<div><h4>
                                    {`שם החייל: ${soldier.display_name},  `}
                                    {`אימייל: ${soldier.email},  `}
                                    {`מספר רשומה במערכת: ${soldier.contact_id} `}</h4></div>
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
var ans = null;

    const getMessageByUser = () => {
        var axios = require('axios');

        var config = {
            method: 'get',
            url: 'http://52.90.78.193/modules/contrib/civicrm/extern/rest.php?entity=Contact&action=get&json={"sequential":1,"contact_sub_type":"Student"}&api_key=qtjrB1QzwvBIhMVcPcT3Nw&key=aacce8033f7a9730040b45df047e3191',
            headers: {}
        };

        axios(config)
            .then(function (response) {
                ans = response.data;
                //console.log(JSON.stringify(response.data));
                printUsers(response);
                //return response.data;

            })
            .catch(function (error) {
                console.log(error);
            });
    }


    const printUsers = (response) => {
        if (!response)
            return 'שגיאה בגישה לשרת';
        else {
            return JSON.stringify(response.data);
        }
    }
    */

/*
export const Staff = (props) => {
return (
    <div>

        <h1>אנשי צוות</h1>
        <h4>כאן ניתן יהיה לערוך פרטים, לאשר ציוותים, לאשר מתנדבים/חיילים חדשים</h4>
    </div>)
};
*/