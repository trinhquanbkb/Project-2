import React, { useState, useEffect } from "react";
import HorizontalLayout from "../../layouts/HorizontalLayout";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Switch } from "antd";
import { useDispatch, useSelector } from "react-redux";

export default function BusinessPage() {
  const dispatch = useDispatch();
  const { chartMoney } = useSelector((state: any) => state.orderDetailReducer);
  const { chartUser } = useSelector((state: any) => state.userReducer);

  useEffect(() => {
    dispatch({
      type: "GET_CHART_MONEY",
      data: 1,
    });
    dispatch({
      type: "GET_CHART_USER",
      data: 1,
    });
  }, []);

  useEffect(() => {}, [chartMoney, chartUser]);

  const onChange = (checked: boolean) => {
    if (checked === true) {
      dispatch({
        type: "GET_CHART_MONEY",
        data: 1,
      });
      dispatch({
        type: "GET_CHART_USER",
        data: 1,
      });
    } else {
      dispatch({
        type: "GET_CHART_MONEY",
        data: 0,
      });
      dispatch({
        type: "GET_CHART_USER",
        data: 0,
      });
    }
  };

  return (
    <HorizontalLayout>
      <div
        style={{
          marginBottom: "2rem",
          marginLeft: "1.5rem",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Switch style={{ width: "50px" }} defaultChecked onChange={onChange} />
        <span style={{ marginLeft: "0.3rem", lineHeight: "25px" }}>
          (Bật để xem 1 năm, tắt để xem nửa năm)
        </span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            padding: "20px 40px",
            minHeight: "100px",
          }}
        >
          <h3>Sơ đồ thu nhập hàng tháng (đồng/tháng)</h3>
          {chartMoney.length === 6 ? (
            <BarChart width={500} height={320} data={chartMoney}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="totalPrice" fill="#8884d8" />
            </BarChart>
          ) : (
            <BarChart width={1000} height={320} data={chartMoney}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="totalPrice" fill="#8884d8" />
            </BarChart>
          )}
        </div>

        <div
          style={{
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            padding: "20px 40px",
            minHeight: "100px",
          }}
        >
          <h3>Sơ đồ người dùng mới hàng tháng (người/tháng)</h3>
          {chartUser.length === 6 ? (
            <BarChart width={500} height={320} data={chartUser}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="totalUser" fill="#8884d8" />
            </BarChart>
          ) : (
            <BarChart width={1000} height={320} data={chartUser}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="totalUser" fill="#8884d8" />
            </BarChart>
          )}
        </div>
      </div>
    </HorizontalLayout>
  );
}
