import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";

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
  onChange?: (event: any) => void;
}

export default function FormInputTextArea({
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
  const [content, setContent] = useState("");
  const handleContentChange = (value: any) => {
    setContent(value);
  };

  useEffect(() => {
    onChange?.(content);
  }, [content]);

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
      <ReactQuill
        value={value}
        onChange={handleContentChange}
        placeholder="Nhập văn bản..."
      />
    </div>
  );
}
