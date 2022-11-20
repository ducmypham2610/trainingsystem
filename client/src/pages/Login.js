import React, {useEffect} from 'react'
import { Button, Checkbox, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
function LogIn() {
    let navigate = useNavigate();

    useEffect(() => {
    const username = localStorage.getItem("Username");
    if(username) {
      localStorage.clear();
    }
    },[]);

    const onFinish = async (values) => {
        const response = await axios.post('http://localhost:8000/user/login',values);
        if(response.status === 200) {
            console.log(response.data.user[0]);
            localStorage.setItem("Username",response.data.user[0].username);
            localStorage.setItem("Role",response.data.user[0].role);
            localStorage.setItem("Token",response.data.token);
            navigate("/users");
        }
        console.log(response);
      };
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
      return (
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input />
          </Form.Item>
    
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
    
          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
    
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      );
}

export default LogIn