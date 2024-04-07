import "./App.css";
import Projects from "./components/Projects/Projects";
import Project from "./components/Project/Project";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import MainLayout from "./components/MainLayout/MainLayout";
import Task from "./components/Task";
import LoginAntd from "./features/auth/LoginAntd";
import NewProject from "./components/Projects/NewProject/NewProject";
import PrivateRoute from "./utils/PrivateRoute";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "./features/auth/AuthSlice";
import { useLazyUserDataQuery } from "./store/services/auth";
import { Spin } from "antd";
import ProfilePage from "./features/ProfilePage/ProfilePage";
import StaticAnalysisPage from "./features/StaticAnalysisPage/StaticAnalysisPage";

function App() {
  // const navigate = useNavigate();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <PrivateRoute />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <MainLayout />,
          errorElement: <ErrorPage />,
          children: [
            {
              path: "/",
              element: <Projects />,
              errorElement: <ErrorPage />,
            },
            {
              path: "/profile",
              element: <ProfilePage />,
              errorElement: <ErrorPage />,
            },
            {
              path: "/new_project",
              element: <NewProject />,
              errorElement: <ErrorPage />,
            },
            {
              path: "/project/:projectId",
              element: <Project />,
              errorElement: <ErrorPage />,
            },
            {
              path: "/static_analysis",
              element: <StaticAnalysisPage />,
              errorElement: <ErrorPage />,
            },
            {
              path: "/dynamic_analysis",
              element: <StaticAnalysisPage />,
              errorElement: <ErrorPage />,
            },
          ],
        },
      ],
    },
    {
      path: "/login",
      element: <LoginAntd />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/task",
      element: <Task />,
      errorElement: <ErrorPage />,
    },
  ]);

  const [getUserData] = useLazyUserDataQuery();
  let [user, pending] = useSelector(selectCurrentUser);
  console.log("user", user);
  console.log("pending", pending);

  const checkAuthData = () => {
    console.log("check auth data");
    getUserData()
      .unwrap()
      .then((data: any) => {
        console.log("PrivateRoute data: ", data);
      })
      .catch(() => {
        console.log("PrivateRoute catch");
      })
      .finally(() => {
        console.log("PrivateRoute finally");
      });
  };
  if (user === null && pending === false) {
    checkAuthData();
  }

  return (
    <>
      {pending ? (
        <Spin tip="Loading" size="large" style={{ marginTop: "100px" }}>
          <div className="content" />
        </Spin>
      ) : (
        <RouterProvider router={router} />
      )}
    </>
  );
}

export default App;
