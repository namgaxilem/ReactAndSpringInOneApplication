import { Col, Divider, InputNumber, Radio, Row } from "antd";
import React, { useState } from "react";
import Fieldset from "components/Fieldset/Fieldset";
import { Form, Input, Button, Checkbox } from "antd";
import { useForm } from "antd/es/form/Form";
import { Rule } from "antd/lib/form";

const ruleRequiredOnly: Rule[] = [
  { required: true, message: "this is requried" }
];

const ruleRequiredWithCustom: Rule[] = [
  { required: true, message: "this is requrie" },
  { type: 'number', min: 1, message: "min is 1" },
  { type: 'number', max: 100, message: "max is 100" }
];

const AKSCluster = ({ setAKSClusterModel }: any) => {
  const [form] = useForm();
  const returnModel = () => {
    setAKSClusterModel("agugu");
  };

  const [enabled, setEnabled] = useState(false);

  return (
    <>
      <Fieldset title="Persistence">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          onFinish={() => console.log(form.getFieldValue("GreaterThan0"))}
          onFinishFailed={() => console.log(form.getFieldValue("GreaterThan0"))}
          form={form}
        >
          <Form.Item label="Radio">
            <Radio.Group onChange={() => setEnabled(!enabled)} value={enabled}>
              <Radio value={true}> Enabled </Radio>
              <Radio value={false}> Dsiabled </Radio>
            </Radio.Group>
          </Form.Item>

          <Row>
            <Col span={6}>
              <Form.Item label="phone"></Form.Item>
            </Col>
            <Col span={18}>
              <Form.Item
                name="phone"
                rules={
                  enabled ? ruleRequiredWithCustom : ruleRequiredOnly
                }
              >
                <InputNumber
                  formatter={value => `${value}%`}
                  parser={value => Number(value!.replace('%', ''))}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={6}>
              <Form.Item label="Greater than 0"></Form.Item>
            </Col>
            <Col span={18}>
              <Form.Item
                name="GreaterThan0"
                rules={[
                  { required: true, message: "" },
                  { pattern: new RegExp('^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$'), message: 'Must greater than 0' }
                ]}
              >
                <InputNumber
                  formatter={value => `${value}Gi`}
                  parser={value => Number(value!.replace('Gi', ''))}
                />
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
              <Form.Item label="Name regex"></Form.Item>
            </Col>
            <Col span={18}>
              <Form.Item
                name="name"
                rules={[
                  { required: true, message: "Cannot null" },
                  { pattern: new RegExp("^[_a-zA-Z]+[a-zA-Z0-9_-]+[a-zA-Z0-9_]$"), message: "Must contain bla bla bla...." }
                ]}
              >

                <Input />
              </Form.Item>
            </Col>
          </Row>

          {'^([a-z]|-|\d)([a-z]|-|\d)([a-z]|-|\d)+$' + '/(.*[a-z]){3}/i' + '^[^_-][a-zA-Z0-9_-]*[^_-]$'}

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Fieldset>
    </>
  );
};

export default AKSCluster;
