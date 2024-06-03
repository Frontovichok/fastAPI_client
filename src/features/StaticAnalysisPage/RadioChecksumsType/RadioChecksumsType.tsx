import React, { useState } from "react";
import type { RadioChangeEvent } from "antd";
import { Radio } from "antd";
import styles from "./RadioChecksumsType.module.css";

const checksumOptions = [
  { label: "gostsum", value: "gostsum" },
  { label: "md5sum", value: "md5sum" },
  { label: "ФИКС", value: "fix" },
  { label: "Total commander", value: "tc" },
];

export default function ChoiceChecksumType() {
  const [checksum, setChecksum] = useState("gostsum");

  const onChangeChecksum = ({ target: { value } }: RadioChangeEvent) => {
    console.log("radio checked", value);
    setChecksum(value);
  };
  return (
    <div className={styles.radio}>
      <Radio.Group
        options={checksumOptions}
        onChange={onChangeChecksum}
        value={checksum}
        optionType="button"
      />
    </div>
  );
}
