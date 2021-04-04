import { Form, Input, Button, Checkbox ,Select,ConfigProvider} from 'antd';
import { UserOutlined, LockOutlined,DownloadOutlined } from '@ant-design/icons';

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const { Option } = Select;
const LoginForm = () => {
    const [form] = Form.useForm();
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

  function httpsend(values){
    var axios = require('axios');
var data = JSON.stringify(
  {
    "username": values.username,
    "password": values.password
    });

var config = {
  method: 'post',
  url: 'http://127.0.0.1:5000/login',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
  window.location.href="/application"
  
})
.catch(function (error) {
  console.log(error.response);

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
       <Input.Password  prefix={<LockOutlined className="input-box" />}
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
        <Button type="primary" className="login-form-input" shape = "round" icon ={<DownloadOutlined />}htmlType="submit" className="">
          היכנס 
        </Button>
        או <a href="/register">הירשם עכשיו!</a>
        

      </Form.Item>
    </Form>
    </ConfigProvider>
  );
};

export default LoginForm;