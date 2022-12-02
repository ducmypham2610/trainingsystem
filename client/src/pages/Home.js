import axios from "axios";
import { useState, useEffect } from "react";
import { Popconfirm, Table } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Modal, DatePicker, Select } from "antd";
import Main from "../components/layout/Main";
import { Col, Row } from "antd";
import { getAllUsers, deleteUser } from "../services/userService";
import { getAllCourses } from "../services/courseService";
import { getAllTopics } from "../services/topicsService";
import React from "react";
import "../assets/styles/Home.css";
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
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

function Home() {
  const role = localStorage.getItem("Role");

  const [userId, setUserId] = useState(0);
  const [user, setUser] = useState([]);
  const getUser = async (id) => {
    const res = await axios.get("http://localhost:8000/user/" + id);
    setUser(res.data.user);
    console.log(user);
  };

  const [courses, setCourses] = useState([]);
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getAllCourses()
      .then((res) => {
        const newData = res.data.courses.map((item) => {
          return {
            value: item._id,
            label: item.name,
          };
        });
        setCourses(newData);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    getAllTopics()
      .then((res) => {
        const newData = res.data.topics.map((item) => {
          return {
            value: item._id,
            label: item.description,
          };
        });
        setTopics(newData);
      })
      .catch((err) => console.log(err));
  });

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

      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <>
            <Input
              autoFocus
              placeholder="Search..."
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
              onPressEnter={() => {
                confirm();
              }}
              onBlur={() => {
                confirm();
              }}
            ></Input>
            <Button
              onClick={() => {
                confirm();
              }}
              type="primary"
            >
              Search
            </Button>
            <Button
              onClick={() => {
                clearFilters();
              }}
              type="danger"
            >
              Reset
            </Button>
          </>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.email.toLowerCase().includes(value.toLowerCase());
      },
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
              console.log(record._id);
              setUserId(record._id);
              getUser(record._id);
              console.log(user);
              showModalEdit();
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

  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const showModalEdit = () => {
    setIsModalEditOpen(true);
  };
  const showModalAdd = () => {
    setIsModalAddOpen(true);
  };
  const handleCancel = () => {
    setIsModalEditOpen(false);
    setIsModalAddOpen(false);
    setUser([]);
  };

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

  const onFinishupdate = async (values) => {
    try {
      const response = await axios.put("http://localhost:8000/user/" + userId, {
        ...values,
      });
      if (response.status === 200) {
        console.log("Update successfully");
        // setUser([]);
      }
    } catch (err) {
      console.log(err);
    }
    console.log("Success:", values);
    setIsModalEditOpen(false);
  };

  const onFinishadduser = async (values) => {
    try {
      const response = await axios.post("http://localhost:8000/user", {
        ...values,
      });
    } catch (err) {
      console.log(err);
    }
    console.log("Success:", values);
    setIsModalAddOpen(false);
  };

  return (
    <>
      <Main>
        <div className="search-add">
          <div className="search"></div>
          <div className="add">
            <Button onClick={showModalAdd}>Add</Button>
          </div>
        </div>
        <div className="layout-content">
          <Row gutter={[24, 0]}>
            <Col xs={24} xl={24} className="mb-24">
              <Table
                pagination={{ pageSize: 8 }}
                columns={columns}
                dataSource={data}
              />
            </Col>
          </Row>
        </div>
      </Main>
      {user.length !== 0 && (
        <Modal
          title="Update user"
          open={isModalEditOpen}
          onCancel={handleCancel}
          footer={null}
        >
          <Form
            {...layout}
            name="nest-messages"
            onFinish={onFinishupdate}
            validateMessages={validateMessages}
            initialValues={{
              name: user.name,
              username: user.username,
              email: user.email,
              // dob:user.dob,
              gender: user.gender,
              address: user.address,
              role: user.role,
              password: user.password,
              telephone: user.telephone,
              courses: user.courses.name
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
                  type: "username",
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
                  type: "email",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item name="dob" label="Date of birth">
              <DatePicker />
            </Form.Item>
            <Form.Item
              name="gender"
              label="Gender"
              rules={[
                {
                  type: "gender",
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
                  type: "address",
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
                  type: "role",
                },
              ]}
            >
              <Select>
                {role === "admin" && (
                  <Select.Option value="admin">Admin</Select.Option>
                )}
                {role === "admin" && (
                  <Select.Option value="admin">Staff</Select.Option>
                )}
                <Select.Option value="trainer">Trainer</Select.Option>
                <Select.Option value="trainee">Trainee</Select.Option>
              </Select>
            </Form.Item>
            {user?.role === "trainee" && (
              <>
                <Form.Item
                  name="courses"
                  label="Course"
                  rules={[
                    {
                      type: "role",
                    },
                  ]}
                >
                  <Select
                    mode="multiple"
                    allowClear
                    showSearch
                    placeholder="Assign to course"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={courses}
                  />
                </Form.Item>
              </>
            )}
            {user?.role === "trainer" && (
              <>
                <Form.Item
                  name="topics"
                  label="Topic"
                  rules={[
                    {
                      type: "role",
                    },
                  ]}
                >
                  <Select
                    mode="multiple"
                    allowClear
                    showSearch
                    placeholder="Assign to topic"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={topics}
                  />
                </Form.Item>
              </>
            )}
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  type: "text",
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
                  type: "text",
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
      Add
      <Modal
        title="Add user"
        open={isModalAddOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          {...layout}
          name="nest-messages"
          onFinish={onFinishadduser}
          validateMessages={validateMessages}
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
                type: "username",
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
                type: "email",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="dob" label="Date of birth">
            <DatePicker />
          </Form.Item>
          <Form.Item
            name="gender"
            label="Gender"
            rules={[
              {
                type: "gender",
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
                type: "address",
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
                type: "role",
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
                type: "text",
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
                type: "text",
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
    </>
  );
}

export default Home;
