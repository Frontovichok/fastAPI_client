import React, { useRef, useState } from "react";
import "../../index.css";
import "./Projects.css";
import { cloneDeep, find } from "lodash";
import * as _ from "lodash";
import { PlusOutlined, SearchOutlined, SyncOutlined } from "@ant-design/icons";
import {
  ConfigProvider,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Rate,
  Table,
  Typography,
  Button,
  Space,
  Tag,
} from "antd";
import type {
  ColumnType,
  ColumnGroupType,
  ColumnsType,
  TableProps,
} from "antd/es/table";
import type { InputRef } from "antd";
import { Link, NavLink } from "react-router-dom";
import type { FilterConfirmProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import Title from "antd/es/typography/Title";

interface Item {
  key: string;
  name: string;
  sertificationType: string;
  address: string;
  company: string;
  trustLevel: string;
  decision: string;
  experts: string;
  priority: string;
  sourceDirectory: string;
  distribDirectory: string;
  documentationDirectory: string;
  status: string[];
  reportsDirectory: string;
  mainComponentID: string;
  subComponentsID: string;
  description: string;
  children?: Item[];
}
type ItemIndex = keyof Item;

const originData: Item[] = [];
for (let i = 0; i < 11; i++) {
  originData.push({
    key: i.toString(),
    name: `Проект ${i}`,
    sertificationType: "Мин обороны",
    address: `Москва, ул. Фрунзенская, д. ${i}`,
    company: "ИнфоСеКс",
    trustLevel: "НДВ:2 НСД:2А",
    decision: `№${i} от 100.100.2010`,
    experts: "Курбанов, Алексеев",
    priority: `${Math.floor(Math.random() * 6)}`,
    sourceDirectory: "D:/Заказчики...",
    distribDirectory: "D:/Заказчики...",
    documentationDirectory: "D:/Заказчики...",
    status: ["В работе", "Формирование АО"],
    reportsDirectory: "D:/Заказчики...",
    mainComponentID: "1",
    subComponentsID: "-",
    description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
    children: [
      {
        key: `${i}.${i}`,
        name: `Проект ${i}.${i}`,
        sertificationType: "Мин обороныыыы",
        address: `Москва, ул. Фрунзенская, д. 2.1`,
        company: "ИнфоТеКс",
        trustLevel: "НДВ:2 НСД:2А",
        decision: `№2.1 от 100.100.2010`,
        experts: "Курбанов, Алексеев",
        priority: `${Math.floor(Math.random() * 6)}`,
        sourceDirectory: "D:/Заказчики...",
        distribDirectory: "D:/Заказчики...",
        documentationDirectory: "D:/Заказчики...",
        status: ["В работе", "Формирование АО"],
        reportsDirectory: "D:/Заказчики...",
        mainComponentID: "1",
        subComponentsID: "-",
        description: `My name is John Brown, I am 2.12 years old, living in New York No. 2.1 Lake Park.`,
        children: [
          {
            key: `${i}.${i}.${i}`,
            name: `Проект ${i}.${i}.${i}`,
            sertificationType: "Мин обороныыыы",
            address: `Москва, ул. Фрунзенская, д. 2.1`,
            company: "ИнфоТеКс",
            trustLevel: "НДВ:2 НСД:2А",
            decision: `№2.1 от 100.100.2010`,
            experts: "Курбанов, Алексеев",
            priority: `${Math.floor(Math.random() * 6)}`,
            sourceDirectory: "D:/Заказчики...",
            distribDirectory: "D:/Заказчики...",
            documentationDirectory: "D:/Заказчики...",
            status: ["В работе", "Формирование АО"],
            reportsDirectory: "D:/Заказчики...",
            mainComponentID: "1",
            subComponentsID: "-",
            description: `My name is John Brown, I am 2.12 years old, living in New York No. 2.1 Lake Park.`,
          },
        ],
      },
    ],
  });
}

originData.push({
  key: "222",
  name: `Проект 222`,
  sertificationType: "ФСТЭК",
  address: `Москва, ул. Фрунзенская, д. 222`,
  company: "ИнфоКеКс",
  trustLevel: "НДВ:2 НСД:2А",
  decision: `№222 от 100.100.2010`,
  experts: "Курбанов, Алексеев",
  priority: `${Math.floor(Math.random() * 5)}`,
  sourceDirectory: "D:/Заказчики...",
  distribDirectory: "D:/Заказчики...",
  documentationDirectory: "D:/Заказчики...",
  status: ["В работе", "Формирование АО"],
  reportsDirectory: "D:/Заказчики...",
  mainComponentID: "1",
  subComponentsID: "-",
  description: `My name is John Brown, I am 2222 years old, living in New York No. 222 Lake Park.`,
});

originData[0].children?.push({
  key: "0.1",
  name: `Project 222`,
  sertificationType: "ФСТЭК",
  address: `Москва, ул. Фрунзенская, д. 222`,
  company: "ИнфоЗеКс",
  trustLevel: "ВДВ:2 ЖДВ:2А",
  decision: `№222 от 100.100.2010`,
  experts: "Курбанов, Алексеев",
  priority: `${Math.floor(Math.random() * 5)}`,
  sourceDirectory: "D:/Заказчики...",
  distribDirectory: "D:/Заказчики...",
  documentationDirectory: "D:/Заказчики...",
  status: ["В работе", "Формирование АО"],
  reportsDirectory: "D:/Заказчики...",
  mainComponentID: "1",
  subComponentsID: "-",
  description: `My name is John Brown, I am 2222 years old, living in New York No. 222 Lake Park.`,
});

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
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const isEditing = (record: Item) => record.key === editingKey;

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    console.log("record:::: ", record);
    form.setFieldsValue({ ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const filterDataTest = (data: Item[], key: React.Key) => {
    const newDataTest = cloneDeep(data).filter((item) => item.key !== key);
    newDataTest.forEach((item, i) => {
      if (item.children) {
        item.children = filterDataTest([...item.children], key);
      }
      if (item.children?.length === 0) {
        delete item.children;
      }
    });
    return newDataTest;
  };

  const handleDelete = (key: React.Key) => {
    console.log("data: ", data);
    console.log("key: ", key);

    const newDataTest = filterDataTest([...data], key);

    console.log("--newDataTest is--: ", newDataTest);

    // const newData = data.filter((item) => item.key !== key);
    // setData(newData);
    setData(newDataTest);
  };

  const saveChangesTest = (data: Item[], key: React.Key, row: Item) => {
    // const row = (await form.validateFields()) as Item;

    const newData = cloneDeep(data);
    const index = newData.findIndex((item) => key === item.key);
    if (index > -1) {
      const item = newData[index];
      console.log("+++++++++row.status: ", row.status);
      console.log("typeof row.status: ", typeof row.status);

      // let status = row.status;
      if (typeof row.status === "string") {
        row.status = String(row.status).split(",");
      }
      // row.status = "1,2,3".split(",");
      newData.splice(index, 1, { ...item, ...row });
      // return newData;
    }
    // else {
    //   newData.push(row);
    // }

    // изменяем подпроект (если есть свойство children)
    newData.forEach((item) => {
      if (item.children) {
        item.children = saveChangesTest([...item.children], key, row);
      }
    });

    return newData;
  };

  const save = async (key: React.Key) => {
    try {
      // пока не понял что это
      const row = (await form.validateFields()) as Item;

      //-----
      const newData = [...data];

      let newData2 = cloneDeep(newData);
      console.log("====================before: ", newData2);
      newData2 = saveChangesTest(newData2, key, row);
      console.log("after: ", newData2);

      // const index = newData.findIndex((item) => key === item.key);
      // if (index > -1) {
      //   const item = newData[index];
      //   newData.splice(index, 1, {
      //     ...item,
      //     ...row,
      //   });
      setData(newData2);
      //-----

      setEditingKey("");
      // } else {
      //   newData.push(row);
      //   setData(newData);
      // setEditingKey("");
      // }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: ItemIndex
  ) => {
    console.log("selectedKeys: ", selectedKeys);
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const searchTest = (value: any, record: any, dataIndex: ItemIndex) => {
    console.log("-----------");
    console.log("value: ", value);
    console.log("record: ", record);
    console.log("dataIndex: ", dataIndex);
    console.log("record[dataIndex]: ", record[dataIndex]);
    console.log("-----------");

    let isIncludes = record[dataIndex]
      .toString()
      .toLowerCase()
      .includes((value as string).toLowerCase());
    let isSubIncludes = false;

    if (!isIncludes && record.children && record.children.length > 0) {
      // console.log("record.children: ", record.children);
      isSubIncludes = record.children.find((subRecord: any) => {
        // console.log("subRecord[dataIndex]: ", subRecord[dataIndex]);
        // console.log("value: ", value);

        // let isSubRecordInclude = subRecord[dataIndex]
        //   .toString()
        //   .toLowerCase()
        //   .includes((value as string).toLowerCase());

        let isSubRecordInclude = searchTest(value, subRecord, dataIndex);

        // console.log("isSubRecordUnclude: ", isSubRecordUnclude);

        // let lodashFind = _.find(record, (location) =>
        //   location[dataIndex]
        //     .toString()
        //     .toLowerCase()

        //     .includes((value as string).toLowerCase())
        // );

        // console.log("lodashFind: ", lodashFind);

        return isSubRecordInclude;
      });
    }
    return isIncludes || isSubIncludes;
  };

  const getColumnSearchProps = (dataIndex: ItemIndex): ColumnType<Item> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Поиск`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            // icon={<span>Search</span>}
            size="small"
            style={{ width: 90 }}
          >
            Найти
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Сбросить
          </Button>
          {/* <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Фильтр
          </Button> */}
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Закрыть
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "yellow" : "white" }} />
    ),
    onFilter: (value: any, record: any) => {
      let isIncludes = searchTest(value, record, dataIndex);
      return isIncludes;
    },
    onFilterDropdownOpenChange: (visible: any) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text: any) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "№",
      dataIndex: "key",
      width: 150,
      editable: false,
      fixed: "left" as "left",
      sorter: (a: any, b: any) => a.key - b.key,
    },
    {
      title: "Проект",
      dataIndex: "name",
      width: 200,
      editable: true,
      ...getColumnSearchProps("name"),
      fixed: "left" as "left",
      render: (text: string, index: any, record: number) => (
        <Link to={`/project/${record}`}>{text}</Link>
      ),
    },
    // Table.EXPAND_COLUMN,
    {
      title: "Тип сертификации",
      dataIndex: "sertificationType",
      width: 200,
      editable: true,
      onFilter: (value: any, record: Item) => {
        let isIncludes = searchTest(value, record, "sertificationType");
        return isIncludes;
        // return record.sertificationType.startsWith(value);
      },
      // filterSearch: true,
      filters: [
        {
          text: "ФСТЭК",
          value: "ФСТЭК",
        },
        {
          text: "Мин обороны",
          value: "Мин обороны",
        },
        {
          text: "ФСБ",
          value: "ФСБ",
        },
      ],
    },
    {
      title: "Состояние",
      dataIndex: "status",
      width: 250,
      editable: true,
      // render: (text: string, index: any, record: number) => (
      //   <Tag color="cyan">{text}</Tag>
      // ),
      render: (texts: string[]) =>
        texts.map((text) => <Tag color="cyan">{text}</Tag>),
    },
    {
      title: "Компания",
      dataIndex: "company",
      width: 200,
      editable: true,
      ...getColumnSearchProps("company"),
    },
    {
      title: "Приоритет",
      dataIndex: "priority",
      width: 220,
      editable: true,
      onFilter: (value: any, record: Item) => {
        let isIncludes = searchTest(value, record, "priority");
        return isIncludes;
        // return record.sertificationType.startsWith(value);
      },
      // filterSearch: true,
      filters: [
        {
          text: "5",
          value: "5",
        },
        {
          text: "4",
          value: "4",
        },
        {
          text: "3",
          value: "3",
        },
        {
          text: "2",
          value: "2",
        },
        {
          text: "1",
          value: "1",
        },
        {
          text: "0",
          value: "0",
        },
      ],
      render: (text: string, index: any, record: number) => (
        <Rate defaultValue={parseInt(text)} character="🥑" disabled />
      ),
    },

    {
      title: "Уровень доверия",
      dataIndex: "trustLevel",
      width: 150,
      editable: true,
      ...getColumnSearchProps("trustLevel"),
    },

    {
      title: "Решение",
      dataIndex: "decision",
      width: 150,
      editable: true,
      ...getColumnSearchProps("decision"),
    },
    {
      title: "Эксперты",
      dataIndex: "experts",
      width: 150,
      editable: true,
      // filters: [
      //   { text: "Магомед", value: "Magomed" },
      //   { text: "Евгений", value: "Evgenius" },
      // ],
      // filterMode: "tree",
      // filterSearch: true,
      // onFilter: (value: string, record: Item) => record.experts.includes(value),
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
      title: "Действие",
      dataIndex: "operation",
      width: 200,
      fixed: "right" as "right",
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return (
          <>
            {editable ? (
              <span>
                <Typography.Link
                  onClick={() => save(record.key)}
                  style={{ marginRight: 8 }}
                >
                  Сохранить
                </Typography.Link>
                <Popconfirm
                  title="Подтверждаете отмену?"
                  onConfirm={cancel}
                  okText="Да"
                  cancelText="Отмена"
                >
                  <a>Отменить</a>
                </Popconfirm>
              </span>
            ) : (
              <Typography.Link
                disabled={editingKey !== ""}
                onClick={() => edit(record)}
              >
                Изменить
              </Typography.Link>
            )}
            <p> </p>
            <Space>
              <Popconfirm
                title="Подтверждаете перемещение в архив?"
                // onConfirm={() => handleDelete(record.key)}
                okText="Да"
                cancelText="Отмена"
              >
                <a>В архив</a>
              </Popconfirm>
              <Popconfirm
                title="Подтверждаете удаление?"
                onConfirm={() => handleDelete(record.key)}
                okText="Да"
                cancelText="Отмена"
              >
                <a>Удалить</a>
              </Popconfirm>
            </Space>
          </>
        );
      },
    },
  ];

  const onChange: TableProps<Item>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const mergedColumns = columns.map((col: any) => {
    console.log(col);
    // if (!col.key) {
    //   return col;
    // }

    if ("editable" in col) {
      return {
        ...col,
        onCell: (record: Item) => {
          console.log("record: ", record);
          return {
            record,
            inputType: "text",
            dataIndex: col["dataIndex"],
            title: col.title,
            editing: isEditing(record),
          };
        },
      };
    }
    return col;
  });

  return (
    <>
      <Title level={2} className="projectsHeaderText">
        Активные проекты
      </Title>
      <NavLink to="/new_project">
        <Button className="newProject" type="primary" icon={<PlusOutlined />}>
          Создать проект
        </Button>
      </NavLink>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "rgb(18 58 94)",
              headerColor: "white",
              // rowExpandedBg: "rgb(173 221 197)",
              // borderColor: "black",
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
            scroll={{ x: "100vw", y: "calc(65vh)" }}
            columns={mergedColumns}
            rowClassName="editable-row"
            // expandable={{
            //   expandedRowRender: (record) => (
            //     <p style={{ margin: 0 }}>{record.description}</p>
            //   ),
            //   rowExpandable: (record) => record.name !== "Not Expandable",
            // }}
            pagination={{
              showSizeChanger: true,
              pageSizeOptions: [5, 10, 15, 20],
              defaultPageSize: 5,
              onShowSizeChange: function (current, size) {
                console.log("size changed:", current, " ", size);
              },
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
