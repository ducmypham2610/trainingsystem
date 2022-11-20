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
import { Table } from "antd";
import Main from "../components/layout/Main";
import { Col, Row } from "antd";
import { getAllUsers  } from "../services/userService";

function Home() {
  const role = localStorage.getItem("Role");

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
        }
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
  ];
  const [data, setData] = useState([]);
  useEffect(() => {
    getAllUsers()
      .then((res) => {
        console.log(res.data.users);
        const newData = res.data.users;
        setData(newData);
      })
      .catch((err) => console.log(err));
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

export default Home;
