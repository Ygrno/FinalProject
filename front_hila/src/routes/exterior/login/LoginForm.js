import React from 'react';
import { useHistory } from "react-router-dom";
import { Form, Input, Button, Checkbox, ConfigProvider, message, Tooltip, Space } from 'antd';
import { UserOutlined, LockOutlined, DownloadOutlined } from '@ant-design/icons';
import "./login.css";
import { login } from "../../../services/api-service";
import { Shell } from "../../../components/Shell";
import { withRouter } from "react-router";


const handleLoginClicked = async (values, onLoginFinish, startSession) => {

    const userDetails = {
        username: values.email,
        email: values.email,
        password: values.password
    };

    const loginResult = await login(userDetails);
    console.log("result : ", loginResult);
    if (loginResult.data["is_error"]) {
        message.error(loginResult.data["is_error"]);
    } else {
        startSession(loginResult.data);
        onLoginFinish(loginResult.data.Data?.contact?.contact_sub_type);
    }
};



const LoginForm = (props) => {

    let history = useHistory();
    const onLoginFinish = (arr) => {
        console.log("type is", arr);
        if (arr.indexOf("Pending") > -1) {
            history.push("/");
        }
        else {
            history.push("/profile");
        }
    };

    return (
        <ConfigProvider direction="rtl">
            <Form
                s name="normal_login"
                initialValues={{
                    remember: true,
                }}
                onFinish={(values) => handleLoginClicked(values, onLoginFinish, props.startSession)}
            >
                <Form.Item
                    name="email"
                    rules={[
                        {
                            type: 'email',
                            message: 'הכנס אימייל חוקי בבקשה!',
                        },
                        {
                            required: true,
                            message: 'הכנס אימייל בבקשה!',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="" />} placeholder="אי-מייל" />
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

                <Form.Item>
                    <a className="radio-box" href="http://amishrakefight.org/gfy/" target="_blank">
                        <h3 style={{ color: "#1890ff" }} > שכחתי סיסמה
                        </h3>
                    </a>
                </Form.Item>
                <Form.Item>
                    <Space>
                        <Button style={{ color: "white", background: "lime", border: "lime" }} type="primary" className="login-form-input" shape="round" icon={<DownloadOutlined />}
                            htmlType="submit" >
                            היכנס
                    </Button>

                        <h3 style={{ color: "white" }}> או </h3>
                        <a href="/register">
                            <h3 style={{ color: "#1890ff" }} >
                                הירשם עכשיו!
                          </h3>
                        </a>
                    </Space>
                </Form.Item>
            </Form>
        </ConfigProvider>

    );
};


export default withRouter(LoginForm);