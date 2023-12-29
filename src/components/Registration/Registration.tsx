import React, { useState } from "react";
import "../../index.css";
import "./Registration.css";
import type { CascaderProps } from "antd";
import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
} from "antd";
import Title from "antd/es/typography/Title";
import { Link } from "react-router-dom";

const { Option } = Select;

interface DataNodeType {
  value: string;
  label: string;
  children?: DataNodeType[];
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const Registration: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  const suffixSelector = (
    <Form.Item name="suffix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="USD">$</Option>
        <Option value="CNY">¥</Option>
      </Select>
    </Form.Item>
  );

  return (
    <div className="registrationContainer">
      <Title level={2} className="registrationHeaderText">
        Регистрация
      </Title>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
        scrollToFirstError
      >
        <Form.Item
          name="email"
          label="Почта"
          tooltip="@iifmail.ru"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Пожалуйста введите ваш E-mail!",
            },
          ]}
        >
          <Input placeholder="ivanov@iifmail.ru" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Пароль"
          rules={[
            {
              required: true,
              message: "Пожалуйста введтие ваш пароль!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Подтверждение пароля"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Пожалуйста подтвердите ваш пароль!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Пароли не совпадают!"));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="nickname"
          label="ФИО"
          rules={[
            {
              required: true,
              message: "Пожалуйста введите ваше ФИО!",
              whitespace: true,
            },
          ]}
        >
          <Input placeholder="Иванов Иван Иванович" />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Номер телефона"
          rules={[
            {
              required: true,
              message: "Пожалуйста, введите ваш номер телефона!",
            },
          ]}
        >
          <Input
            addonBefore="+7"
            style={{ width: "100%" }}
            placeholder="9100000000"
          />
        </Form.Item>

        <Form.Item
          name="gender"
          label="Пол"
          rules={[{ required: true, message: "Пожалуйста укажите ваш пол!" }]}
        >
          <Select placeholder="Укажите пол">
            <Option value="male">Мужской</Option>
            <Option value="female">Женский</Option>
            <Option value="laminat">Ламинат</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(
                      new Error(
                        "Необходимо ознакомиться с пользовательским соглашением"
                      )
                    ),
            },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>
            Я прочитал пользовательское <a href="">соглашение</a>
          </Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <div className="RegistrationButtonContainer">
            <Link to="/login">У меня уже есть профиль</Link>
            <Button type="primary" htmlType="submit" size="large">
              Создать профиль
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Registration;
