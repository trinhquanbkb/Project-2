import { takeLatest, put } from "redux-saga/effects";
import {
  CREATE_PRODUCT_SAGA,
  GET_ALL_ATTRIBUTE_SAGA,
  GET_ALL_PRODUCT,
  GET_ALL_PRODUCT_SALE,
  GET_NEW_PRODUCT,
  GET_PRODUCT_CATE,
  GET_PRODUCT_SEARCH,
} from "../type";
import {
  createProduct,
  getAllAttribute,
  getAllProduct,
  getAllProductSale,
  getNewProduct,
  getProductByCate,
  getProductByName,
  uploadImage,
} from "../../services/productService";

function* getProducts() {
  try {
    let promise = yield getAllProduct();
    yield put({
      type: GET_ALL_PRODUCT,
      data: promise.data,
    });
  } catch (error) {}
}

function* getProductSale() {
  try {
    let promise = yield getAllProductSale();
    yield put({
      type: GET_ALL_PRODUCT_SALE,
      data: promise.data,
    });
  } catch (error) {}
}

function* getProductNew() {
  try {
    let promise = yield getNewProduct();
    yield put({
      type: GET_NEW_PRODUCT,
      data: promise.data,
    });
  } catch (error) {}
}

function* getProductCateID(action) {
  try {
    let promise = yield getProductByCate(action.data);
    yield put({
      type: GET_PRODUCT_CATE,
      data: promise.data,
    });
  } catch (error) {
    yield put({
      type: GET_PRODUCT_CATE,
      data: [],
    });
  }
}

function* getProductByNameSaga(action) {
  try {
    let promise = yield getProductByName({ name: action.data });
    yield put({
      type: GET_PRODUCT_SEARCH,
      data: promise.data,
    });
  } catch (error) {
    yield put({
      type: GET_PRODUCT_SEARCH,
      data: [],
    });
  }
}

function* getAllAttrSaga() {
  try {
    let promise = yield getAllAttribute();
    yield put({
      type: GET_ALL_ATTRIBUTE_SAGA,
      data: promise.data,
    });
  } catch (error) {
    yield put({
      type: GET_ALL_ATTRIBUTE_SAGA,
      data: {},
    });
  }
}

function* createProductSaga(action) {
  try {
    let data = {
      name_product: action.data.name_product,
      description_detail: action.data.description_product,
      price: parseInt(action.data.price_product),
      percent_sale: parseInt(action.data.percent_product),
      cate_products_id: parseInt(action.data.cate_product),
      remain: parseInt(action.data.remain_product),
      brand: action.data.brand_product,
      listColor: action.data.color_product,
      listSize: action.data.size_product,
      listTag: action.data.tag_product,
      material: action.data.material_product,
    };
    let promise = yield createProduct(data);
    yield uploadImage({
      id: promise.data.id,
      file: action.data.image_product[0],
      isMain: "true",
    });
    if (action.data.image_product.length > 1) {
      for (let i = 1; i < action.data.image_product.length; i++) {
        yield uploadImage({
          id: promise.data.id,
          file: action.data.image_product[i],
          isMain: "false",
        });
      }
    }
    yield put({
      type: CREATE_PRODUCT_SAGA,
      data: "201",
    });
  } catch (error) {
    yield put({
      type: CREATE_PRODUCT_SAGA,
      data: "500",
    });
  }
}

export function* productSaga() {
  yield takeLatest("GET_PRODUCTS", getProducts);
  yield takeLatest("GET_PRODUCT_SALE", getProductSale);
  yield takeLatest("GET_ALL_NEW_PRODUCT", getProductNew);
  yield takeLatest("GET_PRODUCT_BY_CATEID", getProductCateID);
  yield takeLatest("GET_PRODUCT_BY_NAME", getProductByNameSaga);
  yield takeLatest("GET_ALL_ATTRIBUTE", getAllAttrSaga);
  yield takeLatest("CREATE_PRODUCT", createProductSaga);
}
