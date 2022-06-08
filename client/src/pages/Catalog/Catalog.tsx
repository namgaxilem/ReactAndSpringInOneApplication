import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeTitle } from "store/title/titleSlice";
import { Button, Space } from "antd";
import { callGraph, getFlows } from "services/catalog";
import { callNifiAgent } from "services/deployment";

const Catalog = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeTitle("Flow Catalog"));
  });

  const getCatalog = async () => {
    try {
      const data = await getFlows(1, 1);
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  const getNifiAgent = async () => {
    try {
      const data = await callNifiAgent();
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Space direction={"vertical"}>
      <Button onClick={getCatalog}>get Catalog Test</Button>
      <Button onClick={getNifiAgent}>get NifiAgent Test</Button>
    </Space>
  );
};

export default Catalog;
