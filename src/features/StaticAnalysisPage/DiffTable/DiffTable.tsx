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
  console.log("diffData: ", diffData);
  console.log("length: ", Object.keys(diffData).length);
  console.log("diffData.new_files: ", diffData["new_files"]);
  console.log(
    "diffData.new_files length: ",
    Object.keys(diffData?.new_files).length
  );
  console.log(
    "diffData.deleted_files length: ",
    Object.keys(diffData?.deleted_files).length
  );
  console.log(
    "diffData.same_files length: ",
    Object.keys(diffData?.same_files).length
  );
  console.log(
    "diffData.modified_functions length: ",
    Object.keys(diffData?.modified_functions).length
  );

  let diffDataTable: any = [];
  let i = 0;
  for (const section in diffData as any) {
    // i++;
    diffDataTable.push({ section });
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
    data = setDataStructureChecksumsCompare(props.diffData);
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
      <h1>Хер вам!</h1>
    </div>
  );
};

function UnusedFunctionsTable(props: any) {
  console.log("in UnusedFunctionsTable");
  console.log("props: ", props);
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
              console.log(item);
              return item.section ? (
                <tr className={`${styles.sectionRow} ${styles.row}`}>
                  <td colSpan={3}>{item.section}</td>
                </tr>
              ) : (
                <tr
                  className={`${styles.row} ${
                    item.file[1] === "+" && styles.greenRow
                  } ${item.file[1] === "-" && styles.redRow}`}
                >
                  <td>{item.index}</td>
                  <td>{item.file}</td>
                  <td>
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
              console.log(item);
              return (
                <tr
                  className={`${styles.row} ${
                    item.name[1] === "+" && styles.greenRow
                  } ${item.name[1] === "-" && styles.redRow}`}
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

export default DiffTable;
