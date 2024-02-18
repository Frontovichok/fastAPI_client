import React, { useEffect, useState } from "react";
import "../../index.css";
import "./LoginAntd.css";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Checkbox, ConfigProvider, Form, Input } from "antd";
import { Link } from "react-router-dom";
import Title from "antd/es/typography/Title";
import axios from "axios";
import { CookiesProvider, useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const LoginAntd: React.FC = () => {
  interface User {
    email: string;
    password: string;
  }

  type AutResponse = {
    bonds: string;
  };

  const navigate = useNavigate();

  // const [authRequestData, setAuthRequestData] = useState<User>();
  const [authResponse, setAuthResponse] = useState();
  const [error, setError] = useState(false);
  const [isAuthorized, setAuthorized] = useState(false);
  // const [authUser, setAuthUser] = useState("");

  // const authRequestOptions = {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: {
  //     username: authRequestData?.email,
  //     password: authRequestData?.password,
  //   },
  // };

  useEffect(() => {
    //will run at the component loading because array is empty, see second argument of useEffect
    console.log("useEffect isAuthorized:", isAuthorized);

    if (isAuthorized) {
      navigate("/");
    }
    checkAuthorized();
  }, [isAuthorized]);

  // useEffect(() => {
  //   console.log("useEffect [] isAuthorized:", isAuthorized);

  //   if (isAuthorized) {
  //     navigate("/");
  //   }
  //   checkAuthorized();
  // }, []);

  const checkAuthorized = async () => {
    try {
      const { headers, data } = await axios.get("/current_user");
      console.log("success, user authorized: ", data);
      setAuthorized(true);
      // setAuthUser(data);
    } catch (error) {
      setAuthorized(false);
      // setAuthUser("");
      if (axios.isAxiosError(error)) {
        console.log("error: ", error);
        return error.message;
      } else {
        console.log("unexpected error: ", error);
        return "An unexpected error";
      }
    }
  };

  const auth = async (formValues: any) => {
    console.log("formValues: ", formValues);
    try {
      const { headers, data, status } = await axios.post(
        "/auth/jwt/login",
        {
          username: formValues?.email,
          password: formValues?.password,
        },
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          withCredentials: true,
        }
      );
      checkAuthorized();
      console.log("data ", data);
      console.log("headers ", headers);
    } catch (error) {
      checkAuthorized();
      if (axios.isAxiosError(error)) {
        console.log("error: ", error);
        console.log("error message: ", error.message);
        // 👇️ error: AxiosError<any, any>
        return error.message;
      } else {
        console.log("unexpected error: ", error);
        return "An unexpected error occurred";
      }
    }
  };

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
    // setAuthRequestData(values);
    auth(values);
  };

  return (
    <div className="loginContainer">
      <ConfigProvider
        theme={{
          components: {
            Input: {
              /* here is your component tokens */
              paddingBlock: 10,
            },
          },
        }}
      >
        <Title level={2} className="loginHeaderText">
          Вход
        </Title>
        {isAuthorized ? (
          <div>
            <p>Авторизован!</p>
          </div>
        ) : (
          <p>Не авторизован!</p>
        )}
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Пожалуйста введите email!" }]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Почта"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Пожалуйста введите пароль!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Пароль"
              allowClear
            />
          </Form.Item>
          <Form.Item>
            <div className="rememberMeContainer">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Запомнить меня</Checkbox>
              </Form.Item>

              <a className="login-form-forgot" href="">
                Восстановить пароль
              </a>
            </div>
          </Form.Item>

          <Form.Item>
            <div className="loginButtonContainer">
              <Link to="/register">Зарегистрироваться</Link>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                size="large"
              >
                Войти
              </Button>
            </div>
          </Form.Item>
        </Form>
      </ConfigProvider>
      {/* <Button onClick={logout}>Выйти</Button> */}
    </div>
  );
};

export default LoginAntd;
