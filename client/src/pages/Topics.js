// import React from 'react'

// function Topics() {
//   return (
//     <div>Topics</div>
//   )
// }

// export default Topics
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
import { getAllTopics, deleteTopic } from "../services/topicsService";
import React from 'react';

function Topics() {
  const role = localStorage.getItem("Role");
  const [topicsId, setTopicId] = useState(0);

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
      title: "Course",
      dataIndex: "course",
      key: "course",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    // {
    //   title: "Role",
    //   dataIndex: "role",
    //   key: "role",
    //   filters: [
    //     {
    //       text: "admin",
    //       value: "admin",
    //     },
    //     {
    //       text: "staff",
    //       value: "staff",
    //     },
    //     {
    //       text: "trainer",
    //       value: "trainer",
    //     },
    //     {
    //       text: "trainee",
    //       value: "trainee",
    //     },
    //   ],
    //   onFilter: (value, record) => record.role.indexOf(value) === 0,
    // },
    // {
    //   title: "Address",
    //   dataIndex: "address",
    //   key: "address",
    // },
    // {
    //   title: "Telephone",
    //   dataIndex: "telephone",
    //   key: "telephone",
    // },
    {
      title: "Action",
      key: "key",
      render: (_, record) => (
        <>
          <Button
            style={{ marginRight: "16px", color: "blue" }}
            // onClick={() => {
            //   console.log(record._id)
            //   setUserId(record._id);
            // }}
            onClick={showModal}
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
    getAllTopics()
      .then((res) => {
        console.log(res);
        const newData = res.data.topics;
        setData(newData);
      })
      .catch((err) => console.log(err));
  }, [data]);

  const handleDelete = (key) => {
    deleteTopic(key)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
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
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>

    </>
  );
}

export default Topics;