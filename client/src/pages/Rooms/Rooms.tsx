import {
  EditOutlined,
  EllipsisOutlined, HomeOutlined, SettingOutlined
} from "@ant-design/icons";
import { Avatar, Card, Divider, Space } from "antd";
import Meta from "antd/lib/card/Meta";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeTitle } from "../../store/title/titleSlice";

const room_data = [{
  id: 0,
  name: 'Phòng lớn',
  floor: 0,
  people: 2,
  available: true
},
{
  id: 1,
  name: 'Phòng 1',
  floor: 1,
  people: 2,
  available: true
},
{
  id: 2,
  name: 'Phòng 2',
  floor: 1,
  people: 2,
  available: true
},
{
  id: 3,
  name: 'Phòng 3',
  floor: 1,
  people: 2,
  available: true
},
{
  id: 4,
  name: 'Phòng 4',
  floor: 1,
  people: 2,
  available: true
},
{
  id: 5,
  name: 'Phòng 5',
  floor: 2,
  people: 2,
  available: true
},
{
  id: 6,
  name: 'Phòng 6',
  floor: 2,
  people: 2,
  available: true
},
{
  id: 7,
  name: 'Phòng 7',
  floor: 2,
  people: 2,
  available: true
},
{
  id: 8,
  name: 'Phòng 8',
  floor: 2,
  people: 2,
  available: true
},
{
  id: 9,
  name: 'Phòng 9',
  floor: 3,
  people: 2,
  available: true
},
{
  id: 10,
  name: 'Phòng 10',
  floor: 3,
  people: 2,
  available: true
}]

const Rooms = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeTitle("Phòng"));
  });

  return (
    <>
      <Divider orientation="left" orientationMargin="0">
        Tầng trệt
        <button onClick={() => console.log("test", window.env)}>test</button>
      </Divider>

      <Space wrap={true}>
        {room_data.map(room => {
          if (room.floor === 0) return <>
            <Card
              style={{ width: 300 }}
              actions={[
                <SettingOutlined key="setting" />,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
              ]}
            >
              <Meta
                avatar={<HomeOutlined />}
                title={room.name}
                description={<>
                  <p>Số người: ${room.people}</p>
                </>}
              />
            </Card>
          </>
        })}
      </Space>

      <Divider orientation="left" orientationMargin="0">
        Tầng 1
      </Divider>

      <Space wrap={true}>
        {room_data.map(room => {
          if (room.floor === 1) return <>
            <Card
              style={{ width: 300 }}
              actions={[
                <SettingOutlined key="setting" />,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
              ]}
            >
              <Meta
                avatar={<HomeOutlined />}
                title={room.name}
                description={<>
                  <p>Số người: ${room.people}</p>
                </>}
              />
            </Card>
          </>
        })}
      </Space>

      <Divider orientation="left" orientationMargin="0">
        Tầng 2
      </Divider>

      <Space wrap={true}>
        {room_data.map(room => {
          if (room.floor === 2) return <>
            <Card
              style={{ width: 300 }}
              actions={[
                <SettingOutlined key="setting" />,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
              ]}
            >
              <Meta
                avatar={<HomeOutlined />}
                title={room.name}
                description={<>
                  <p>Số người: ${room.people}</p>
                </>}
              />
            </Card>
          </>
        })}
      </Space>

      <Divider orientation="left" orientationMargin="0">
        Tầng 3
      </Divider>

      <Space wrap={true}>
        {room_data.map(room => {
          if (room.floor === 3) return <>
            <Card
              style={{ width: 300 }}
              actions={[
                <SettingOutlined key="setting" />,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
              ]}
            >
              <Meta
                avatar={<HomeOutlined />}
                title={room.name}
                description={<>
                  <p>Số người: ${room.people}</p>
                </>}
              />
            </Card>
          </>
        })}
      </Space>
    </>
  );
}

export default Rooms;
