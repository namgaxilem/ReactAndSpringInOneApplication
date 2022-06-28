import { useAuth } from "context/auth";
import DeployFlow from "pages/DeployFlow/DeployFlow";
import Initializer from "pages/Initializer/Initializer";
import Login from "pages/Login/Login";
import RouteWithSidenav from "pages/RouteWithSidenav/RouteWithSidenav";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./App.less";
import { useIdleTimer } from "react-idle-timer";
import { getUserInfo } from "services/userInfo";
import { Button, Modal } from "antd";

const NotFoundRedirect = () => <Navigate to="/" />;

interface CustomRoute {
  path?: string;
  children?: React.ReactNode;
  exact?: boolean;
  element?: JSX.Element;
}

const privateRoutes: CustomRoute[] = [
  { path: "/catalog/deploy-flow", exact: true, element: <DeployFlow /> },
  { path: "/environments/initializer", exact: true, element: <Initializer /> },
  { path: "/*", element: <RouteWithSidenav /> },
];

const publicRoutes: CustomRoute[] = [
  {
    path: "/*",
    exact: true,
    element: (
      <Navigate
        to={{ pathname: "/login" }}
        state={{ prev: window.location.pathname }}
      />
    ),
  },
  { path: "/login", exact: true, element: <Login /> },
];

const IdlePopup = ({ isModalVisible, handleStayClick }) => {
  const [timeoutSecond, setTimeoutSecond] = useState(60);

  useEffect(() => {
    const timerId = setInterval(
      () => setTimeoutSecond(timeoutSecond - 1),
      1000
    );

    if (timeoutSecond === 0) {
      clearInterval(timerId);
      window.location.href = '/logout'
    }

    return () => {
      clearInterval(timerId);
    };
  }, [timeoutSecond]);

  useEffect(() => {
    console.log(":isModalVisible")
    setTimeoutSecond(60)
  }, [isModalVisible])

  return (
    <>
      {isModalVisible && (
        <Modal
          title="You have been idle!"
          visible={isModalVisible}
          footer={
            <Button type="primary" onClick={handleStayClick}>
              Stay
            </Button>
          }
        >
          <p>You will be logout in ... {timeoutSecond}</p>
        </Modal>
      )}
    </>
  );
};

const App = () => {
  const { user } = useAuth();
  const [isIdleModalVisible, setIsIdleModalVisible] = useState(false);

  const handleStayClick = () => {
    setIsIdleModalVisible(false);
  };

  const handleOnIdle = () => {
    console.log("user is idle, last active is: " + getLastActiveTime());
    if (window.location.pathname === "/login") return;
    setIsIdleModalVisible(true);
  };

  const handleOnActive = () => {
    console.log("user is active, time remaining: " + getRemainingTime());
  };

  const handleOnAction = (event) => {
    console.log("user did something. " + event);
  };

  const { getRemainingTime, getLastActiveTime } = useIdleTimer({
    timeout: 1000 * 60 * 10,
    onIdle: handleOnIdle,
    onActive: handleOnActive,
    onAction: handleOnAction,
    debounce: 500,
    events: [
      "click",
      "focus",
      "focusin",
      "focusout",
      "input",
      "keydown",
      "keypress",
      "keyup",
      "mousedown",
      "mousewheel",
      "scroll",
    ],
  });

  return (
    <BrowserRouter>
      {isIdleModalVisible && <IdlePopup
        isModalVisible={isIdleModalVisible}
        handleStayClick={handleStayClick}
      />}
      <Routes>
        {[
          ...(user ? privateRoutes : publicRoutes),
          { component: NotFoundRedirect },
        ].map((route, index) => (
          <Route key={index} {...route} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
