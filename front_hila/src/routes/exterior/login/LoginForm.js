import { Form, Input, Button, Checkbox, Select, ConfigProvider } from 'antd';
import { UserOutlined, LockOutlined, DownloadOutlined } from '@ant-design/icons';

import React from 'react';

const { Option } = Select;

const LoginForm = () => {
    const onFinish = (values) => {
        httpsend(values);
    };

    const formItemLayout = {
        labelCol: {
            xs: {
                span: 4,
            },
            sm: {
                span: 12,
            },

        },
        wrapperCol: {
            xs: {
                span: 14,
            },
            sm: {
                span: 16,
            },
        },
    };

    function httpsend(values) {
        var axios = require('axios');
        var data = JSON.stringify(
            {
                "username": values.username,
                "password": values.password
            });

        var config = {
            method: 'post',
            url: 'http://52.90.78.193/modules/contrib/civicrm/extern/rest.php?',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                window.location.href = "/application"

            })
            .catch(function (error) {
                console.log(error.response);

            });
    }


    const Tryfanction = () => {
        var axios = require('axios');

        var config = {
            method: 'get',
            url: 'http://52.90.78.193/modules/contrib/civicrm/extern/rest.php?entity=Contact&action=get&json={"sequential":1}&api_key=HLd3GTnYMRw6FGMgW7XxFD3K&key=aacce8033f7a9730040b45df047e3191',
            headers: {}
        };

        axios(config)
            .then(function (response) {
                //console.log(JSON.stringify(response.data));
                var res = response.data;
                console.log(res["values"][0]);
            })
            .catch(function (error) {
                console.log(error);
            });

    }




    return (
        <ConfigProvider direction="rtl">
            <Form
                {...formItemLayout}
                name="normal_login"
                className="login input"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: '!הכנס שם משתמש',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="login-from" />} placeholder="שם משתמש" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: '!הכנס סיסמה',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password prefix={<LockOutlined className="input-box" />}
                        type="password"
                        placeholder="סיסמה"
                    />
                </Form.Item>
                <Form.Item >
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>זכור אותי</Checkbox>
                    </Form.Item>

                    <a className="radio-box" href="http://amishrakefight.org/gfy/" target="_blank">
                        שכחתי סיסמה
        </a>
                </Form.Item>

                <Form.Item >
                    <Button type="primary" className="login-form-input" shape="round" icon={<DownloadOutlined />} htmlType="submit" className="">
                        היכנס
        </Button>
        או <a href="/register">הירשם עכשיו!</a>

                    <Form.Item>
                        <Button type="primary" shape="round" htmlType="submit" onClick={Tryfanction} className="login-form input">
                            ניסיון
                        </Button>
                    </Form.Item>


                </Form.Item>
            </Form>
        </ConfigProvider>
    );
};

export default LoginForm;