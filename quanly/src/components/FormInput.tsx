import React, { ChangeEvent } from "react";
import { Input } from "antd";

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
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function FormInput({
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
}: IFormInput) {
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
      <Input
        placeholder={placeholder}
        type={type}
        className="input-text required-entry input-form"
        id={id}
        value={value}
        name={name}
        autoComplete="off"
        onChange={onChange}
      />
    </div>
  );
}
