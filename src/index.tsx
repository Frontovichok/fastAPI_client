import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { setupStore } from "./store/store";
import { ConfigProvider } from "antd";
import ruRU from "antd/locale/ru_RU";

const store = setupStore();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <ConfigProvider locale={ruRU}>
      <App />
    </ConfigProvider>
  </Provider>
);
