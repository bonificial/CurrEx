import React from "react";
import { Input, Select } from "antd";

type listOptions = {
  itemLabel: string;
  itemValue: string;
  default?: boolean;
};

interface CurrexValueInputProps {
  placeholder?: string;
  type?: string;
  step?: string;
  label: string;
  mode?: "Select" | "Input";
  defaultValue?: listOptions;
  dataset?: Array<listOptions>;
value?:string;
  onChangeValue?(value: string): string;
}

function CurrexValueInput({
  dataset,
  type,
  step = "0.01",
  onChangeValue,
  mode,value,
  defaultValue,
  label,
  placeholder,
}: CurrexValueInputProps) {
  const { Option } = Select;
  console.log(defaultValue);
  return (
    <>
      <label
        className="block text-white text-sm font-bold mb-2"
        htmlFor="username"
      >
        {label}
      </label>
      {mode == "Select" ? (
        <Select
          defaultValue={defaultValue?.itemValue}
          style={{ width: "100%" }}
          onChange={(option) => {
            onChangeValue && onChangeValue(option);
          }}
          value={value}
        >
          {dataset?.map((opt) => (
            <Option value={opt.itemValue}>{opt.itemLabel}</Option>
          ))}
        </Select>
      ) : (
        <Input
          step={step}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type={type}
          placeholder={placeholder}
        />
      )}
    </>
  );
}

export default CurrexValueInput;
