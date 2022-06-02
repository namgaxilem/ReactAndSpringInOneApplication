import { Col, Divider, Row } from "antd";
import React from "react";
import Fieldset from "components/Fieldset/Fieldset";
import { Form, Input, Button, Checkbox } from "antd";

const AKSCluster = ({ setAKSClusterModel }: any) => {
  const returnModel = () => {
    setAKSClusterModel("agugu");
  };

  return (
    <>
      <Fieldset title="Persistence">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Row>
            <Col span={6}>
              <Form.Item label="username"></Form.Item>
            </Col>
            <Col span={18}>
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={6}>
              <Form.Item label="password"></Form.Item>
            </Col>
            <Col span={18}>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={6}>
              <Form.Item label="Certificate"></Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={6}>
              <Form.Item label="password" style={{ marginLeft: "1em"}}></Form.Item>
            </Col>
            <Col span={18}>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={6}>
              <Form.Item label="password"></Form.Item>
            </Col>
            <Col span={18}>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Fieldset>
    </>
  );
};

export default AKSCluster;
