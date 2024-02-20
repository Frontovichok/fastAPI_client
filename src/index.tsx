import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AppTest from "./AppTest";
import { Provider } from "react-redux";
import { setupStore } from "./store/store";

const store = setupStore();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <AppTest />
  </Provider>
);
