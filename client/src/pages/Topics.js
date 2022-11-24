import axios from "axios";
import { useState, useEffect } from "react";
import { Popconfirm, Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Typography, message, DatePicker } from "antd";
import Main from "../components/layout/Main";
import { Col, Row } from "antd";
import { getAllTopics, deleteTopic } from "../services/topicsService";
import React from 'react';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

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

function Topics() {
  // const role = localStorage.getItem("Role");
  const [topicId, setTopicId] = useState(0);
  const [topic, setTopic] = useState([]);
  const getTopic = async (id) => {
    const res = await axios.get("http://localhost:8000/topic/"+id)
    setTopic(res.data.topic)

  }
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  // const handleOk = () => {
  //   setIsModalOpen(false);
  // };
  const handleCancel = () => {
    setIsModalOpen(false);
    setTopic([]);
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
    {
      title: "Action",
      key: "key",
      render: (_, record) => (
        <>
          <Button
            style={{ marginRight: "16px", color: "blue" }}
            onClick={() => {
              console.log(record._id)
              setTopicId(record._id);
              showModal();
              getTopic(record._id);
            }}
            
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
        // console.log(res);
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

  const onFinish = async (values) => {
    try {
      const response = await axios.put('http://localhost:8000/topic/'+topicId,{...values});
      if(response.status === 200) {
        console.log('Update successfully');
      }
    } catch(err) {
      console.log(err);
    } 
console.log('Success:', values);
setIsModalOpen(false);
  }

  const onFinishupdate = async (values) => {
    try {
      const response = await axios.put('http://localhost:8000/topic/'+topicId,{...values});
      if(response.status === 200) {
        console.log('Update successfully');
        // setUser([]);
      }
    } catch(err) {
      console.log(err);
    } 
console.log('Success:', values);
setIsModalOpen(false);
};

const onFinishaddtopic = async (values) => {
  try {
    const response = await axios.post('http://localhost:8000/topic',{...values});
    console.log(response);
  } catch(err) {
    console.log(err);
  } 
console.log('Success:', values);
setIsModalOpen(false);
};

  return (
    <>
      <Main>
      <div className="search-add">
          <div className="search">
          
          </div>
          <div className="add">
            <Button onClick={showModal}>
              Add
            </Button>
          </div>
        </div>
        <div className="layout-content">
          <Row gutter={[24, 0]}>
            <Col xs={24} xl={24} className="mb-24">
              <Table pagination={{ pageSize: 8 }} columns={columns} dataSource={data} />
            </Col>
          </Row>
        </div>
      </Main>
      {topic.length !==0 && (
      <Modal title="Basic Modal" open={isModalOpen} onCancel={handleCancel}  footer={null}>
      <Form {...layout} name="nest-messages" onFinish={onFinishupdate} validateMessages={validateMessages} 
        initialValues={{
          name:topic.name,
          course:topic.course,
          description:topic.description
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
            name="course"
            label="Course"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
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

Add
<Modal title="Basic Modal" open={isModalOpen} onCancel={handleCancel}  footer={null}>
      <Form {...layout} name="nest-messages" onFinish={onFinishaddtopic} validateMessages={validateMessages} 
        initialValues={{
          name:topic.name,
          course:topic.course,
          description:topic.description
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
            name="course"
            label="Course"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
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
    </>
  );
}

export default Topics;