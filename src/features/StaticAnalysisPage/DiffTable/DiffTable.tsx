import React from "react";
import { Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import styles from "./DiffTable.module.css";

interface DataType {
  index: string;
  name: string;
  checksum: string;
  section?: string;
}

const setDataStructureBinaryFiles = (data: any) => {
  console.log("length: ", Object.keys(data).length);

  let dataTable: any = [];
  let i = 0;
  for (const item in data) {
    console.log("item: ", item);
    if (
      item === "windows_files" ||
      item === "linux_files" ||
      item === "empty_files"
    ) {
      dataTable.push({
        section:
          item === "windows_files"
            ? "Файлы Windows"
            : item === "linux_files"
            ? "Файлы Linux"
            : "Пустые файлы",
      });
      i = 0;
      data[item].map((file: any) => {
        i++;
        dataTable.push({
          index: i.toString(),
          file: file,
        });
      });
    }
  }
  console.log("diffDataTable: ");
  console.log(dataTable);

  return dataTable;
};
const setDataStructureChecksumsCompare = (diffData: any) => {
  console.log("length: ", Object.keys(diffData).length);

  let diffDataTable: DataType[] = [];
  let i = 0;
  for (const item in diffData) {
    i++;
    diffDataTable.push({
      index: i.toString(),
      name: item,
      checksum: diffData[item],
    });
  }
  console.log("diffDataTable: ");
  console.log(diffDataTable);

  return diffDataTable;
};

const setDataStructureUnusedFilesCompare = (diffData: any) => {
  console.log(diffData);

  let diffDataTable: any = [];
  let i = 0;
  for (const section in diffData as any) {
    diffDataTable.push({ section });
    i = 0;
    for (const item in diffData[section] as any) {
      i++;
      diffDataTable.push({
        index: i.toString(),
        file: item,
        functions: diffData[section][item],
      });
    }
  }
  console.log("diffDataTable: ");
  console.log(diffDataTable);

  return diffDataTable;
};

const DiffTable = (props: any) => {
  console.log("props.diffData: ", props.diffData);
  console.log("props.analyze_request_link: ", props.analyze_request_link);
  let data = [];
  if (
    props.analyze_request_link ===
    "https://127.0.0.1:8001/compare_unused_functions"
  ) {
    data = setDataStructureUnusedFilesCompare(props.diffData);
    return <UnusedFunctionsTable data={data} />;
  }
  if (props.analyze_request_link === "https://127.0.0.1:8001/checksums") {
    data = setDataStructureChecksumsCompare(props.diffData);
    return <ChecksumsTable data={data} />;
  }
  if (props.analyze_request_link === "https://127.0.0.1:8001/analyze_sources") {
    data = setDataStructureBinaryFiles(props.diffData.binary_files);
    return <AnalyzeBinaryFilesTable data={data} />;
  }

  return (
    // <Table
    //   columns={columns}
    //   dataSource={setDataStructure(props.diffData)}
    //   pagination={{ pageSize: 20 }}
    //   rowClassName={styles.rowClass}
    //   bordered
    // />
    <div className={styles.tableContainer}>
      <h1>Упс</h1>
    </div>
  );
};

function UnusedFunctionsTable(props: any) {
  console.log("in UnusedFunctionsTable");
  console.log("props: ", props);
  let section = "";
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.tableHeader}>
            <th className={styles.indexColumn}>Индекс</th>
            <th>Файл</th>
            <th>Функции</th>
          </tr>
        </thead>
        <tbody>
          {[
            props.data.map((item: any) => {
              // console.log(item);
              if (item.section === "new_files") {
                section = "Новые файлы";
              }
              if (item.section === "deleted_files") {
                section = "Удаленные файлы";
              }
              if (item.section === "same_files") {
                section = "Неизмененные файлы";
              }
              if (item.section === "modified_functions") {
                section = "Измененные функции";
              }

              return item.section ? (
                <tr className={`${styles.sectionRow} ${styles.row}`}>
                  <td colSpan={3}>{section}</td>
                </tr>
              ) : (
                <tr
                  className={`${styles.row} 
                  ${section === "Удаленные файлы" && styles.redBg} 
                  ${section === "Новые файлы" && styles.greenBg}`}
                >
                  <td>{item.index}</td>
                  <td>{item.file}</td>
                  <td
                    className={`${styles.row} 
                    ${item.file[1] === "+" && styles.greenBg} 
                    ${item.file[1] === "-" && styles.redBg}`}
                  >
                    {item.functions.map((func: any) => (
                      <div>{func}</div>
                    ))}
                  </td>
                </tr>
              );
            }),
          ]}
        </tbody>
      </table>
    </div>
  );
}

function ChecksumsTable(props: any) {
  console.log("in ChecksumsTable");
  console.log("props: ", props);
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.tableHeader}>
            <th className={styles.indexColumn}>Индекс</th>
            <th>Файл</th>
            <th>КС</th>
          </tr>
        </thead>
        <tbody>
          {[
            props.data.map((item: any) => {
              // console.log(item);
              return (
                <tr
                  className={`${styles.row} ${
                    item.name[1] === "+" && styles.greenBg
                  } ${item.name[1] === "-" && styles.redBg}`}
                >
                  <td>{item.index}</td>
                  <td>{item.name}</td>
                  <td>{item.checksum}</td>
                </tr>
              );
            }),
          ]}
        </tbody>
      </table>
    </div>
  );
}

function AnalyzeBinaryFilesTable(props: any) {
  console.log("in AnalyzeBinaryFilesTable");
  console.log("props: ", props);

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.tableHeader}>
            <th className={styles.indexColumn}>Индекс</th>
            <th>Файл</th>
          </tr>
        </thead>
        <tbody>
          {[
            props.data.map((item: any) => {
              // console.log(item);
              return item.section ? (
                <tr className={`${styles.sectionRow} ${styles.row}`}>
                  <td colSpan={2}>{item.section}</td>
                </tr>
              ) : (
                <tr className={styles.row}>
                  <td>{item.index}</td>
                  <td>{item.file}</td>
                </tr>
              );
            }),
          ]}
        </tbody>
      </table>
    </div>
  );
}

export default DiffTable;
