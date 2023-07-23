import React from "react";
import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";

export default function AuthNavbar() {
  return (
    <div className="nav-component">
      <div
        className="header-page"
        style={{
          width: "100%",
          height: "70px",
          position: "fixed",
          top: "0",
          right: "0",
          left: "0",
          backgroundColor: "white",
          margin: "0",
          borderBottom: "1px solid rgb(194, 173, 173)",
        }}
      >
        <div className="container-fluid">
          <div
            className="header-navbar"
            style={{
              display: "flex",
              justifyContent: "space-between",
              height: "70px",
              width: "100%",
            }}
          >
            <Link to="/">
              <img
                className="logo"
                src={logo}
                style={{ width: "100%", height: "95%" }}
                alt="logo"
              ></img>
            </Link>
            <Link
              to="#"
              className="title-login"
              style={{
                fontSize: "1rem",
                fontWeight: "600",
                lineHeight: "4rem",
                color: "red",
                textDecoration: "none",
              }}
            >
              Bạn cần giúp đỡ?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
