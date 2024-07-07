import { getUrl } from "aws-amplify/storage";
import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { listUserCarLists } from "../graphql/queries";
import { generateClient } from "aws-amplify/api";

const client = generateClient();

const Index = () => {
  const [data, setData] = useState([]);

  const columns = [
    {
      title: "name",
      dataIndex: "name",
      width: "25%",
      editable: false,
    },
    {
      title: "brand",
      dataIndex: "brand",
      width: "15%",
      editable: true,
    },
    {
      title: "portType",
      dataIndex: "portType",
      width: "15%",
      editable: true,
    },
    {
      title: "range",
      dataIndex: "range",
      width: "15%",
      editable: true,
    },
  ];

  useEffect(() => {
    fetchListUserCarLists();
  }, []);

  async function fetchListUserCarLists() {
    const apiData = await client.graphql({ query: listUserCarLists });
    const dataListFromAPI = apiData.data.listUserCarLists.items;
    setData(dataListFromAPI);
  }
  return (
    <div>
      <Table
        rowKey={(record) => record.id}
        bordered
        dataSource={data}
        columns={columns}
      />
    </div>
  );
};

export default Index;
