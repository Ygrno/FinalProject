import React, {useState} from 'react';
import {useHistory} from "react-router-dom";
import {Form, Input, Button, Checkbox, ConfigProvider, message, Tooltip, Space} from 'antd';
import {UserOutlined, LockOutlined, DownloadOutlined} from '@ant-design/icons';
import "./login.css";
import {login} from "../../../services/api-service";
import {withRouter} from "react-router";
import {isUserPending} from "../../../utils/user.util";
import {CircularProgress} from "@material-ui/core";
import "./login-form.scss"
const LoginForm = ({userSession, startSession}) => {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async ({email, password}) => {
        setIsLoading(true);
        const userDetails = {
            username: email,
            email,
            password
        };

        const loginResult = await login(userDetails);
        setIsLoading(false);

        if (loginResult.data["is_error"]) {
            message.error("ההתחברות נכשלה. אנה בדוק את פרטי ההתחברות שלך פעם נוספת או נסה ליצור קשר במייל של האתר.");
        } else {
            startSession(loginResult.data);
            onLoginFinish();
        }
    };

    const onLoginFinish = () => {

        if (userSession && isUserPending(userSession)) {
            history.push("/pending");
        } else {
            history.push("/home");
        }
    };

    return (
        <ConfigProvider direction="rtl">
            <Form
                s name="normal_login"
                initialValues={{
                    remember: true,
                }}
                onFinish={onSubmit}
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
                    className={"email_input"}
                >
                    <Input prefix={<UserOutlined className="email-input"/>} placeholder="אי-מייל"/>
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
                    <Input.Password prefix={<LockOutlined className="input-box"/>}
                                    type="password"
                                    placeholder="סיסמה"
                    />
                </Form.Item>

                <Form.Item>
                    <a className="radio-box" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank">
                        <h3 style={{color: "#1890ff"}}> שכחתי סיסמה
                        </h3>
                    </a>
                </Form.Item>
                <Form.Item>
                    <Space>
                        {
                            isLoading ? <CircularProgress color='secondary'/> :
                                <>
                                    <Button  type="primary"
                                            className="login-btn-new" shape="round" icon={<DownloadOutlined/>}
                                            htmlType="submit">
                                        היכנס
                                    </Button>
                                    <h3 style={{color: "black"}}> או </h3>
                                    <a href="/register">
                                        <h3 style={{color: "#1890ff"}}>
                                            הירשם עכשיו!
                                        </h3>
                                    </a>
                                </>
                        }
                    </Space>
                </Form.Item>
            </Form>
        </ConfigProvider>
    );
};


export default withRouter(LoginForm);