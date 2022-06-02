import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { changeTitle } from "../../store/title/titleSlice";
import './Environments.less';
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

function Environments() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeTitle("Environments"));
  });

  return <>
    <Button type="primary" onClick={() => navigate('/environments/initializer')}>
      Deploy
    </Button>
    <h1>Environments</h1>
  </>
}

export default Environments;