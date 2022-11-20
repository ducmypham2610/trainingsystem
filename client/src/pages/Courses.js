import React from "react";
import { useState, useEffect } from "react";
import { Table } from "antd";
import Main from "../components/layout/Main";
import { Col, Row } from "antd";
import { getAllCourses } from "../services/courseService";
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
    filters: [
      {
        text: "IT",
        value: "IT",
      },
      {
        text: "Economy",
        value: "Economy",
      },
      {
        text: "Art & Graphic Design",
        value: "Art & Graphic Design",
      },
    ],
    onFilter: (value, record) => record.category.indexOf(value) === 0,
  },
];

function Courses() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllCourses()
      .then((res) => {
        console.log(res.data.courses);
        const newData = res.data.courses;
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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

export default Courses;
