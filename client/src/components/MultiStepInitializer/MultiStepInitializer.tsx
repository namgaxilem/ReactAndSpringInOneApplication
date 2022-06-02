import React from "react";
import { Steps, Button, message, Row, Col, Layout, } from 'antd';
import styles from './MultiStepInitializer.module.less';
import AKSCluster from './AKSCluster/AKSCluster';
import Secrets from './Secrets/Secrets';
import NifiNode from "./NifiNode/NifiNode";
import Grafana from "./Grafana/Grafana";
import Prometheus from "./Prometheus/Prometheus";
import Preview from "./Preview/Preview";

const { Step } = Steps;
const { Header, Content, Footer } = Layout;

const MultiStepInitializer = () => {
  const [current, setCurrent] = React.useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const steps = [
    {
      title: 'AKSCluster',
      content: <AKSCluster 
      />,
    },
    {
      title: 'Secrets',
      content: <Secrets />,
    },
    {
      title: 'Nifi',
      content: <NifiNode />,
    },
    {
      title: 'Nifi Agent',
      content: <h1>Nifi Agent</h1>,
    },
    {
      title: 'Grafana',
      content: <Grafana />,
    },
    {
      title: 'Prometheus',
      content: <Prometheus />,
    },
    {
      title: 'Preview',
      content: <Preview />,
    },
  ];

  return <Layout style={{ height: "100vh" }}>
    <Header className={styles.header}>nifi-demo-jam / New Flow Deployment</Header>
    <Content className={styles.content}>
      <Row style={{ height: '100%' }}>
        <Col span={6} style={{ padding: '1em', }}>
          <Steps current={current} direction="vertical">
            {steps.map(item => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
        </Col>
        <Col span={18} className={styles.stepsContent}>
          {steps[current].content}
        </Col>
      </Row>
    </Content>
    <Footer className={styles.footer}>
      <Row>
        <Col span={6}></Col>
        <Col span={18}>
          <div className={styles.stepsAction}>
            <Button style={{ margin: '0 8px' }} onClick={() => alert('cancel')}>
              Cancel
            </Button>

            <div>
              {current > 0 && (
                <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                  Previous
                </Button>
              )}
              {current < steps.length - 1 && (
                <Button type="primary" onClick={() => next()}>
                  Next
                </Button>
              )}
              {current === steps.length - 1 && (
                <Button type="primary" onClick={() => message.success('Processing complete!')}>
                  Done
                </Button>
              )}
            </div>
          </div>
        </Col>
        <Col span={8}></Col>
      </Row>
    </Footer>
  </Layout>
};

export default MultiStepInitializer;