import { Button, Input, Space } from "antd";
import React, { useEffect, useState } from "react";
import { postDeployment, getDeployment } from "services/deployment";

const Deployment = () => {
  const [username, setUserName] = useState<string>("username");
  const [password, setPassword] = useState("password");

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

  return (
    <Space direction={"vertical"}>
      <input value={username} onChange={(e) => setUserName(e.target.value)} />
      <input value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={onPostDeploymentClick}>Post Deployment</Button>
      <Button onClick={onGetDeployment}>Get Deployment</Button>
    </Space>
  );
};

export default Deployment;
