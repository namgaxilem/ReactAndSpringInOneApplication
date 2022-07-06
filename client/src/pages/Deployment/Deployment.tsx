import { Button, Input, Space, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { postDeployment, getDeployment } from "services/deployment";
import type { ColumnsType } from 'antd/lib/table';
import DeploymentDetail from "components/DeploymentDetail/DeploymentDetail";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
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
    render: (_, { tags }) => (
      <>
        {tags.map(tag => {
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
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const data: DataType[] = [
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

const Deployment = () => {
  const [username, setUserName] = useState<string>("username");
  const [password, setPassword] = useState("password");
  const [isOpenDetail, setIsOpenDetail] = useState(false);

  const onPostDeploymentClick = async () => {
    const data = await postDeployment({
      username,
      password,
    });
    console.log("onPostDeploymentClick", data);
  };

  const onGetDeployment = async () => {
    const data = await getDeployment();
    console.log("onGetDeployment", data);
  }

  return <>
    <Space direction={"vertical"}>
      <input value={username} onChange={(e) => setUserName(e.target.value)} />
      <input value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={onPostDeploymentClick}>Post Deployment</Button>
      <Button onClick={onGetDeployment}>Get Deployment</Button>
    </Space>
    <Table columns={columns} dataSource={data}
      onRow={(record, rowIndex) => {
        return {
          onClick: event => {
            setIsOpenDetail(true)
          }
        };
      }}
    />
    <DeploymentDetail visible={isOpenDetail} onClose={() => { setIsOpenDetail(false) }} />
  </>;
};

export default Deployment;
