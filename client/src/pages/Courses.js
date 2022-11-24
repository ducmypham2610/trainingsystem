import axios from "axios";
import { useState, useEffect } from "react";
import { Popconfirm, Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Typography, message, DatePicker } from "antd";
import Main from "../components/layout/Main";
import { Col, Row } from "antd";
import { getAllCourses, deleteCourse } from "../services/courseService";
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

function Courses() {
  // const role = localStorage.getItem("Role");
  const [courseId, setCourseId] = useState(0);
  const [course, setCourse] = useState([]);
  const getCourse = async (id) => {
    const res = await axios.get("http://localhost:8000/course/"+id)
    setCourse(res.data.course)

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
    setCourse([]);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
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
              setCourseId(record._id);
              showModal();
              getCourse(record._id);
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
    getAllCourses()
      .then((res) => {
        // console.log(res);
        const newData = res.data.courses;
        setData(newData);
      })
      .catch((err) => console.log(err));
  }, [data]);

  const handleDelete = (key) => {
    deleteCourse(key)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

//   const onFinish = async (values) => {
//     try {
//       const response = await axios.put('http://localhost:8000/topic/'+topicId,{...values});
//       if(response.status === 200) {
//         console.log('Update successfully');
//       }
//     } catch(err) {
//       console.log(err);
//     } 
// console.log('Success:', values);
// setIsModalOpen(false);
//   }

  const onFinishupdate = async (values) => {
    try {
      const response = await axios.put('http://localhost:8000/course/'+courseId,{...values});
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

const onFinishaddcourse = async (values) => {
  try {
    const response = await axios.post('http://localhost:8000/course',{...values});
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
      {course.length !==0 && (
      <Modal title="Basic Modal" open={isModalOpen} onCancel={handleCancel}  footer={null}>
      <Form {...layout} name="nest-messages" onFinish={onFinishupdate} validateMessages={validateMessages} 
        initialValues={{
          name:course.name,
          description:course.description,
          category:course.category
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
            name="description"
            label="Description"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="category"
            label="Category"
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
      <Form {...layout} name="nest-messages" onFinish={onFinishaddcourse} validateMessages={validateMessages} 
        initialValues={{
          name:course.name,
          description:course.description,
          category:course.category
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
            name="description"
            label="Description"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="category"
            label="Category"
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

export default Courses;