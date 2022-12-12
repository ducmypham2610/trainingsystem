import axios from "axios";
import { useState, useEffect } from "react";
import { Popconfirm, Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Modal,
  Typography,
  message,
  DatePicker,
  Select,
} from "antd";
import Main from "../components/layout/Main";
import { Col, Row } from "antd";
import { getAllCourses, deleteCourse } from "../services/courseService";
import { getAllCategories } from "../services/categoriesService";
import React from "react";
import { ToastContainer, toast } from "react-toastify";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

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

function Courses() {
  // const role = localStorage.getItem("Role");
  const [courseId, setCourseId] = useState(0);
  const [course, setCourse] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState([]);
  const getCourse = async (id) => {
    const res = await axios.get("http://localhost:8000/course/" + id);
    setCourse(res.data.course);
  };

  const formatDate = (date) => {
    var options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };
    var today = new Date(date);

    return today.toLocaleDateString("vi", options);
  };

  useEffect(() => {
    getAllCategories()
      .then((res) => {
        const newData = res.data.categories.map((item) => {
          return {
            value: item._id,
            label: item.name,
          };
        });
        setCategories(newData);
      })
      .catch((err) => console.log(err));
  }, []);

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
      title: "Start",
      dataIndex: "start",
      key: "start",
    },
    {
      title: "End",
      dataIndex: "end",
      key: "end",
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
        const newData = res.data.courses.map((item) => {
          return {
            _id: item._id,
            name: item.name,
            description: item.description,
            category: item.category.name,
            start: formatDate(item.start_date),
            end: formatDate(item.end_date),
          };
        });
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
      const response = await axios.put(
        "http://localhost:8000/course/" + courseId,
        { ...values }
      );
      if (response.status === 200) {
        toast.success("Course updated successfully !");
        setCourse([]);
      }
      console.log(response);
    } catch (err) {
      if (err.response) {
        console.log(err.response);
        setError(err.response.data);
        toast.error(err.response.data);
      }
    }
    console.log("Success:", values);
    setIsModalOpen(false);
  };

  const onFinishaddcourse = async (values) => {
    try {
      const response = await axios.post("http://localhost:8000/course", {
        ...values,
      });
      if (response.status === 201) {
        toast.success("Course added successfully !");
        setCourse([]);
      }
    } catch (err) {
      if (err.response) {
        console.log(err.response);
        setError(err.response.data);
        toast.error(err.response.data);
      }
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <Main>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <div className="search-add">
          <div className="search"></div>
          <div className="add">
            <Button onClick={showModal}>Add</Button>
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
      {course.length !== 0 && (
        <Modal
          title="Basic Modal"
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
              name: course.name,
              description: course.description,
              category: course.category.name,
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
                  type: "text",
                },
              ]}
            >
              <Select
                allowClear
                showSearch
                placeholder="Category"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={categories}
              />
            </Form.Item>

            <Form.Item name="start_date" label="Start date">
              <DatePicker />
            </Form.Item>

            <Form.Item name="end_date" label="End date">
              <DatePicker />
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
        title="Basic Modal"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          {...layout}
          name="nest-messages"
          onFinish={onFinishaddcourse}
          validateMessages={validateMessages}
          initialValues={{
            name: course.name,
            description: course.description,
            category: course.category,
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
                type: "text",
              },
            ]}
          >
            <Select
              allowClear
              showSearch
              placeholder="Category"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={categories}
            />
          </Form.Item>

          <Form.Item name="start_date" label="Start date">
            <DatePicker />
          </Form.Item>

          <Form.Item name="end_date" label="End date">
            <DatePicker />
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
