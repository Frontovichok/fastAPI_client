import React from "react";
import "./App.css";
import Board from "./components/Board";
import Projects from "./components/Projects/Projects";
import Project from "./components/Project/Project";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="App">
        Hi
        <div className="container">
          <Projects />
        </div>
      </div>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "project/:projectId",
    element: <Project />,
  },
]);

function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
