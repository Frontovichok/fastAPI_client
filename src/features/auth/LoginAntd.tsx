import "../../index.css";
import "./LoginAntd.css";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Form, Input } from "antd";
import { Link, Navigate } from "react-router-dom";
import Title from "antd/es/typography/Title";
import { useLoginMutation } from "../../store/services/auth";
import { ILogin } from "../../models/ILogin";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "./AuthSlice";

const LoginAntd: React.FC = () => {
  const [login] = useLoginMutation();
  const [user] = useSelector(selectCurrentUser);

  const loginHandle = (values: ILogin) => {
    login({
      username: values.username,
      password: values.password,
    } as ILogin)
      .then(() => {})
      .finally(() => {
        console.log("login finally :)");
      });
  };

  return (
    <>
      {user ? (
        <Navigate to="/" />
      ) : (
        <div className="loginContainer">
          <ConfigProvider
            theme={{
              components: {
                Input: {
                  paddingBlock: 10,
                },
              },
            }}
          >
            <Title level={2} className="loginHeaderText">
              Вход
            </Title>

            <Form
              name="normal_login"
              className="login-form"
              onFinish={loginHandle}
            >
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "Пожалуйста введите email!" },
                ]}
              >
                <Input
                  prefix={<MailOutlined className="site-form-item-icon" />}
                  placeholder="Почта"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Пожалуйста введите пароль!" },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Пароль"
                  allowClear
                />
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
        </div>
      )}
    </>
  );
};

export default LoginAntd;
