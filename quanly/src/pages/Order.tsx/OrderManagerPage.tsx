import React, { useState, useEffect } from "react";
import { Table, Select, Button, Modal } from "antd";
import HorizontalLayout from "../../layouts/HorizontalLayout";
import { useDispatch, useSelector } from "react-redux";
import { renderPrice } from "../../util/const/function";

interface Order {
  id: number;
  price: any;
  color: any;
  size: string;
  count: number;
  status: number;
  note: string;
  name: string;
}

export default function OrderManagerPage() {
  const dispatch = useDispatch();
  const { listOrderAdmin } = useSelector(
    (state: any) => state.orderDetailReducer
  );
  const [filterStatus, setFilterStatus] = useState<number | null>(null);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [noteData, setNoteData] = useState("");

  useEffect(() => {
    dispatch({
      type: "GET_ALL_ORDER_DETAIL_ADMIN",
    });
  }, []);

  useEffect(() => {}, [listOrderAdmin]);

  const handleFilterStatusChange = (value: number | null) => {
    setFilterStatus(value);
  };

  const handleApproveOrder = (orderId: number) => {
    setSelectedOrderId(orderId);
    setConfirmVisible(true);
  };

  const handleConfirmOk = () => {
    dispatch({
      type: "ORDER_BROWSING",
      data: selectedOrderId,
    });
    setConfirmVisible(false);
    setTimeout(() => {
      dispatch({
        type: "GET_ALL_ORDER_DETAIL_ADMIN",
      });
    }, 300);
  };

  const handleConfirmCancel = () => {
    setSelectedOrderId(null);
    setConfirmVisible(false);
  };

  const showModal = (orderId: any) => {
    setNoteData(orderId.note);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setNoteData("");
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setNoteData("");
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "3%",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
      width: "22%",
    },
    {
      title: "Tổng giá",
      dataIndex: "price",
      key: "price",
      width: "11%",
    },
    {
      title: "Màu sắc",
      dataIndex: "color",
      key: "color",
      width: "14%",
    },
    {
      title: "Kích thước",
      dataIndex: "size",
      key: "size",
      width: "14%",
    },
    {
      title: "Số lượng",
      dataIndex: "count",
      key: "count",
      width: "10%",
    },
    {
      title: "Lưu ý",
      dataIndex: "note",
      key: "note",
      width: "10%",
      render: (note: number, record: Order) => {
        return (
          <Button type="primary" onClick={() => showModal(record)}>
            Xem
          </Button>
        );
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: number, record: Order) => {
        if (status === 1) {
          return (
            <Button
              type="primary"
              onClick={() => handleApproveOrder(record.id)}
            >
              Duyệt đơn
            </Button>
          );
        } else if (status === 2) {
          return <p style={{ color: "orange" }}>Đợi khách nhận</p>;
        } else if (status === 3) {
          return <p style={{ color: "green" }}>Đã xong</p>;
        }
        return null;
      },
    },
  ];

  const ordersData: Order[] = [];
  if (listOrderAdmin.length > 0) {
    listOrderAdmin.forEach((i: any) => {
      ordersData.push({
        id: i.id,
        name: i.name_product,
        price: renderPrice(i.price, 0, []) + "đ",
        color:
          i.color === null || i.color === "" ? (
            "không có màu sắc"
          ) : (
            <div
              style={{
                border: "1px solid black",
                width: "1.5rem",
                height: "1.5rem",
                borderRadius: "1.5rem",
                backgroundColor: `${i.color}`,
              }}
            ></div>
          ),
        size: i.size === null ? "không có kích thước" : i.size,
        count: i.count,
        status: i.status,
        note: i.note,
      });
    });
  }

  return (
    <HorizontalLayout>
      <Select
        style={{ width: 150, marginBottom: 16 }}
        placeholder="Filter by Status"
        value={filterStatus}
        onChange={handleFilterStatusChange}
      >
        <Select.Option value={null}>Tất cả</Select.Option>
        <Select.Option value={1}>Đơn cần duyệt</Select.Option>
        <Select.Option value={2}>Đợi khách nhận</Select.Option>
        <Select.Option value={3}>Đã xong</Select.Option>
      </Select>
      <br></br>
      <span style={{ color: "red", fontSize: "14px" }}>
        Lưu ý: Các sản phẩm có cùng ID tức là cùng ở chung 1 đơn hàng mà khách
        đã đặt, nếu trong các sản phẩm cùng id mà duyệt 1 sản phẩm thì các sản
        phẩm khác chung ID cũng sẽ được duyệt. Vì vậy hãy chuẩn bị đủ hàng cho
        một ID trước khi duyệt đơn!
      </span>
      <Table
        style={{ marginTop: "12px" }}
        bordered
        dataSource={
          filterStatus !== null
            ? ordersData.filter((order) => order.status === filterStatus)
            : ordersData
        }
        columns={columns}
      />

      <Modal
        title="Xác nhận phê duyệt đơn hàng"
        visible={confirmVisible}
        onOk={handleConfirmOk}
        onCancel={handleConfirmCancel}
        okText="Xác nhận"
        cancelText="Hủy"
      >
        Bạn có chắc muốn phê duyệt đơn hàng có id là {selectedOrderId} này?
      </Modal>

      <Modal
        title="Nội dung lưu ý:"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {noteData}
      </Modal>
    </HorizontalLayout>
  );
}
