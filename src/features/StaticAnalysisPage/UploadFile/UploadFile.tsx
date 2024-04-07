import { FileAddOutlined, FileZipOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { message, Upload } from "antd";

const { Dragger } = Upload;

const uploadProps: UploadProps = {
  name: "file",
  multiple: false,
  maxCount: 1,
  // headers: { "Content-Type": "text/plain" },
  beforeUpload: (file) => {
    const isTXT = file.type === "text/plain";
    console.log("file.type: ", file.type);
    if (!isTXT) {
      message.error(`Файл ${file.name} должен иметь формат txt`);
    }
    return isTXT || Upload.LIST_IGNORE;
  },
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} файл успешно загружен.`);
    } else if (status === "error") {
      message.error(`${info.file.name} ошибка загрузки файла.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

const UploadFile = (props: any) => {
  return (
    <Dragger action={props.action} {...uploadProps}>
      <p className="ant-upload-drag-icon">
        {props.fileType === "txt" && <FileAddOutlined />}
        {props.fileType === "zip" && <FileZipOutlined />}
      </p>
      <p className="ant-upload-text">
        Выберите или перетащите старый отчет Understand
      </p>
      <p className="ant-upload-hint">Расширение файла - {props.fileType}</p>
    </Dragger>
  );
};

export default UploadFile;
