import { takeLatest, put } from "redux-saga/effects";
import {
  CREATE_ORDER_PRODUCT_SAGA,
  DELETE_ORDER_DETAIL_SAGA,
  GET_ALL_ORDER_MANAGER_SAGA,
  GET_ORDER_DETAIL_ADMIN_SAGA,
  GET_ORDER_DETAIL_SAGA,
  ORDER_DETAIL_SAGA,
} from "../type";
import {
  createOrder,
  deleteOrderDetail,
  getAllOrderDetail,
  getOrderAdmin,
  getOrderManager,
  orderDetail,
  updateRating,
  updateStatusOrder,
} from "../../services/orderDetailService";

function* createOrderDetailSaga(action) {
  try {
    let promise = yield orderDetail(action.data);
    if (promise.status === 201) {
      yield put({
        type: ORDER_DETAIL_SAGA,
        data: "201",
      });
    }
  } catch (error) {
    yield put({
      type: ORDER_DETAIL_SAGA,
      data: "400",
    });
  }
}

function* getAllOrderDetailSaga() {
  try {
    let promise = yield getAllOrderDetail();
    yield put({
      type: GET_ORDER_DETAIL_SAGA,
      data: promise.data,
    });
  } catch (error) {}
}

function* deleteOrderDetailSaga(action) {
  try {
    yield deleteOrderDetail(action.data);
    yield getAllOrderDetail();
    yield put({
      type: DELETE_ORDER_DETAIL_SAGA,
      data: "200",
    });
  } catch (error) {}
}

function* createOrderSaga(action) {
  try {
    const promise = yield createOrder(action.data);
    if (promise.status === 201) {
      yield put({
        type: CREATE_ORDER_PRODUCT_SAGA,
        data: true,
      });
    }
  } catch (error) {}
}

function* getOrderManagerSaga(action) {
  try {
    const promise = yield getOrderManager();
    yield put({
      type: GET_ALL_ORDER_MANAGER_SAGA,
      data: promise.data,
    });
  } catch (error) {}
}

function* updateRatingSaga(action) {
  try {
    yield updateRating(action.data);
  } catch (error) {}
}

function* getAllOrderAdminSaga(action) {
  try {
    const promise = yield getOrderAdmin();
    if (promise) {
      yield put({
        type: GET_ORDER_DETAIL_ADMIN_SAGA,
        data: promise.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_ORDER_DETAIL_ADMIN_SAGA,
      data: [],
    });
  }
}

function* updateOrderBrowseSaga(action) {
  try {
    yield updateStatusOrder(action.data);
  } catch (error) {}
}

export function* orderDetailSaga() {
  yield takeLatest("ORDER_DETAIL", createOrderDetailSaga);
  yield takeLatest("CREATE_ORDER", createOrderSaga);
  yield takeLatest("GET_ALL_ORDER_DETAIL", getAllOrderDetailSaga);
  yield takeLatest("DELETE_ORDER_DETAIL", deleteOrderDetailSaga);
  yield takeLatest("GET_ALL_ORDER_MANAGER", getOrderManagerSaga);
  yield takeLatest("UPDATE_RATING_ORDER", updateRatingSaga);
  yield takeLatest("GET_ALL_ORDER_DETAIL_ADMIN", getAllOrderAdminSaga);
  yield takeLatest("ORDER_BROWSING", updateOrderBrowseSaga);
}
