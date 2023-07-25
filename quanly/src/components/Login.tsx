import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Row, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { TOKEN_ADMIN } from "../util/const/data";
import FormInput from "./FormInput";
import Swal from "sweetalert2";
import { LOGIN_ADMIN_SAGA } from "../redux/type";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: "",
    password: "",
  });
  const { statusLogin } = useSelector((state: any) => state.userReducer);
  useEffect(() => {
    if (localStorage.getItem(TOKEN_ADMIN) !== null) {
      dispatch({
        type: LOGIN_ADMIN_SAGA,
        data: "500",
      });
      setError({ email: "", password: "" });
      navigate("/", { replace: true });
    } else if (statusLogin === false) {
      Swal.fire({
        title: "Thông tin bạn nhập chưa chính xác!",
        icon: "error",
        confirmButtonText: "Chấp nhận",
      });
      dispatch({
        type: LOGIN_ADMIN_SAGA,
        data: "500",
      });
    }
  }, [statusLogin]);

  const handleSubmit = (event: any) => {
    event.preventDefault();

    let emailError = "";
    let passwordError = "";

    if (user.email === "") {
      emailError = "Chưa điền email";
    }
    if (user.password === "") {
      passwordError = "Chưa điền mật khẩu";
    }

    setError({ email: emailError, password: passwordError });

    if (!emailError && !passwordError) {
      dispatch({
        type: "LOGIN_ADMIN",
        data: {
          email: user.email,
          password: user.password,
        },
      });
    }
  };

  return (
    <div
      className="login container-fluid"
      style={{
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <div
        style={{
          height: "56vh",
          width: "40%",
          boxSizing: "border-box",
          backgroundColor: "white",
          padding: "1rem 2.8rem 0rem 2.8rem",
          marginTop: "3rem",
          borderRadius: "1rem",
        }}
        className="input-login"
      >
        <p style={{ fontWeight: "bold", fontSize: "26px" }}>Đăng nhập</p>
        <Row>
          <Col span={24}>
            <FormInput
              style={{ marginTop: "20px" }}
              id="email"
              name="email"
              type="email"
              label="Email"
              required={true}
              onChange={(e) =>
                setUser({
                  ...user,
                  email: e.target.value,
                })
              }
            />
            <span style={{ fontSize: "12px", color: "red" }}>
              {error.email === "" ? null : error.email}
            </span>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormInput
              style={{ marginTop: "20px" }}
              id="password"
              name="password"
              type="password"
              label="Mật khẩu"
              required={true}
              onChange={(e) =>
                setUser({
                  ...user,
                  password: e.target.value,
                })
              }
            />
            <span style={{ fontSize: "12px", color: "red" }}>
              {error.password === "" ? null : error.password}
            </span>
          </Col>
        </Row>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: "11px", color: "red", marginTop: "2rem" }}>
            * Yêu cầu bắt buộc
          </span>
          <Button
            onClick={(event: any) => {
              handleSubmit(event);
            }}
            type="primary"
            style={{
              width: "40%",
              marginTop: "1rem",
              padding: "0.3rem 0rem",
              boxSizing: "content-box",
            }}
          >
            Đăng nhập
          </Button>
        </div>
      </div>
    </div>
  );
}
