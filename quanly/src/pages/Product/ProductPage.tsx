import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Table,
  Typography,
  Modal,
  Row,
  Col,
} from "antd";
import HorizontalLayout from "../../layouts/HorizontalLayout";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { parseDate, renderPrice } from "../../util/const/function";
import FormInput from "../../components/FormInput";
import FormInputSelect from "../../components/FormInputSelect";
import FormInputTextArea from "../../components/FormInputTextarea";
import FormUpload from "../../components/FormUpload";
import FormInputSelectSingle from "../../components/FormInputSelectSingle";
import Swal from "sweetalert2";
import { CREATE_PRODUCT_SAGA } from "../../redux/type";

interface Item {
  key: any;
  name: any;
  price: any;
  count: any;
  update: any;
  percent: any;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text";
  record: Item;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export default function ProductPage() {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { listProduct, listAttr, statusCreate } = useSelector(
    (state: any) => state.productReducer
  );
  const [dataPut, setDataPut] = useState<any>({
    name_product: "",
    price_product: "",
    percent_product: "",
    brand_product: "",
    cate_product: "",
    remain_product: "",
    tag_product: [],
    size_product: [],
    color_product: [],
    description_product: "",
    material_product: "",
    image_product: [],
  });
  const [error, setError] = useState({
    name_product: "",
    price_product: "",
    percent_product: "",
    brand_product: "",
    cate_product: "",
    remain_product: "",
    tag_product: "",
    size_product: "",
    color_product: "",
    description_product: "",
    material_product: "",
    image_product: "",
  });

  useEffect(() => {
    dispatch({
      type: "GET_PRODUCTS",
    });
    dispatch({
      type: "GET_ALL_ATTRIBUTE",
    });
  }, []);

  useEffect(() => {
    if (statusCreate === true) {
      Swal.fire({
        title: "Tạo hàng thành công!",
        icon: "success",
        confirmButtonText: "Chấp nhận",
      });
      setDataPut({
        ...dataPut,
        name_product: "",
        price_product: "",
        percent_product: "",
        brand_product: "",
        cate_product: "",
        remain_product: "",
        tag_product: [],
        size_product: [],
        color_product: [],
        description_product: "",
        material_product: "",
        image_product: [],
      });
      setIsModalOpen(false);
      dispatch({
        type: CREATE_PRODUCT_SAGA,
        data: "",
      });
      dispatch({
        type: "GET_PRODUCTS",
      });
    } else if (statusCreate === false) {
      Swal.fire({
        title: "Lỗi server: tạo hàng không thành công!",
        icon: "error",
        confirmButtonText: "Chấp nhận",
      });
      dispatch({
        type: CREATE_PRODUCT_SAGA,
        data: "",
      });
    }
  }, [listProduct, listAttr, error, statusCreate]);
  const originData: Item[] = [];
  if (listProduct.length > 0) {
    listProduct.forEach((i: any) => {
      originData.push({
        key: i.id,
        name: i.name_product,
        price: renderPrice(i.price, 0, []) + "đ",
        count: i.remain,
        update: parseDate(i.updatedAt),
        percent: i.percent_sale == null ? "0%" : i.percent_sale + "%",
      });
    });
  }

  const isEditing = (record: Item) => record.key === editingKey;

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    //check data
    let hasErrors =
      dataPut.name_product === "" ||
      isNaN(dataPut.price_product) ||
      dataPut.brand_product === "" ||
      dataPut.cate_product === "" ||
      isNaN(dataPut.remain_product) ||
      isNaN(dataPut.percent_product) ||
      dataPut.tag_product.length === 0 ||
      dataPut.size_product.length === 0 ||
      dataPut.color_product.length === 0 ||
      dataPut.description_product === "" ||
      dataPut.material_product === "" ||
      dataPut.image_product.length === 0;

    // Cập nhật trạng thái lỗi
    setError({
      ...error,
      name_product: dataPut.name_product === "" ? "Chưa điền tên sản phẩm" : "",
      price_product: isNaN(dataPut.price_product)
        ? ""
        : "Giá sản phẩm là một số nguyên",
      percent_product:
        dataPut.percent_product !== "" && isNaN(dataPut.percent_product)
          ? ""
          : "Cần điền giá trị từ 1-99",
      brand_product:
        dataPut.brand_product === "" ? "Chưa điền thương hiệu sản phẩm" : "",
      cate_product:
        dataPut.cate_product === "" ? "Cần chọn danh mục sản phẩm" : "",
      remain_product: isNaN(dataPut.remain_product)
        ? ""
        : "Số lượng hàng là một số nguyên",
      tag_product:
        dataPut.tag_product.length === 0 ? "Cần chọn ít nhất 1 tag" : "",
      size_product:
        dataPut.size_product.length === 0
          ? "Cần chọn ít nhất 1 kích thước"
          : "",
      color_product:
        dataPut.color_product.length === 0 ? "Cần chọn ít nhất 1 màu" : "",
      description_product:
        dataPut.description_product === ""
          ? "Cần điền nội dung tổng quan về sản phẩm"
          : "",
      material_product:
        dataPut.material_product === ""
          ? "Cần điền nội dung chất liệu của sản phẩm"
          : "",
      image_product:
        dataPut.image_product.length === 0 ? "Cần chọn ảnh của sản phẩm" : "",
    });
    // Nếu không có lỗi, thực hiện việc gửi form
    if (!hasErrors) {
      dispatch({
        type: "CREATE_PRODUCT",
        data: dataPut,
      });
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({ name: "", age: "", address: "", ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      width: "26%",
      editable: true,
    },
    {
      title: "Giá sản phẩm",
      dataIndex: "price",
      width: "13%",
      editable: true,
    },
    {
      title: "Giảm giá",
      dataIndex: "percent",
      width: "13%",
      editable: true,
    },
    {
      title: "Tồn kho",
      dataIndex: "count",
      width: "13%",
      editable: true,
    },
    {
      title: "Cập nhật lần cuối",
      dataIndex: "update",
      width: "17%",
    },
    {
      title: "Chức năng",
      dataIndex: "operation",
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{ marginRight: 8, color: "blue", fontSize: "15px" }}
            >
              Lưu
            </Typography.Link>
            <Popconfirm title="Bỏ cập nhật?" onConfirm={cancel}>
              <span style={{ color: "blue" }}>Thoát</span>
            </Popconfirm>
          </span>
        ) : (
          <div>
            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
            >
              <Button
                type="text"
                style={{ backgroundColor: "#d4b106", marginRight: "0.8rem" }}
              >
                Chỉnh sửa
              </Button>
            </Typography.Link>
            <Button
              type="text"
              style={{ backgroundColor: "red" }}
              onClick={() => {
                dispatch({
                  type: "DELETE_PRODUCT",
                  data: record.key,
                });
                setTimeout(() => {
                  Swal.fire({
                    title: "Xóa sản phẩm thành công!",
                    icon: "success",
                    confirmButtonText: "Chấp nhận",
                  });
                  dispatch({
                    type: "GET_PRODUCTS",
                  });
                }, 500);
              }}
            >
              Xóa
            </Button>
          </div>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === "price" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const save = async (key: React.Key) => {
    const editedRow = originData.find((row) => row.key === key);
    let data: any = { id: key };
    let xsubmit = true;

    if (editedRow) {
      const formValues = form.getFieldsValue();
      const pattern = /^\d+$/;
      for (const x in formValues) {
        if (x === "count") {
          if (!pattern.test(formValues[x])) {
            xsubmit = false;
            Swal.fire({
              title: "Trường 'tồn kho' cần nhập giá trị số!",
              icon: "error",
              confirmButtonText: "Chấp nhận",
            });
          } else if (parseInt(formValues[x]) < 0) {
            xsubmit = false;
            Swal.fire({
              title: "Trường 'tồn kho' cần nhập giá trị dương!",
              icon: "error",
              confirmButtonText: "Chấp nhận",
            });
          } else {
            data = { ...data, remain: parseInt(formValues[x]) };
          }
        } else if (x === "percent") {
          if (!pattern.test(formValues[x])) {
            xsubmit = false;
            Swal.fire({
              title: "Trường 'giảm giá' cần nhập giá trị số!",
              icon: "error",
              confirmButtonText: "Chấp nhận",
            });
          } else if (parseInt(formValues[x]) < 0) {
            xsubmit = false;
            Swal.fire({
              title: "Trường 'giảm giá' cần nhập giá trị dương!",
              icon: "error",
              confirmButtonText: "Chấp nhận",
            });
          } else {
            data = { ...data, percent_sale: parseInt(formValues[x]) };
          }
        } else if (x === "price") {
          if (!pattern.test(formValues[x])) {
            xsubmit = false;
            Swal.fire({
              title: "Trường 'giá sản phẩm' cần nhập giá trị số!",
              icon: "error",
              confirmButtonText: "Chấp nhận",
            });
          } else if (formValues[x] <= 0) {
            xsubmit = false;
            Swal.fire({
              title: "Trường 'giá sản phẩm' cần nhập giá trị dương!",
              icon: "error",
              confirmButtonText: "Chấp nhận",
            });
          } else {
            data = { ...data, price: parseInt(formValues[x]) };
          }
        } else {
          data = { ...data, name_product: formValues[x] };
        }
      }
    }
    if (xsubmit) {
      setEditingKey("");
      dispatch({
        type: "UPDATE_PRODUCT",
        data: data,
      });
      setTimeout(() => {
        Swal.fire({
          title: "Cập nhật thành công!",
          icon: "success",
          confirmButtonText: "Chấp nhận",
        });
        dispatch({
          type: "GET_PRODUCTS",
        });
      }, 500);
    }
  };

  let listCate: any[] = [];
  let listColor: any[] = [];
  let listTag: any[] = [];
  let listSize: any[] = [];

  if (Object.keys(listAttr).length !== 0) {
    if (listAttr.listCate.length > 0) {
      listAttr.listCate.forEach((item: any) => {
        listCate.push({ id: item.id, name: item.name_category });
      });
    }
    if (listAttr.listSize.length > 0) {
      listAttr.listSize.forEach((item: any) => {
        listSize.push({ id: item.id, name: item.size });
      });
    }
    if (listAttr.listColor.length > 0) {
      listAttr.listColor.forEach((item: any) => {
        listColor.push({ id: item.id, name: item.color });
      });
    }
    if (listAttr.listTag.length > 0) {
      listAttr.listTag.forEach((item: any) => {
        listTag.push({ id: item.id, name: item.name_tag });
      });
    }
  }

  return (
    <HorizontalLayout>
      <Button onClick={showModal} type="primary" style={{ marginBottom: 16 }}>
        Thêm sản phẩm mới <PlusOutlined />
      </Button>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={originData}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
        />
      </Form>
      <Modal
        width={650}
        title="Tạo sản phẩm mới"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Row>
          <Col span={24}>
            <FormInput
              style={{ marginTop: "30px" }}
              id="name_product"
              name="name_product"
              type="text"
              label="Tên sản phẩm"
              required={true}
              value={dataPut.name_product}
              onChange={(e) => {
                setDataPut({ ...dataPut, name_product: e.target.value });
              }}
            />
            <span style={{ color: "red" }}>
              {error.name_product === "" ? null : error.name_product}
            </span>
          </Col>
        </Row>
        <Row justify="space-between">
          <Col span={11}>
            <FormInput
              style={{ marginTop: "20px" }}
              id="price_product"
              name="price_product"
              type="text"
              label="Giá tiền"
              required={true}
              value={dataPut.price_product}
              onChange={(e) => {
                setDataPut({ ...dataPut, price_product: e.target.value });
              }}
            />
            <span style={{ color: "red" }}>
              {error.price_product === "" ? null : error.price_product}
            </span>
          </Col>
          <Col span={11}>
            <FormInput
              style={{ marginTop: "20px" }}
              id="percent_product"
              name="percent_product"
              type="number"
              label="Khuyến mãi"
              value={dataPut.percent_product}
              placeholder="ví dụ: 20% nhập là 20"
              required={false}
              onChange={(e) => {
                setDataPut({ ...dataPut, percent_product: e.target.value });
              }}
            />
          </Col>
        </Row>
        <Row justify="space-between">
          <Col span={11}>
            <FormInput
              style={{ marginTop: "20px" }}
              id="brand_product"
              name="brand_product"
              type="text"
              label="Thương hiệu"
              value={dataPut.brand_product}
              required={true}
              onChange={(e) => {
                setDataPut({ ...dataPut, brand_product: e.target.value });
              }}
            />
            <span style={{ color: "red" }}>
              {error.brand_product === "" ? null : error.brand_product}
            </span>
          </Col>
          <Col span={11}>
            <FormInput
              style={{ marginTop: "20px" }}
              id="remain_product"
              value={dataPut.remain_product}
              name="remain_product"
              type="text"
              label="Số hàng trong kho"
              required={true}
              onChange={(e) => {
                setDataPut({ ...dataPut, remain_product: e.target.value });
              }}
            />
            <span style={{ color: "red" }}>
              {error.remain_product === "" ? null : error.remain_product}
            </span>
          </Col>
        </Row>
        <Row justify="space-between">
          <Col span={11}>
            <FormInputSelectSingle
              style={{ marginTop: "20px" }}
              id="cate_product"
              name="cate_product"
              value={dataPut.cate_product}
              type="text"
              label="Danh mục"
              required={true}
              option={listCate}
              onChange={(e) => {
                setDataPut({ ...dataPut, cate_product: e });
              }}
            />
            <span style={{ color: "red" }}>
              {error.cate_product === "" ? null : error.cate_product}
            </span>
          </Col>
          <Col span={11}>
            <FormInputSelect
              style={{ marginTop: "20px" }}
              id="tag_product"
              name="tag_product"
              type="text"
              label="Tags"
              required={false}
              value={dataPut.tag_product}
              option={listTag}
              onChange={(e) => {
                setDataPut({ ...dataPut, tag_product: e });
              }}
            />
            <span style={{ color: "red" }}>
              {error.tag_product === "" ? null : error.tag_product}
            </span>
          </Col>
        </Row>
        <Row justify="space-between">
          <Col span={11}>
            <FormInputSelect
              style={{ marginTop: "20px" }}
              id="size_product"
              name="size_product"
              type="text"
              label="Kích cỡ"
              value={dataPut.size_product}
              required={false}
              option={listSize}
              onChange={(e) => {
                setDataPut({ ...dataPut, size_product: e });
              }}
            />
            <span style={{ color: "red" }}>
              {error.size_product === "" ? null : error.size_product}
            </span>
          </Col>
          <Col span={11}>
            <FormInputSelect
              style={{ marginTop: "20px" }}
              id="color_product"
              name="color_product"
              type="text"
              label="Màu sắc"
              required={false}
              value={dataPut.color_product}
              option={listColor}
              onChange={(e) => {
                setDataPut({ ...dataPut, color_product: e });
              }}
            />
            <span style={{ color: "red" }}>
              {error.color_product === "" ? null : error.color_product}
            </span>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormInputTextArea
              style={{ marginTop: "20px" }}
              id="description_product"
              name="description_product"
              type="text"
              label="Tổng quan"
              value={dataPut.description_product}
              required={true}
              placeholder="ghi thông tin tổng quan về sản phẩm..."
              onChange={(e) => {
                setDataPut({ ...dataPut, description_product: e });
              }}
            />
            <span style={{ color: "red" }}>
              {error.description_product === ""
                ? null
                : error.description_product}
            </span>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormInputTextArea
              style={{ marginTop: "20px" }}
              id="material_product"
              name="material_product"
              type="text"
              label="Chất liệu"
              placeholder="ghi thông tin về chất liệu của sản phẩm..."
              required={true}
              value={dataPut.material_product}
              onChange={(e) => {
                setDataPut({ ...dataPut, material_product: e });
              }}
            />
            <span style={{ color: "red" }}>
              {error.material_product === "" ? null : error.material_product}
            </span>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <FormUpload
              style={{ marginTop: "20px", marginBottom: "10px" }}
              id="image_product"
              name="image_product"
              type="text"
              label="Hình ảnh (chú ý ảnh đầu sẽ là ảnh chính)"
              required={true}
              value={dataPut.image_product}
              onChange={(e) => {
                setDataPut({ ...dataPut, image_product: e });
              }}
            />
            <span style={{ color: "red" }}>
              {error.image_product === "" ? null : error.image_product}
            </span>
          </Col>
        </Row>
      </Modal>
    </HorizontalLayout>
  );
}
