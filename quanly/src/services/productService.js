import Axios from "axios";
import { DOMAIN_SERVER, TOKEN_ADMIN } from "../util/const/data";

export const getAllProduct = async () => {
  return await Axios.get(`${DOMAIN_SERVER}/products/get-all-product`);
};

export const getAllProductSale = async () => {
  return await Axios.get(`${DOMAIN_SERVER}/products/get-all-product-sale`);
};

export const getNewProduct = async () => {
  return await Axios.get(`${DOMAIN_SERVER}/products/get-new-product`);
};

export const getProductByCate = async (id) => {
  return await Axios.get(`${DOMAIN_SERVER}/products/get-product-by-cateid`, {
    params: { id: id },
  });
};

export const getProductByName = async ({ name }) => {
  return await Axios.get(`${DOMAIN_SERVER}/products/get-product-by-name`, {
    params: { name: name },
  });
};

export const getAllAttribute = async () => {
  return await Axios.get(`${DOMAIN_SERVER}/products/get-all-attr`);
};

export const createProduct = async (data) => {
  return await Axios.post(`${DOMAIN_SERVER}/products/create-product`, data, {
    headers: {
      token: localStorage.getItem(TOKEN_ADMIN),
    },
  });
};

export const uploadImage = async ({ id, file, isMain }) => {
  const formData = new FormData();
  formData.append("file", file);
  return await Axios.post(
    `${DOMAIN_SERVER}/products/upload-image-product?id=${id}&isMain=${isMain}`,
    formData,
    {
      headers: {
        token: localStorage.getItem(TOKEN_ADMIN),
        "Content-Type": "multipart/form-data",
      },
    }
  );
};
