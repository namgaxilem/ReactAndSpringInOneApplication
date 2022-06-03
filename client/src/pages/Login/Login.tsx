import { KeyOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Checkbox,
  Divider,
  Form,
  Input,
  Layout,
  notification,
  Typography,
} from "antd";
import MS_LOGO from "assets/ms_logo.png";
import { LOGIN_ENDPOINT } from "config/constants";
import { useAuth } from "context/auth";
import styles from "./Login.module.less";

const { Text } = Typography;

const Login = () => {
  const [form] = Form.useForm();

  const onFinish = () => {
    const args = {
      message: "Notification",
      description: "Currently only support AAD authentication",
    };
    notification.open(args);
  };

  return (
    <Layout className={styles.layout}>
      <Card
        className={styles.loginForm}
        title={
          <div style={{ textAlign: "center" }}>
            <Text strong className={styles.logoText}>
              DHP EventProc
            </Text>
          </div>
        }
      >
        <Form
          form={form}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username" }]}
          >
            <Input
              placeholder="Username"
              prefix={<UserOutlined className="site-form-item-icon" />}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password" }]}
          >
            <Input.Password
              placeholder="Password"
              prefix={<LockOutlined className="site-form-item-icon" />}
            />
          </Form.Item>

          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a
              className="login-form-forgot"
              href="/reset-password"
              style={{ float: "right" }}
            >
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              block
              htmlType="submit"
              icon={<KeyOutlined />}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>

        <Divider orientation="center" plain>
          Or
        </Divider>

        <Button
          type="dashed"
          block
          className={styles.OptionalLoginButton}
          // onClick={onAADLoginClick}
          onClick={() => window.location.href = LOGIN_ENDPOINT}
        >
          <img src={MS_LOGO} alt="MS Logo" className={styles.ms_logo} />
          <Text style={{ width: "100%" }}>Login with AAD</Text>
        </Button>

        <a
          // type="dashed"
          // block
          // className={styles.OptionalLoginButton}
          href={LOGIN_ENDPOINT}
        >
          <Text style={{ width: "100%" }}>Login</Text>
        </a>
      </Card>
    </Layout>
  );
};

export default Login;
