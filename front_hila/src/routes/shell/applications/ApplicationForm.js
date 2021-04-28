import { Form, Input, Upload, message, Button, ConfigProvider, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React from 'react';
const { Option } = Select;
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
/* eslint-disable no-template-curly-in-string */

/* eslint-enable no-template-curly-in-string */
const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
        authorization: 'authorization-text',
    },
    disabled: false,
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} קובץ הועלה בהצלחה`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} קיימת תקלה בהעלת הקובץ`);
        }
    },
};

const ApplicationForm = () => {
    const onFinish = (values) => {
        console.log(values);
    };

    const formItemLayout = {
        labelCol: {
            xs: {
                span: 14,
            },
            sm: {
                span: 27,
            },
        },
        wrapperCol: {
            xs: {
                span: 14,
            },
            sm: {
                span: 10,
            },
        },
    };
    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 16,
                offset: 8,
            },
        },
    };
    return (
        <ConfigProvider direction="rtl">
            <Form className="login" >
                <img src="../images/Icon.png"></img>
                <Form.Item
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "שדה זה הינו חובה"
                        },
                    ]}
                >
                    <Input placeholder="שם מלא" />
                </Form.Item>
                <Form.Item
                    name={['user', 'email']}
                    label=""
                    className="login input"
                    rules={[
                        {
                            type: 'email',
                            required: true,
                            message: "שדה זה הינו חובה"
                        },
                    ]}
                >
                    <Input placeholder="אי-מייל" />
                </Form.Item>


                <Form.Item
                    name="Phone"
                    rules={[{},]}
                >
                    <Input placeholder="מספר טלפון" />
                </Form.Item>

                <Form.Item
                    wrapperCol={{ ...layout.wrapperCol, offset: 4 }}
                    name="title" className="login-from input" rules={[{ required: true, message: 'יש לבחור סוג פניה' }]}>
                    <Select
                        placeholder="נושא"
                        allowClear>
                        <Option value="constuction">שיפוצים ותיקונים</Option>
                        <Option value="subA">ריהוט</Option>
                        <Option value="subA">לימודים</Option>
                        <Option value="subB">אחר</Option>
                    </Select>

                </Form.Item>


                <Form.Item
                    wrapperCol={{ ...layout.wrapperCol, offset: 0 }}
                    name="input"
                    label="פניה"
                    rules={[
                        {
                            required: true,
                            message: "שדה זה הינו חובה"
                        },
                    ]}>
                    <Input.TextArea placeholder="נתין להעלות קובץ pdf או word במקום" />

                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 0 }} name="upload" label="העלה קובץ" rules={[{ offset: 12 }]}>
                        <Upload name="upload" label="העלה קובץ" {...tailFormItemLayout}{...props}  >
                            <Button icon={<UploadOutlined placeholder="קובץ" />}> העלה קובץ או גרור</Button>
                        </Upload>
                    </Form.Item>

                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 3 }}>
                    <Button type="primary" shape="round" htmlType="submit" className="login-form input">
                        שלח
        </Button>
                </Form.Item>
            </Form>
        </ConfigProvider>
    );
};

export default ApplicationForm;