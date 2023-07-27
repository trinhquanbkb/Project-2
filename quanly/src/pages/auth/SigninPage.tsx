import React, { useState, useEffect } from "react";
import HorizontalLayout from "../../layouts/HorizontalLayout";
import FormInput from "../../components/FormInput";
import { Button } from "antd";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";

export default function SigninPage() {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    values: {
      email: "",
      password: "",
      rePassword: "",
    },
    error: {
      email: "",
      password: "",
      rePassword: "",
    },
  });

  // useEffect(() => {
  //   if (statusRegister === true) {
  //     navigate("/", { replace: true });
  //   } else if (statusRegister === "error" || statusRegister === false) {
  //     Swal.fire({
  //       title: "Email đã được sử dụng, hãy nhập email mới!",
  //       icon: "error",
  //       confirmButtonText: "Chấp nhận",
  //     });
  //   }
  // }, [statusRegister]);

  const handleOnChange = (event: any) => {
    let { name, value, type } = event.target;
    //chèn vào key của data.values giá trị là value nếu như người dùng nhập giá trị vào input
    let changeValues: any = { ...user.values, [name]: value };
    let changeErrors: any = { ...user.error };
    //trim() sẽ giúp mảng xóa hết các dấu cách, dòng if này sẽ check dữ liệu của input có trống hay không
    if (value.trim() === "") {
      changeErrors[name] = name + " không được bỏ trống!";
    } else {
      changeErrors[name] = "";
    }
    //check email
    if (type === "email") {
      //regex của email
      const regexMail = /\S+@\S+\.\S+/;
      //dùng regex test email, nếu email nhập vào là sai sẽ trả ra false, !false sẽ là true và gán giá trị cho changeError
      if (value.trim() === "") {
        changeErrors[name] = name + " không được bỏ trống!";
      } else if (!regexMail.test(value)) {
        changeErrors[name] = name + " không hợp lệ!";
      } else {
        changeErrors[name] = "";
      }
    }
    //check password
    if (name === "password") {
      //regex của password
      const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g;
      //dùng regex test password
      if (value.trim() === "") {
        changeErrors[name] = name + " không được bỏ trống!";
      } else if (!regexPassword.test(value)) {
        changeErrors[name] = name + " không hợp lệ!";
      } else {
        changeErrors[name] = "";
      }
    }
    //check passwordConfirm có giống password đã điền trước hay không
    if (name === "rePassword") {
      const checkVerifyPassword = user.values.password === value;
      if (!checkVerifyPassword) {
        changeErrors[name] = "password không trùng khớp!";
      } else {
        changeErrors[name] = "";
      }
    }
    setUser({
      values: changeValues,
      error: changeErrors,
    });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const { values, error } = user;
    //khởi tạo biến kiểm tra dữ liệu đã nhập vào đúng hết chưa
    let valid = true;
    //kiểm tra xem có dữ liệu nào chưa điền hay không
    for (let key in values) {
      if (values[key as keyof typeof values] === "") {
        valid = false;
      }
    }
    //kiểm tra xem có dữ liệu nào chưa valid không
    for (let key in error) {
      if (error[key as keyof typeof error] !== "") {
        valid = false;
      }
    }
    if (!valid) {
      Swal.fire({
        title: "Cần nhập đúng dữ liệu!",
        icon: "error",
        confirmButtonText: "Chấp nhận",
      });
    } else {
      // dispatch({
      //   type: "REGISTER",
      //   data: {
      //     name_user: user.values.firstName + " " + user.values.lastName,
      //     phone_number: user.values.phone,
      //     password: user.values.password,
      //     email: user.values.email,
      //   },
      // });
    }
  };

  return (
    <HorizontalLayout>
      <div
        style={{
          backgroundColor: "white",
          minHeight: "600px",
          paddingTop: "30px",
        }}
      >
        <p
          style={{ fontSize: "26px", fontWeight: "bold", paddingLeft: "60px" }}
        >
          Đăng ký tài khoản quản lý mới
        </p>
        <form style={{ width: "45%", marginLeft: " 60px" }}>
          <div style={{ marginTop: "15px" }}>
            <FormInput
              id="email"
              name="email"
              type="email"
              label="Email"
              required={true}
              onChange={(event) => {
                handleOnChange(event);
              }}
            />
            <span style={{ fontSize: "12px" }} className="text text-danger">
              {user.error.email}
            </span>
          </div>

          <div style={{ marginTop: "15px" }}>
            <FormInput
              id="password"
              name="password"
              type="password"
              label="Mật khẩu"
              required={true}
              onChange={(event) => {
                handleOnChange(event);
              }}
            />
            <span style={{ fontSize: "12px" }} className="text text-danger">
              {user.error.password}
            </span>
          </div>

          <div style={{ marginTop: "15px" }}>
            <FormInput
              id="rePassword"
              name="rePassword"
              type="password"
              label="Nhập lại mật khẩu"
              required={true}
              onChange={(event) => {
                handleOnChange(event);
              }}
            />
            <span style={{ fontSize: "12px" }} className="text text-danger">
              {user.error.rePassword}
            </span>
          </div>

          <Button
            onClick={(event) => {
              handleSubmit(event);
            }}
            style={{
              marginTop: "30px",
              backgroundColor: "black",
              color: "white",
              width: "25%",
              padding: "4px 2px",
              boxSizing: "content-box",
            }}
          >
            Xác nhận
          </Button>
        </form>
      </div>
    </HorizontalLayout>
  );
}
