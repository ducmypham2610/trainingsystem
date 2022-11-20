
import axios from "axios";
import { useState, useEffect } from "react";
import { Popconfirm, Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, DatePicker, Select} from "antd";
import Main from "../components/layout/Main";
import { Col, Row } from "antd";
import { getAllUsers, deleteUser } from "../services/userService";
import React from 'react';
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

function Home() {



  const role = localStorage.getItem("Role");
  const [userId, setUserId] = useState(0);
  const [user, setUser] = useState([]);
  const getUser = async (id) => {
    const res = await axios.get("http://localhost:8000/user/"+id)
    setUser(res.data.user)
    
  console.log(user)
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      filters: [
        {
          text: "admin",
          value: "admin",
        },
        {
          text: "staff",
          value: "staff",
        },
        {
          text: "trainer",
          value: "trainer",
        },
        {
          text: "trainee",
          value: "trainee",
        },
      ],
      onFilter: (value, record) => record.role.indexOf(value) === 0,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Telephone",
      dataIndex: "telephone",
      key: "telephone",
    },
    {
      title: "Action",
      key: "key",
      render: (_, record) => (
        <>
          <Button
            style={{ marginRight: "16px", color: "blue" }}
            onClick={() => {
              console.log(record._id)
              setUserId(record._id);
              showModal();
              getUser(record._id);
            }}
            // onClick={showModal}
          >
            <EditOutlined />
          </Button>
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record._id)}
          >
            <Button style={{ color: "red" }}>
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];
  const [data, setData] = useState([]);
  useEffect(() => {
    getAllUsers()
      .then((res) => {
        const newData = res.data.users;
        const account = newData.filter((item) => {
          if (role === "admin") {
            return item.role === "staff" || item.role === "admin";
          }
          if (role === "staff") {
            return item.role === "trainer" || item.role === "trainee";
          }
        });
        setData(account);
      })
      .catch((err) => console.log(err));
  }, [data]);

  const handleDelete = (key) => {
    deleteUser(key)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const onFinish = async (values) => {
    try {
      const response = await axios.put('http://localhost:8000/user/'+userId,{...values});
      if(response.status === 200) {
        console.log('Update successfully');
      }
    } catch(err) {
      console.log(err);
    } 
console.log('Success:', values);

setIsModalOpen(false);
};

  return (
    <>
      <Main>
        <div className="layout-content">
          <Row gutter={[24, 0]}>
            <Col xs={24} xl={24} className="mb-24">
              <Table columns={columns} dataSource={data} />
            </Col>
          </Row>
        </div>
      </Main>
      {user.length !==0 && (
      <Modal title="Basic Modal" open={isModalOpen}  footer={null}>
        <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages} 
        initialValues={{
          name:user.name,
          username:user.username,
          email:user.email,
          // dob:user.dob,
          gender:user.gender,
          address:user.address,
          role:user.role,
          password:user.password,
          telephone:user.telephone
        }}
        >
          <Form.Item
            name="name"
            label="Name"

            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="username"
            label="Username"
            rules={[
              {
                type: 'username',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                type: 'email',
              },
            ]}
          >
            <Input />
          </Form.Item>
          
          <Form.Item
            name="dob"
            label="Date of birth"
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            name="gender"
            label="Gender"
            rules={[
              {
                type: 'gender',
              },
            ]}
          >
            <Select>
              <Select.Option value="male">Male</Select.Option>
              <Select.Option value="female">Female</Select.Option>
              <Select.Option value="other">Other</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            rules={[
              {
                type: 'address',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="role"
            label="Role"
            rules={[
              {
                type: 'role',
              },
            ]}
          >
            <Select>
              <Select.Option value="admin">Admin</Select.Option>
              <Select.Option value="staff">Staff</Select.Option>
              <Select.Option value="trainer">Trainer</Select.Option>
              <Select.Option value="trainee">Trainee</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                type: 'text',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="telephone"
            label="Telephone"
            rules={[
              {
                type: 'text',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              ...layout.wrapperCol,
              offset: 8,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      )}
    </>
  );
}

export default Home;