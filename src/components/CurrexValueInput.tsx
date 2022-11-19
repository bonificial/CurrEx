import React from "react";
import { Input, Select } from "antd";
import { randomString } from "../utils/contants";

type listOptions = {
  itemLabel: string;
  itemValue: string;
};

interface CurrexValueInputProps {
  placeholder?: string;
  type?: string;
  step?: string;
  label: string;
  disabled?: boolean;
  mode?: "Select" | "Input";
  defaultValue?: string;
  dataset?: Array<listOptions>;
  value?: string ;

  onChangeValue?(value: string): string | void;
}

function CurrexValueInput({
  dataset,
  type,
  disabled,
  step = "0.01",
  onChangeValue,
  mode,
  value,
  defaultValue,
  label,
  placeholder,
}: CurrexValueInputProps) {
  const { Option } = Select;
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
          defaultValue={defaultValue}
          disabled={disabled}
          style={{ width: "100%" }}
          showSearch
          onChange={(option) => {
            onChangeValue && onChangeValue(option);
          }}
          value={value}
        >
          {dataset?.map((opt, index) => (
            <Option key={randomString()} value={opt.itemValue}>
              {opt.itemLabel}
            </Option>
          ))}
        </Select>
      ) : (
        <Input
          step={step}
          value={value}
          disabled={disabled}
          min={0}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type={type}
          placeholder={placeholder}
          onChange={(e) => {
            onChangeValue && onChangeValue(e.target.value);
          }}
        />
      )}
    </>
  );
}

export default CurrexValueInput;
