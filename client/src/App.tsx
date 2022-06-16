import { useAuth } from "context/auth";
import DeployFlow from "pages/DeployFlow/DeployFlow";
import Initializer from "pages/Initializer/Initializer";
import Login from "pages/Login/Login";
import RouteWithSidenav from "pages/RouteWithSidenav/RouteWithSidenav";
import React, { useEffect } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./App.less";
import { useIdleTimer } from 'react-idle-timer'

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

const App = () => {
  const { user } = useAuth();

  const handleOnIdle = () => {
    console.log('user is idle', event)
    console.log('last active', getLastActiveTime())
  }

  const handleOnActive = event => {
    console.log('user is active', event)
    console.log('time remaining', getRemainingTime())
  }

  const handleOnAction = event => {
    console.log('user did something', event)
  }

  const { getRemainingTime, getLastActiveTime } = useIdleTimer({
    timeout: 1000 * 60 * 15,
    onIdle: handleOnIdle,
    onActive: handleOnActive,
    onAction: handleOnAction,
    debounce: 500
  })

  return (
    <BrowserRouter>
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
