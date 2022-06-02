import { useAuth } from "context/auth";
import DeployFlow from "pages/DeployFlow/DeployFlow";
import Initializer from "pages/Initializer/Initializer";
import Login from "pages/Login/Login";
import RouteWithSidenav from "pages/RouteWithSidenav/RouteWithSidenav";
import React, { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.less";

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
  { path: "/*", exact: true, element: <Navigate to={{ pathname: '/login', }} state={{ prev: window.location.pathname }} /> },
  { path: "/login", exact: true, element: <Login /> },
];

const App = () => {
  const { isStoredToken, acquireAccessToken, restore } = useAuth();

  useEffect(() => {
    restore()
    acquireAccessToken()
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        {[
          ...(isStoredToken() ? privateRoutes : publicRoutes),
          { component: NotFoundRedirect }
        ].map((route, index) => <Route key={index} {...route} />)}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
