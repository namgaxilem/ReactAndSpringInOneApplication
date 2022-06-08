import { Button, Input, Space } from "antd";
import React, { useEffect, useState } from "react";
import { postDeployment } from "services/deployment";

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

  return (
    <Space direction={"vertical"}>
      <input value={username} onChange={(e) => setUserName(e.target.value)} />
      <input value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={onPostDeploymentClick}>Post Deployment</Button>
    </Space>
  );
};

export default Deployment;
