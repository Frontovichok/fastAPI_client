import React, { useState } from "react";
import "./NewProject.css";
import "../../../index.css";
import type { CascaderProps, UploadProps } from "antd";
import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Rate,
  Row,
  Select,
  Tag,
  Upload,
  message,
} from "antd";
import {
  SyncOutlined,
  TagOutlined,
  TeamOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import locale from "antd/es/date-picker/locale/ru_RU";

import "dayjs/locale/ru";

const { RangePicker } = DatePicker;

const { Option } = Select;

interface DataNodeType {
  value: string;
  label: string;
  children?: DataNodeType[];
}

const residences: CascaderProps<DataNodeType>["options"] = [
  {
    value: "zhejiang",
    label: "Zhejiang",
    children: [
      {
        value: "hangzhou",
        label: "Hangzhou",
        children: [
          {
            value: "xihu",
            label: "West Lake",
          },
        ],
      },
    ],
  },
  {
    value: "jiangsu",
    label: "Jiangsu",
    children: [
      {
        value: "nanjing",
        label: "Nanjing",
        children: [
          {
            value: "zhonghuamen",
            label: "Zhong Hua Men",
          },
        ],
      },
    ],
  },
];

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

const NewProject: React.FC = () => {
  const [form] = Form.useForm();
  const [priorityValue, setPriorityValue] = useState(0);

  const onFinish = (values: any) => {
    console.log("Получены значения формы: ", values);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );
  const onUploadChange: UploadProps["onChange"] = (info) => {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  // const suffixSelector = (
  //   <Form.Item name="suffix" noStyle>
  //     <Select style={{ width: 70 }}>
  //       <Option value="USD">$</Option>
  //       <Option value="CNY">¥</Option>
  //     </Select>
  //   </Form.Item>
  // );

  const [autoCompleteResult, setAutoCompleteResult] = useState<string[]>([]);

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="new_project"
      onFinish={onFinish}
      initialValues={{
        residence: ["zhejiang", "hangzhou", "xihu"],
        prefix: "86",
      }}
      style={{ maxWidth: 700, marginLeft: "10px" }}
      scrollToFirstError
    >
      {/* <Form.Item
        name="email"
        label="Почта"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
      >
        <Input />
      </Form.Item> */}

      <Form.Item
        name="name"
        label="Имя проекта"
        rules={[
          {
            required: true,
            message: "Пожалуйста, введите название проекта!",
            whitespace: true,
          },
        ]}
      >
        <Input placeholder="Новый проект" prefix={<TagOutlined />} />
      </Form.Item>

      <Form.Item
        name="parent_component"
        label="Родительский компонент"
        rules={[
          {
            required: false,
            message: "Пожалуйста, выберите родительский компонент из списка!",
            whitespace: true,
          },
        ]}
      >
        <Select placeholder="Компонент">
          <Option value="1">Проект 1</Option>
          <Option value="2">Проект 2</Option>
          <Option value="3">Проект 3</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="type"
        label="Тип сертификации"
        rules={[
          {
            required: true,
            message: "Пожалуйста, введите тип сертификации!",
            whitespace: true,
          },
        ]}
      >
        <Select placeholder="Министерство обороны">
          <Option value="min_oborony">Министерство обороны</Option>
          <Option value="FSTEK">ФСТЭК</Option>
          <Option value="fsb">ФСБ</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="company"
        label="Компания"
        rules={[
          {
            required: true,
            message: "Пожалуйста, введите название организации!",
            whitespace: true,
          },
        ]}
      >
        <Input placeholder="ООО ДААА" />
      </Form.Item>

      <Form.Item
        name="priority"
        label="Приоритет"
        rules={[
          {
            required: true,
            message: "Пожалуйста, введите приоритет!",
          },
        ]}
      >
        <Rate
          value={priorityValue}
          onChange={setPriorityValue}
          character="🥑"
        />
      </Form.Item>

      <Form.Item
        // name="decision"
        label="Решение"
        style={{
          marginBottom: "0",
        }}
      >
        <Form.Item
          name="decision"
          rules={[
            {
              required: true,
              message: "Пожалуйста, введите решение!",
            },
          ]}
          style={{
            display: "inline-block",
            width: "calc(50% - 5px)",
          }}
        >
          <Input placeholder="Решение № 111 от 01.01.2001 г." />
        </Form.Item>
        <span
          style={{
            display: "inline-block",
            width: "10px",
            lineHeight: "12px",
            textAlign: "center",
          }}
        ></span>
        <Form.Item
          style={{
            display: "inline-block",
            width: "calc(50% - 5px)",
          }}
        >
          <Upload
            name="file"
            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
            onChange={onUploadChange}
          >
            <Button icon={<UploadOutlined />}>Загрузить решение</Button>
          </Upload>
        </Form.Item>
      </Form.Item>

      <Form.Item
        name="trust_level"
        label="Уровень доверия"
        style={{
          marginTop: "5px",
        }}
        rules={[
          {
            required: true,
            message: "Пожалуйста, введите уровень доверия (НДВ, НСД, РДВ)!",
            whitespace: true,
          },
        ]}
      >
        <Input placeholder="2:НДВ, 3:РДВ" />
      </Form.Item>

      <Form.Item
        name="experts"
        label="Задействованные эксперты"
        rules={[
          {
            required: true,
            message: "Пожалуйста, введите задействованных экспертов!",
          },
        ]}
      >
        <Select
          mode="multiple"
          allowClear
          style={{ width: "100%" }}
          placeholder="Задействованные эксперты"
          //   onChange={handleChange}
          options={[
            { value: "Курбанов", label: "Курбанов М.Н." },
            { value: "Евдокимова", label: "Евдокимова К.Л." },
            { value: "Харченко", label: "Харченко А.С." },
            { value: "Прошина", label: "Прошина А.О." },
            { value: "Алексеев", label: "Алексеев Е. С." },
          ]}
        />
      </Form.Item>
      {/* <Tag icon={<SyncOutlined spin />} color="processing">
        processing
      </Tag> */}
      <Form.Item
        name="status"
        label="Статус работы"
        // rules={[
        //   {
        //     required: true,
        //     message: "Пожалуйста, укажите статус работы!",
        //     whitespace: true,
        //   },
        // ]}
      >
        <Select placeholder="В работе">
          <Option value="on_work">В работе</Option>
          <Option value="wait_materials">
            Ожидание материалов от разработчика
          </Option>
          <Option value="documentation_analysing">Анализ документации</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Сроки проведния работы"
        rules={[
          {
            required: true,
            message: "Пожалуйста, введите задействованных экспертов!",
          },
        ]}
      >
        <RangePicker locale={locale} />
      </Form.Item>

      <Form.Item
        name="sources"
        label="Исходные тексты"
        // rules={[
        //   {
        //     required: true,
        //     message: "Пожалуйста, загрузите каталог с исходными текстами!",
        //   },
        // ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="distributives"
        label="Дистрибутивы"
        // rules={[
        //   {
        //     required: true,
        //     message: "Пожалуйста, загрузите дистрибутивы!",
        //     whitespace: true,
        //   },
        // ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="documentation"
        label="Документация"
        // rules={[
        //   {
        //     required: true,
        //     message: "Пожалуйста, загрузите документацию!",
        //     whitespace: true,
        //   },
        // ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="reports"
        label="Отчетные материалы"
        rules={[
          {
            required: true,
            message: "Пожалуйста, загрузите отчетные материалы!",
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      {/* <Form.Item
        name="residence"
        label="Habitual Residence"
        rules={[
          {
            type: "array",
            required: true,
            message: "Please select your habitual residence!",
          },
        ]}
      >
        <Cascader options={residences} />
      </Form.Item> */}

      {/* <Form.Item
        name="phone"
        label="Phone Number"
        rules={[{ required: true, message: "Please input your phone number!" }]}
      >
        <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        name="donation"
        label="Donation"
        rules={[{ required: true, message: "Please input donation amount!" }]}
      >
        <InputNumber addonAfter={suffixSelector} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        name="website"
        label="Website"
        rules={[{ required: true, message: "Please input website!" }]}
      >
        <AutoComplete placeholder="website">
          <Input />
        </AutoComplete>
      </Form.Item>

      <Form.Item
        name="intro"
        label="Intro"
        rules={[{ required: true, message: "Please input Intro" }]}
      >
        <Input.TextArea showCount maxLength={100} />
      </Form.Item>

      <Form.Item
        name="gender"
        label="Gender"
        rules={[{ required: true, message: "Please select gender!" }]}
      >
        <Select placeholder="select your gender">
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
          <Option value="other">Other</Option>
        </Select>
      </Form.Item> */}

      {/* <Form.Item
        name="website"
        label="Website"
        rules={[{ required: true, message: "Please input website!" }]}
      >
        <AutoComplete placeholder="website">
          <Input />
        </AutoComplete>
      </Form.Item>

      <Form.Item
        name="intro"
        label="Intro"
        rules={[{ required: true, message: "Please input Intro" }]}
      >
        <Input.TextArea showCount maxLength={100} />
      </Form.Item> */}

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Создать проект
        </Button>
      </Form.Item>
    </Form>
  );
};

export default NewProject;
