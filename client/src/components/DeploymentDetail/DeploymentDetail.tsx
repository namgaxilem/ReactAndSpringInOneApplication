import { CheckOutlined, CloseOutlined, FieldTimeOutlined, LinkOutlined, ReloadOutlined, WarningOutlined } from '@ant-design/icons';
import { Alert, Avatar, Button, Col, Drawer, Row, Space, Tabs, Tag, Typography } from 'antd';
import { useAuth } from 'context/auth';
import { useState } from 'react';
import Deployment from 'types/Deployment';
import styles from './DeploymentDetail.module.less'

const { Text, Title, Paragraph } = Typography;
const { TabPane } = Tabs;

const DeploymentDetail = ({ visible, onClose }) => {
    const { user } = useAuth();
    const [deploymentDetail] = useState<Deployment>(
        {
            deploymentId: 'asd4-a65s4d2-asd654-a6s5d4',
            deploymentName: 'string',
            flowId: '654-654a-asd-654',
            version: 2,
            environmentId: 'asc2asd-a465sd-12w9654',
            deployedAt: 2,
            deployedBy: 'Quoi Vo',
            state: 'PENDING',

            // state: 'IN_PROGRESS',
            approvedAt: 12124,
            approvedBy: 'Tan Luu'

            // state: 'REJECTED',
            // approvedAt: 12124,
            // approvedBy: 'Tan Luu'
        }
        // {
        //     deploymentId: 'asd4-a65s4d2-asd654-a6s5d4',
        //     deploymentName: 'string',
        //     deployedAt: 2,
        //     deployedBy: 'Quoi Vo',
        //     state: 'IN_PROGRESS',
        //     flowId: '654-654a-asd-654',
        //     version: 2,
        //     environmentId: 'asc2asd-a465sd-12w9654',
        //     approvedAt: new Date(),
        //     approvedBy: 'Tan Luu'
        // }
        // {
        //     deploymentId: 'asd4-a65s4d2-asd654-a6s5d4',
        //     deploymentName: 'string',
        //     deployedAt: 2,
        //     deployedBy: 'Quoi Vo',
        //     state: 'REJECTED',
        //     flowId: '654-654a-asd-654',
        //     version: 2,
        //     environmentId: 'asc2asd-a465sd-12w9654',
        //     approvedAt: new Date(),
        //     approvedBy: 'Tan Luu'
        // }
    )

    return (
        <Drawer
            placement="right"
            visible={visible}
            onClose={onClose}
            width={500}
            extra={
                <Space>
                    <Text italic type="secondary">
                        <ReloadOutlined /> &nbsp; Refreshed 3 seconds ago // TODO
                    </Text>
                </Space>
            }
        >
            {deploymentDetail.state === "PENDING" && <>
                <Alert
                    showIcon
                    message="This deployment need admin approval, contact admin for permission"
                    type="warning"
                />
            </>}

            {deploymentDetail.state === "PENDING" && user?.roles?.includes("portalAdmin") && <Space style={{ marginTop: '1em' }}>
                <Button icon={<CheckOutlined />} type="primary">Approve</Button>
                <Button icon={<CloseOutlined />}>Reject</Button>
            </Space>}

            <Tabs defaultActiveKey="1">
                <TabPane tab="Infomation" key="1">
                    <Title className={styles.title} level={5}>Detail</Title>
                    <Row style={{ margin: '0.75em' }}>
                        <Col span={12}>
                            <Text type="secondary">Deployment Id</Text>
                        </Col>
                        <Col span={12}>
                            <Text strong>{deploymentDetail.deploymentId}</Text>
                        </Col>
                    </Row>
                    <Row style={{ margin: '0.75em' }}>
                        <Col span={12}>
                            <Text type="secondary">Deployment Name</Text>
                        </Col>
                        <Col span={12}>
                            <Text strong>{deploymentDetail.deploymentName}</Text>
                        </Col>
                    </Row>
                    <Row style={{ margin: '0.75em' }}>
                        <Col span={12}>
                            <Text type="secondary">Deployed At</Text>
                        </Col>
                        <Col span={12}>
                            <Text strong>{deploymentDetail.deployedAt}</Text>
                        </Col>
                    </Row>
                    <Row style={{ margin: '0.75em' }}>
                        <Col span={12}>
                            <Text type="secondary">Deployed By</Text>
                        </Col>
                        <Col span={12}>
                            <Space>
                                <Avatar size="small">U</Avatar>
                                <Text strong>{deploymentDetail.deployedBy}</Text>
                            </Space>
                        </Col>
                    </Row>
                    <Row style={{ margin: '0.75em' }}>
                        <Col span={12}>
                            <Text type="secondary">State</Text>
                        </Col>
                        <Col span={12}>
                            <Tag icon={<FieldTimeOutlined />} color="purple">{deploymentDetail.state}</Tag>
                        </Col>
                    </Row>

                    {deploymentDetail.state !== "PENDING" && <>
                        <Row style={{ margin: '0.75em' }}>
                            <Col span={12}>
                                <Text type="secondary">{deploymentDetail.state === "REJECTED" ? 'Rejected' : 'Approved'} by</Text>
                            </Col>
                            <Col span={12}>
                                <Space>
                                    <Avatar size="small">U</Avatar>
                                    <Text strong>{deploymentDetail.approvedBy}</Text>
                                </Space>
                            </Col>
                        </Row>
                        <Row style={{ margin: '0.75em' }}>
                            <Col span={12}>
                                <Text type="secondary">{deploymentDetail.state === "REJECTED" ? 'Rejected' : 'Approved'} at</Text>
                            </Col>
                            <Col span={12}>
                                <Text strong>{deploymentDetail.approvedAt}</Text>
                            </Col>
                        </Row>
                    </>}

                    <Title className={styles.title} level={5}>Flow detail <a><LinkOutlined /></a></Title>
                    <Row style={{ margin: '0.75em' }}>
                        <Col span={12}>
                            <Text type="secondary">Flow Id</Text>
                        </Col>
                        <Col span={12}>
                            <Text strong>{deploymentDetail.flowId}</Text>
                        </Col>
                    </Row>
                    <Row style={{ margin: '0.75em' }}>
                        <Col span={12}>
                            <Text type="secondary">Flow version</Text>
                        </Col>
                        <Col span={12}>
                            <Text strong>{deploymentDetail.version}</Text>
                        </Col>
                    </Row>

                    <Title className={styles.title} level={5}>Cluster detail <a><LinkOutlined /></a></Title>
                    <Row style={{ margin: '0.75em' }}>
                        <Col span={12}>
                            <Text type="secondary">Cluster id</Text>
                        </Col>
                        <Col span={12}>
                            <Text strong>{deploymentDetail.environmentId}</Text>
                        </Col>
                    </Row>
                </TabPane>

                <TabPane tab="Parameters" key="2">

                </TabPane>

            </Tabs>

        </Drawer>
    );
};

export default DeploymentDetail;