/*!
  =========================================================
  * Muse Ant Design Dashboard - v1.0.0
  =========================================================
  * Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
  * Copyright 2021 Creative Tim (https://www.creative-tim.com)
  * Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
  * Coded by Creative Tim
  =========================================================
  * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import axios from "axios";
import { useState, useEffect } from "react";
import Main from "../components/layout/Main";

import {
  Row,
  Col,
  Card,
  Button,
  List,
  Descriptions,
  Avatar,
  Radio,
  Switch,
  Upload,
  message,
  Layout,
} from "antd";

import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  VerticalAlignTopOutlined,
} from "@ant-design/icons";
import "../assets/styles/Profile.css";
import { Form, Input, Modal, DatePicker, Select } from "antd";

import BgProfile from "../assets/images/bg-profile.jpg";
import profilavatar from "../assets/images/face-1.jpg";
import convesionImg from "../assets/images/face-3.jpg";
import convesionImg2 from "../assets/images/face-4.jpg";
import convesionImg3 from "../assets/images/face-5.jpeg";
import convesionImg4 from "../assets/images/face-6.jpeg";
import convesionImg5 from "../assets/images/face-2.jpg";
import project1 from "../assets/images/home-decor-1.jpeg";
import project2 from "../assets/images/home-decor-2.jpeg";
import project3 from "../assets/images/home-decor-3.jpeg";

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

function Profile({}) {
  const [imageURL, setImageURL] = useState(false);
  const [, setLoading] = useState(false);

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(false);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (imageUrl) => {
        setLoading(false);
        setImageURL(false);
      });
    }
  };
  const userId = localStorage.getItem("UserId");
  const [user, setUser] = useState([]);
  const getUser = async (id) => {
    console.log(id)
    const res = await axios.get("http://localhost:8000/user/" + id);
    setUser(res.data.user);
    console.log(user);
  };
  useEffect(() => {
    getUser(userId);
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinishupdate = async (values) => {
    try {
      const response = await axios.put("http://localhost:8000/user/" + userId, {
        ...values,
      });
      setUser(response.data.user);
    } catch (err) {
      console.log(err);
    }
    console.log("Success:", values);
    setIsModalOpen(false);
  };

  var options = { year: "numeric", month: "numeric", day: "numeric" };
  var today = new Date(user.dob);
  var dob = today.toLocaleDateString("vi", options);

  const pencil = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M13.5858 3.58579C14.3668 2.80474 15.6332 2.80474 16.4142 3.58579C17.1953 4.36683 17.1953 5.63316 16.4142 6.41421L15.6213 7.20711L12.7929 4.37868L13.5858 3.58579Z"
        className="fill-gray-7"
      ></path>
      <path
        d="M11.3787 5.79289L3 14.1716V17H5.82842L14.2071 8.62132L11.3787 5.79289Z"
        className="fill-gray-7"
      ></path>
    </svg>,
  ];

  const uploadButton = (
    <div className="ant-upload-text font-semibold text-dark">
      {<VerticalAlignTopOutlined style={{ width: 20, color: "#000" }} />}
      <div>Upload New Project</div>
    </div>
  );

  const data = [
    {
      title: "Sophie B.",
      avatar: convesionImg,
      description: "Hi! I need more information…",
    },
  ];

  const project = [
    {
      img: project1,
      titlesub: "Project #1",
      title: "Modern",
      disciption:
        "As Uber works through a huge amount of internal management turmoil.",
    },
    {
      img: project2,
      titlesub: "Project #2",
      title: "Scandinavian",
      disciption:
        "Music is something that every person has his or her own specific opinion about.",
    },
    {
      img: project3,
      titlesub: "Project #3",
      title: "Minimalist",
      disciption:
        "Different people have different taste, and various types of music, Zimbali Resort",
    },
  ];

  return (
    <>
      <Main>
        <div
          className="profile-nav-bg"
          style={{ backgroundImage: "url(" + BgProfile + ")" }}
        ></div>

        <Card
          className="card-profile-head"
          bodyStyle={{ display: "none" }}
          title={
            <Row justify="space-between" align="middle" gutter={[24, 0]}>
              <Col span={24} md={12} className="col-info">
                <Avatar.Group>
                  <Avatar size={74} shape="square" src={profilavatar} />

                  <div className="avatar-info">
                    <h4 className="font-semibold m-0">{user.name}</h4>
                    <p>{user.role}</p>
                  </div>
                </Avatar.Group>
              </Col>
              <Col
                span={24}
                md={12}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <Radio.Group defaultValue="a">
                  <Radio.Button value="a">OVERVIEW</Radio.Button>
                  <Radio.Button value="b">TEAMS</Radio.Button>
                  <Radio.Button value="c">PROJECTS</Radio.Button>
                </Radio.Group>
              </Col>
            </Row>
          }
        ></Card>

        <Row gutter={[24, 0]}>
          <Col span={24} md={8} className="mb-24">
            <Card
              bordered={false}
              title={<h6 className="font-semibold m-0">Profile Information</h6>}
              className="header-solid h-full card-profile-information"
              extra={
                <Button onClick={showModal} type="link">
                  {pencil}
                </Button>
              }
              bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
            >
              <Descriptions>
                <Descriptions.Item
                  className="profile-detail"
                  label="Full Name"
                  span={3}
                >
                  {user.name}
                </Descriptions.Item>
                <Descriptions.Item label="Gender" span={3}>
                  {user.gender}
                </Descriptions.Item>
                <Descriptions.Item label="Date of Birth" span={3}>
                  {dob}
                </Descriptions.Item>
                <Descriptions.Item label="Mobile" span={3}>
                  {user.telephone}
                </Descriptions.Item>
                <Descriptions.Item label="Email" span={3}>
                  {user.email}
                </Descriptions.Item>
                <Descriptions.Item label="Address" span={3}>
                  {user.address}
                </Descriptions.Item>
                <Descriptions.Item label="Social" span={3}>
                  <a href="#pablo" className="mx-5 px-5">
                    {<TwitterOutlined />}
                  </a>
                  <a href="#pablo" className="mx-5 px-5">
                    {<FacebookOutlined style={{ color: "#344e86" }} />}
                  </a>
                  <a href="#pablo" className="mx-5 px-5">
                    {<InstagramOutlined style={{ color: "#e1306c" }} />}
                  </a>
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>
          {user.role !== "admin" && user.role !== "staff" && (
            <Col span={24} md={16} className="mb-24">
              <Card
                bordered={false}
                title={
                  user.role === "trainer" ? (
                    <h6 className="font-semibold m-0">Topics</h6>
                  ) : (
                    <h6 className="font-semibold m-0">Courses</h6>
                  )
                }
                className="header-solid h-full"
                bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
              >
                <List
                  itemLayout="horizontal"
                  dataSource={
                    user.role === "trainer" ? user.topics : user.courses
                  }
                  split={false}
                  className="conversations-list"
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        title={item.name}
                        description={item.description}
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          )}
        </Row>
        <Modal
          title="Update user"
          open={isModalOpen}
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
              gender: user.gender,
              address: user.address,
              telephone: user.telephone,
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
      </Main>
    </>
  );
}

export default Profile;
