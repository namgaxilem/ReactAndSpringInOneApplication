import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { changeTitle } from "store/title/titleSlice";
import { Button } from 'antd';
import { callGraph, getFlows } from "services/catalog";

const Catalog = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeTitle("Flow Catalog"));
  })

  const getCatalog = async () => {
    try {
      const data = await getFlows(1, 1)
      console.log(data)
    } catch (err) {
      console.error(err)
    }
  }

  const getGraph = async () => {
    try {
      const data = await callGraph()
      console.log(data)
    } catch (err) {
      console.error(err)
    }
  }

  return (<>
    <Button onClick={getCatalog}>get Catalog Test</Button>
    <Button onClick={getGraph}>get Call Graph Test</Button>
  </>
  )
}

export default Catalog;