import React from "react";
import "./App.css";
import Board from "./components/Board";
import Projects from "./components/Projects/Projects";
import Project from "./components/Project/Project";
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import { SearchOutlined } from "@ant-design/icons";
import MainLayout from "./components/MainLayout/MainLayout";
import Task from "./components/Task";
import Login from "./components/Login/Login";
import LoginAntd from "./components/Login/LoginAntd";
import RegisterAntd from "./components/Registration/Registration";
import NewProject from "./components/Projects/NewProject/NewProject";
import { ConfigProvider } from "antd";
import ruRU from "antd/locale/ru_RU";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="App">
        <MainLayout />
        {/* <div className="container">
          <Projects />
        </div> */}
      </div>
    ),
    errorElement: <ErrorPage />,
  },
  // {
  //   path: "project/:projectId",
  //   element: <Project />,
  // },
]);

function App() {
  return (
    <React.StrictMode>
      {/* <RouterProvider router={router} />
       */}

      <ConfigProvider locale={ruRU}>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<MainLayout />} />
            <Route path="/Login" element={<LoginAntd />} />
            <Route path="/Register" element={<RegisterAntd />} />
            <Route path="/task" element={<Task />} />
          </Routes>
        </BrowserRouter>
      </ConfigProvider>
    </React.StrictMode>
  );
}

export default App;
