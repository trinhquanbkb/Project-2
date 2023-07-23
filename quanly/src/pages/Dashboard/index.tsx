import React, { useEffect } from "react";
import HorizontalLayout from "../../layouts/HorizontalLayout";
import { UserOutlined } from "@ant-design/icons";
import { Col, Row, Statistic } from "antd";
import { TOKEN_ADMIN } from "../../util/const/data";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem(TOKEN_ADMIN)) {
      navigate("/login", { replace: true });
    }
  }, []);

  return (
    <HorizontalLayout>
      <div className="dashboard-ecom">
        <p className="hello">Xin chào!</p>
        <Row justify="center">
          <Col span={4}>
            <Statistic
              style={{ textAlign: "center" }}
              title="Feedback"
              value={1128}
              prefix={<UserOutlined />}
            />
          </Col>
          <Col span={4}>
            <Statistic
              style={{ textAlign: "center" }}
              title="Người dùng"
              value="25"
            />
          </Col>
          <Col span={4}>
            <Statistic
              style={{ textAlign: "center" }}
              title="Đánh giá"
              value={4.84}
              suffix="/ 5"
            />
          </Col>
        </Row>
        <p className="text-info">
          Chào mừng đến với trang quản lý của IZ'S CLOSET, đây là trang chủ, hãy
          thực hiện công việc thêm, sửa, xóa mọi thứ từ công việc của bạn bắt
          đầu từ đây!
        </p>
      </div>
    </HorizontalLayout>
  );
}
