import React from "react";
import AuthNavbar from "../components/AuthNavbar";
import bg from "../assets/images/background_login.png";

export interface IAuthLayoutProp {
  children?: React.ReactNode;
}

export default function AuthLayout({ children }: IAuthLayoutProp) {
  return (
    <div
      style={{
        overflowX: "hidden",
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <div
        style={{
          height: "100vh",
          backgroundColor: "rgb(0 0 0 / 21%)",
          overflowX: "hidden",
        }}
      >
        <AuthNavbar />
        {children}
      </div>
    </div>
  );
}
