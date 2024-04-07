import { useSelector } from "react-redux";
import { selectCurrentUser } from "../auth/AuthSlice";
import UnderstandLogo from "../../images/UnderstandLogoDark.webp";
import BinarySearchLogo from "../../images/binary_search.png";
import styles from "./StaticAnalysisPage.module.css";
import SelectProject from "../SelectProject/SelectProject";
import UploadFile from "./UploadFile/UploadFile";
import { Tabs } from "antd";

const AnalysePairUploads = (props: any) => {
  return (
    <div className={styles.analysis_container}>
      <div className={styles.analysis_title}>
        <img
          className={styles.logo}
          src={UnderstandLogo}
          alt="Understand Logo"
        />
        <h3>{props.title}</h3>
      </div>
      <div className={styles.diff_files}>
        <div className={styles.diff_first_file}>
          <UploadFile
            action={"/file/upload_understand_new_file"}
            fileType={props.firstFileType}
          />
        </div>
        <div className={styles.diff_second_file}>
          <UploadFile
            action={"/file/upload_understand_old_file"}
            fileType={props.secondFileType}
          />
        </div>
      </div>
    </div>
  );
};

const AnalyseSingleUpload = (props: any) => {
  return (
    <div className={styles.analysis_container}>
      <div className={styles.analysis_title}>
        <img
          className={styles.logo}
          src={BinarySearchLogo}
          alt="Binary search"
        />
        <h3>{props.title}</h3>
      </div>
      <div className={styles.diff_files}>
        <div className={styles.diff_first_file}>
          <UploadFile
            action={"/file/upload_sources_to_find_binary"}
            fileType={props.fileType}
          />
        </div>
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
          {
            label: "Сравнение избыточных файлов Understand",
            key: "1",
            children: (
              <AnalysePairUploads
                title="Сравнение избыточных файлов Understand "
                firstFileType="txt"
                secondFileType="txt"
              />
            ),
          },
          {
            label: "Сравнение избыточных функций Understand",
            key: "2",
            children: (
              <AnalysePairUploads
                title="Сравнение избыточных функций Understand "
                firstFileType="txt"
                secondFileType="txt"
              />
            ),
          },
          {
            label: "Сравнение КС файлов исходных текстов",
            key: "3",
            children: (
              <AnalysePairUploads
                title="Сравнение КС файлов исходных текстов "
                firstFileType="txt"
                secondFileType="txt"
              />
            ),
          },
          {
            label: "Выявление избыточных файлов по логу Strace",
            key: "4",
            children: (
              <AnalysePairUploads
                title="Выявление избыточных файлов по логу Strace "
                firstFileType="txt"
                secondFileType="zip"
              />
            ),
          },
          {
            label: `Выявление бинарных файлов в исходных текстах`,
            key: "5",
            children: (
              <AnalyseSingleUpload
                title="Выявление бинарных файлов в исходных текстах "
                fileType="zip"
              />
            ),
          },
          {
            label: `Выявление заноз в жопе`,
            key: "6",
            children: (
              <AnalyseSingleUpload
                title="Выявление заноз в жопе "
                fileType="zip"
              />
            ),
          },
          {
            label: `Выявление трещин в жопе`,
            key: "7",
            children: (
              <AnalyseSingleUpload
                title="Выявление трещин в жопе "
                fileType="zip"
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
