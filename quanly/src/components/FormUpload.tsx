import React, { useState, useEffect } from "react";

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
  onChange?: (files: File[]) => void;
}

export default function FormUpload({
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
  const [files, setFiles] = useState<any[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      // Chuyển selectedFiles thành một mảng để tiện xử lý
      const newFiles: File[] = Array.from(selectedFiles);
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  useEffect(() => {
    onChange?.(files);
  }, [files]);

  useEffect(() => {
    setFiles(value);
    onChange?.(value);
  }, [value]);

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
      <form encType="multipart/form-data">
        <div>
          <input type="file" multiple onChange={handleFileChange} />
          <ul style={{ listStyleType: "none", paddingLeft: "0px" }}>
            {files.map((file, index) => (
              <li key={index}>
                {file.name}{" "}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleRemoveFile(index);
                  }}
                >
                  Xóa
                </button>
              </li>
            ))}
          </ul>
        </div>
      </form>
    </div>
  );
}
