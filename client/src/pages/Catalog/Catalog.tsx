import React, { useEffect, useState } from "react";
import CatalogDetail from "components/CatalogDetail/CatalogDetail";
import { useDispatch } from 'react-redux';
import { changeTitle } from "store/title/titleSlice";
import { Table, Tag, Space, Button } from 'antd';
import { getFlows } from "services/catalog";

const Catalog = () => {
  const dispatch = useDispatch();
  const [catalogList, setCatalogList] = useState([
    {
      id: 1,
      name: "Kafka to S3",
      version: 3,
      lastUpdated: "19 hours ago"
    },
    {
      id: 2,
      name: "Consume Pulsar",
      version: 1,
      lastUpdated: "2 hours ago"
    }
  ]);
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: any) => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (tags: any) => (
        <>
          {tags.map((tag: any) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Space size="middle">
          <a>Invit.name</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];

  useEffect(() => {
    dispatch(changeTitle("Flow Catalog"));
  })

  const callApiTest = async () => {
    try {
      const data = await getFlows(1, 1)
      console.log(data)
    } catch (err) {
      console.error(err)
    }
  }

  return (<>
    <CatalogDetail />
    <Table columns={columns} dataSource={data} />
    <Button onClick={callApiTest}>callApiTest</Button>
  </>
  )
}

export default Catalog;