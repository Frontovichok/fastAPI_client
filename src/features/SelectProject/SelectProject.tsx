import React from "react";
import { Select } from "antd";

const onChange = (value: string) => {
  console.log(`selected ${value}`);
};

const onSearch = (value: string) => {
  console.log("search:", value);
};

// Filter `option.label` match the user type `input`
const filterOption = (
  input: string,
  option?: { label: string; value: string }
) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

const SelectProject: React.FC = () => (
  <Select
    showSearch
    placeholder="ПТК Залупа"
    optionFilterProp="children"
    onChange={onChange}
    onSearch={onSearch}
    filterOption={filterOption}
    options={[
      {
        value: "jack",
        label: "Залупа 1",
      },
      {
        value: "lucy",
        label: "Залупа 2",
      },
      {
        value: "tom",
        label: "Залупа 3",
      },
    ]}
  />
);

export default SelectProject;
