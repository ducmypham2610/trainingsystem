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
import { useState, useEffect } from "react";
import { Popconfirm, Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Typography, message } from "antd";
import Main from "../components/layout/Main";
import { Col, Row } from "antd";
import { getAllUsers } from "../services/userService";
import React from 'react';

function Home() {
  const role = localStorage.getItem("Role");
  const [userId, setUserId] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
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
                showModal();
                setUserId(record.id);
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

  // const handleDelete = (key) => {
  //   deleteUser(key)
  //     .then((res) => console.log(res))
  //     .catch((err) => console.log(err));
  // };

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


    </>
  );
}

export default Home;