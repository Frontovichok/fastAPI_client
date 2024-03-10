import React, { useState } from "react";
import "../../index.css";
import {
  ConfigProvider,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Table,
  Typography,
} from "antd";

interface Item {
  key: string;
  name: string;
  sertificationType: string;
  address: string;
  company: string;
  trustLevel: string;
  experts: string;
  priority: string;
  sourceDirectory: string;
  distribDirectory: string;
  documentationDirectory: string;
  status: string;
  reportsDirectory: string;
  mainComponentID: string;
  subComponentsID: string;
  description: string;
}

const originData: Item[] = [];
for (let i = 0; i < 1; i++) {
  originData.push({
    key: i.toString(),
    name: `Project11 ${i}`,
    sertificationType: "Мин Обороны",
    address: `Москва, ул. Фрунзенская, д. ${i}`,
    company: "ИнфоТеКс",
    trustLevel: "НДВ:2 НСД:2А",
    experts: "Курбанов, Алексеев",
    priority: "5/5",
    sourceDirectory: "D:/Заказчики...",
    distribDirectory: "D:/Заказчики...",
    documentationDirectory: "D:/Заказчики...",
    status: "В работе, формирование АО",
    reportsDirectory: "D:/Заказчики...",
    mainComponentID: "1",
    subComponentsID: "-",
    description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
  });
}
interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text";
  record: Item;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const App: React.FC = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record: Item) => record.key === editingKey;

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({ id: "", name: "", age: "", address: "", ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const handleDelete = (key: React.Key) => {
    const newData = data.filter((item) => item.key !== key);
    setData(newData);
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item;

      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "id",
      dataIndex: "key",
      width: 60,
      editable: false,
      fixed: "left" as "left",
      sorter: (a: any, b: any) => a.key - b.key,
    },
    {
      title: "Проект",
      dataIndex: "name",
      width: 250,
      editable: true,
      fixed: "left" as "left",
      render: (text: string) => <a href="/project">{text}</a>,
    },
    {
      title: "Тип сертификации",
      dataIndex: "sertificationType",
      width: 150,
      editable: true,
    },
    {
      title: "Компания",
      dataIndex: "company",
      width: 150,
      editable: true,
    },
    {
      title: "Адрес компании",
      dataIndex: "address",
      width: 150,
      editable: true,
    },
    {
      title: "Уровень доверия",
      dataIndex: "trustLevel",
      width: 150,
      editable: true,
    },
    {
      title: "Эксперты",
      dataIndex: "experts",
      width: 150,
      editable: true,
    },
    {
      title: "Приоритет",
      dataIndex: "priority",
      width: 150,
      editable: true,
    },
    {
      title: "Исходные тексты",
      dataIndex: "sourceDirectory",
      width: 150,
      editable: true,
    },
    {
      title: "Дистртибутивы",
      dataIndex: "distribDirectory",
      width: 150,
      editable: true,
    },
    {
      title: "Документация",
      dataIndex: "documentationDirectory",
      width: 150,
      editable: true,
    },
    {
      title: "Состояние",
      dataIndex: "status",
      width: 250,
      editable: true,
    },
    {
      title: "Отчеты",
      dataIndex: "reportsDirectory",
      width: 150,
      editable: true,
    },
    {
      title: "Главный компонент",
      dataIndex: "mainComponentID",
      width: 150,
      editable: true,
    },
    {
      title: "Подкомпонент",
      dataIndex: "subComponentsID",
      width: 150,
      editable: true,
    },
    {
      title: "Действие",
      dataIndex: "operation",
      width: 150,
      fixed: "right" as "right",
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return (
          <>
            {editable ? (
              <span>
                <Typography
                  onClick={() => save(record.key)}
                  style={{ marginRight: 8 }}
                >
                  Save
                </Typography>
                <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                  <button>Cancel</button>
                </Popconfirm>
              </span>
            ) : (
              <Typography.Link
                disabled={editingKey !== ""}
                onClick={() => edit(record)}
              >
                Edit
              </Typography.Link>
            )}
            <span> </span>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete(record.key)}
            >
              <button>Delete</button>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  // const onChange: TableProps<Item>["onChange"] = (
  //   pagination,
  //   filters,
  //   sorter,
  //   extra
  // ) => {
  //   console.log("params", pagination, filters, sorter, extra);
  // };

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "rgb(173 221 197)",
            },
          },
        }}
      >
        <Form form={form} component={false}>
          <Table
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            bordered
            dataSource={data}
            scroll={{ x: "100vw", y: "60vh" }}
            columns={mergedColumns}
            rowClassName="editable-row"
            expandable={{
              expandedRowRender: (record) => (
                <p style={{ margin: 0 }}>{record.description}</p>
              ),
              rowExpandable: (record) => record.name !== "Not Expandable",
            }}

            // onChange={onChange}
            // pagination={{
            //   onChange: cancel,
            // }}
            // scroll={scroll}
          />
        </Form>
      </ConfigProvider>
    </>
  );
};

export default App;
