import { Chart } from "react-google-charts";
import styles from "./BinaryAnalysisDataCharts.module.css";

const options = {
  title: "Статистика по языкам программирования",
};

export default function BinaryAnalysisDataCharts(props: any) {
  console.log("charts diffData: ", props.diffData);
  let languagesData = (({ binary_files, ...o }) => o)(props.diffData);
  let languagesDataArray = [["Language", "Number of files"]];
  for (let lang in languagesData) {
    languagesDataArray.push([lang, languagesData[lang]]);
  }
  console.log("languagesDataArray: ", languagesDataArray);
  return (
    <div>
      <h2 className={styles.title}>Статистика по языкам программирования</h2>
      <Chart
        chartType="PieChart"
        data={languagesDataArray}
        //   options={options}
        width={"100%"}
        height={"500px"}
      />
    </div>
  );
}
