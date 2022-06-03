import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Typography, Upload } from "antd";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserInfo } from "services/userInfo";
import { changeTitle } from "../../store/title/titleSlice";
import "./Dashboard.less";

function Dashboard() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeTitle("Dashboard"));
  });

  const normFile = (e: any) => {
    if (Array.isArray(e)) return e;
    return e && e.fileList;
  };

  const fileList = [
    {
      uid: "-1",
      name: "xxx.png",
      content: "ahihihihi",
    },
    {
      uid: "-2",
      name: "yyy.png",
    },
  ];

  const onValuesChange = () => {
    console.log("onValuesChange");
    Promise.resolve().then(() => {
      form.submit();
    });
  };

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  const getFormValues = () => {
    console.log("getFormValues", form.getFieldsValue());
  };

  const onUpload = (file, fieldName) => {
    console.log("onUpload");
    const reader = new FileReader();
    reader.addEventListener("load", (event) => {
      const result: string = event?.target?.result as string;
      form.setFieldsValue({
        [fieldName]: result.replace(
          "data:application/json;base64,",
          ""
        ) as string,
      });
    });
    reader.readAsDataURL(file);
    return Promise.resolve(file);
  };
  return (
    <>
      <Form
        form={form}
        name="validate_other"
        onValuesChange={onValuesChange}
        onFinish={() => onFinish(true)}
        onFinishFailed={() => onFinish(false)}
      >
        <Form.Item
          name="upload"
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            action={(file) => onUpload(file, "upload")}
            listType="picture"
            defaultFileList={[...fileList]}
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item label="Dragger" name="description">
          <Form.Item
            name="dragger"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload.Dragger
              name="files"
              maxCount={1}
              action={(file) => onUpload(file, "dragger")}
              defaultFileList={[...fileList]}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>

        <Form.Item name="textinput">
          <Input />
        </Form.Item>
      </Form>

      <button onClick={getFormValues}>getFormValues</button>

      <Button
        type="dashed"
        block
        onClick={async () => {
          const a = await getUserInfo();
          console.log("user-info", a);
        }}
      >
        <Typography.Text style={{ width: "100%" }}>
          Test Call user api
        </Typography.Text>
      </Button>
    </>
  );
}

export default Dashboard;
