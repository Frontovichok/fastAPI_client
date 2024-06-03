import { useSelector } from "react-redux";
import { selectCurrentUser } from "../auth/AuthSlice";
import { SearchOutlined, LoadingOutlined } from "@ant-design/icons";
import UnderstandImg from "../../images/UnderstandLogoDark.webp";
import BinarySearchImg from "../../images/binary_search.png";
import CompareImg from "../../images/compare.png";
import styles from "./StaticAnalysisPage.module.css";
import SelectProject from "../SelectProject/SelectProject";
import UploadFile from "./UploadFile/UploadFile";
import { Tabs, Button } from "antd";
import axios from "axios";
import { useState } from "react";
import DiffTable from "./DiffTable/DiffTable";
import BinaryAnalysisDataCharts from "./BinaryAnalysisDataCharts/BinaryAnalysisDataCharts";
import ChoiceChecksumType from "./RadioChecksumsType/RadioChecksumsType";

const AnalysePairUploads = (props: any) => {
  console.log("props.analyze_request_link: ", props.analyze_request_link);
  const [diffResult, setDiffResult] = useState();
  return (
    <div className={styles.analysis_container}>
      <div className={styles.analysis_title}>
        <img
          className={styles.logo}
          src={props.type === "understand" ? UnderstandImg : CompareImg}
          alt="Logo"
        />
        <h3>{props.title}</h3>
      </div>
      <>{props.type === "checksum" && <ChoiceChecksumType />}</>
      <div className={styles.diff_files}>
        <div className={styles.diff_first_file}>
          <UploadFile
            action={"/file/upload_understand_new_file"}
            fileProps={props.firstFile}
          />
        </div>
        <div className={styles.diff_second_file}>
          <UploadFile
            action={"/file/upload_understand_old_file"}
            fileProps={props.secondFile}
          />
        </div>
      </div>
      <div className={styles.analyzeButtonContainer}>
        <Button
          type="primary"
          onClick={() => {
            console.log("Click imitation of request. Start");
            axios
              .get(props.analyze_request_link)
              .then((response) => {
                console.log(response);
                console.log(response.data);
                setDiffResult(response.data);
                return response.data;
              })
              .catch(function (error) {
                console.log(error);
              })
              .finally(function () {
                console.log("finally");
              });
            console.log("Click imitation of request. End");
          }}
        >
          Проанализировать
        </Button>
      </div>
      <div className={styles.resultContainer}>
        {diffResult && (
          <DiffTable
            analyze_request_link={props.analyze_request_link}
            diffData={diffResult}
          />
        )}
      </div>
    </div>
  );
};

const AnalyseSingleUpload = (props: any) => {
  const [analyseResult, setAnalyseResult] = useState();
  return (
    <div className={styles.analysis_container}>
      <div className={styles.analysis_title}>
        <img
          className={styles.logo}
          src={BinarySearchImg}
          alt="Binary search"
        />
        <h3>{props.title}</h3>
      </div>
      <div className={styles.diff_files}>
        <div className={styles.diff_first_file}>
          <UploadFile
            action={"/file/upload_sources_to_find_binary"}
            fileProps={props.file}
          />
        </div>
      </div>
      <div className={styles.analyzeButtonContainer}>
        <Button
          type="primary"
          onClick={() => {
            console.log("Click imitation of request. Start");
            axios
              .get(props.analyze_request_link)
              .then((response) => {
                console.log(response);
                console.log(response.data);
                setAnalyseResult(response.data);
                return response.data;
              })
              .catch(function (error) {
                console.log(error);
              })
              .finally(function () {
                console.log("finally");
              });
            console.log("Click imitation of request. End");
          }}
        >
          Проанализировать
        </Button>
      </div>
      <div className={styles.resultContainer}>
        {analyseResult && (
          <div>
            <BinaryAnalysisDataCharts diffData={analyseResult} />
            <DiffTable
              analyze_request_link={props.analyze_request_link}
              diffData={analyseResult}
            />
          </div>
        )}
      </div>
    </div>
  );
};

const StaticAnalysisPage = () => {
  let [user] = useSelector(selectCurrentUser);

  const onChange = (key: string) => {
    console.log(key);
  };

  // const currentTime = Date.now();
  // const [imitationResponseSeconds, setImitationResponseSeconds] = useState(0);

  // // 0 - not started, 1 - started, 2 - finished
  // const [imitationResponseFinishedStatus, setImitationResponseFinishedStatus] =
  //   useState(0);

  // useEffect(() => {
  //   if (
  //     imitationResponseFinishedStatus === 0 ||
  //     imitationResponseFinishedStatus === 2
  //   ) {
  //     return;
  //   }

  //   const intervalId = setInterval(() => {
  //     console.log("--interval--");
  //     console.log("imitationResponseSeconds: ", imitationResponseSeconds);
  //     setImitationResponseSeconds((seconds) => seconds + 1);
  //   }, 1000);
  //   return () => clearInterval(intervalId);
  // }, [imitationResponseFinishedStatus]);

  return (
    <div className={styles.container}>
      <h1 className={styles.header_title}>Статический анализ</h1>
      <div className={styles.select_project}>
        <p>Выберите проект:</p>
        <SelectProject />
      </div>

      <Tabs
        onChange={onChange}
        // type="card"
        items={[
          // {
          //   label: "Сравнение избыточных файлов Understand",
          //   key: "1",
          //   children: (
          //     <AnalysePairUploads
          //       title="Сравнение избыточных файлов Understand "
          //       firstFileType="txt"
          //       secondFileType="txt"
          //     />
          //   ),
          // },
          {
            label: "Сравнение избыточных функций Understand",
            key: "2",
            children: (
              <AnalysePairUploads
                title="Сравнение избыточных функций Understand "
                type="understand"
                firstFile={{ type: "txt", text: "Старый отчет Understand" }}
                secondFile={{ type: "txt", text: "Новый отчет Understand" }}
                analyze_request_link="https://127.0.0.1:8001/compare_unused_functions"
              />
            ),
          },
          {
            label: "Сравнение КС файлов исходных текстов",
            key: "3",
            children: (
              <AnalysePairUploads
                title="Сравнение КС файлов исходных текстов "
                type="checksum"
                firstFile={{ type: "txt", text: "Старый файл с КС" }}
                secondFile={{ type: "txt", text: "Новый файл с КС" }}
                analyze_request_link="https://127.0.0.1:8001/checksums"
              />
            ),
          },
          {
            label: `Выявление бинарных файлов в исходных текстах`,
            key: "5",
            children: (
              <AnalyseSingleUpload
                title="Выявление бинарных файлов в исходных текстах "
                type="binary_files"
                file={{ type: "zip", text: "Архив с исходными текстами" }}
                analyze_request_link="https://127.0.0.1:8001/analyze_sources"
              />
            ),
          },
        ]}
      />

      {/* <Button
        className="newProject"
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => {
          console.log("Click imitation of request. Start");
          setImitationResponseFinishedStatus(1);
          fetch("https://127.0.0.1:8001/imitation")
            .then((response) => {
              console.log(response);
              // console.log(response.text());
              console.log("Click imitation of request. End in fetch response");
              return response.text();
            })
            .then((responseText) => {
              console.log(responseText);
              setImitationResponseFinishedStatus(2);
              console.log(
                "Click imitation of request. End in fetch responseText"
              );
            })
            .catch((error) => {
              console.error(error);
              console.log("Click imitation of request. End in fetch error");
            });
          console.log("Click imitation of request. End");
        }}
      >
        Имитация загрузки
      </Button>
      {imitationResponseFinishedStatus === 0 && <p>запрос еще не отправлен</p>}
      {imitationResponseFinishedStatus === 1 && (
        <>
          <p>Загрузка:</p>
          <p>{imitationResponseSeconds}</p>
        </>
      )}
      {imitationResponseFinishedStatus === 2 && (
        <>
          <p>Время загрузки:</p>
          <p>{imitationResponseSeconds}</p>
        </>
      )}

      <p>Время ответа:</p> */}
    </div>
  );
};

export default StaticAnalysisPage;
