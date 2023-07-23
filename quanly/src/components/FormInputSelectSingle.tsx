import React, { ChangeEvent, useState } from "react";
import { Select } from "antd";
import type { SizeType } from "antd/es/config-provider/SizeContext";

interface IFormInput {
  id: string;
  name: string;
  label: string;
  type: string;
  required: boolean;
  value?: any;
  className?: string;
  style?: any;
  placeholder?: string;
  option: any;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function FormInputSelectSingle({
  id,
  name,
  type,
  label,
  required,
  value,
  onChange,
  className,
  style,
  placeholder,
  option,
}: IFormInput) {
  let options: any[] = [];
  for (let i = 0; i < option.length; i++) {
    options.push({
      value: option[i].id,
      label: option[i].name,
    });
  }

  const handleChange = (value: any | any[]) => {
    onChange?.(value);
  };

  const [size, setSize] = useState<SizeType>("middle");

  return (
    <div
      className={className === null ? "" : className}
      style={style === null ? "" : style}
    >
      <label htmlFor={id} className="label-form">
        {label}
        {required === true ? <span className="text-danger">*</span> : null}
      </label>
      <br />
      <Select
        size={size}
        onChange={onChange}
        style={{ width: "100%" }}
        options={options}
        value={value}
      />
    </div>
  );
}
