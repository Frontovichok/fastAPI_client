import React from "react";
import "../../index.css";
import "./LoginAntd.css";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Checkbox, ConfigProvider, Form, Input } from "antd";
import { Link } from "react-router-dom";
import Title from "antd/es/typography/Title";

const LoginAntd: React.FC = () => {
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
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
    </div>
  );
};

export default LoginAntd;
