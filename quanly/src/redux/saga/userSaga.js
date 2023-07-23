import { takeLatest, put } from "redux-saga/effects";
import {
  getUserInfor,
  loginUserInfor,
  registerUserInfor,
  loginAdminInfor,
} from "../../services/userService";
import { TOKEN_ADMIN, TOKEN_USER } from "../../util/const/data";
import {
  LOGIN_ADMIN_SAGA,
  LOGIN_USER,
  REGISTER_USER,
  USER_INFO_SAGA,
} from "../type";

function* loginUserSaga(action) {
  try {
    let promiseUser = yield loginUserInfor(
      action.data.email,
      action.data.password
    );
    if (promiseUser.data.type === "user") {
      localStorage.setItem(TOKEN_USER, promiseUser.data.token);
      yield put({
        type: LOGIN_USER,
        data: "200",
      });
    }
  } catch (error) {
    localStorage.clear();
    yield put({
      type: LOGIN_USER,
      data: "401",
    });
  }
}

function* loginAdminSaga(action) {
  try {
    let promiseUser = yield loginAdminInfor(
      action.data.email,
      action.data.password
    );
    if (promiseUser.data.type === "admin") {
      localStorage.setItem(TOKEN_ADMIN, promiseUser.data.token);
      yield put({
        type: LOGIN_ADMIN_SAGA,
        data: "200",
      });
    }
  } catch (error) {
    localStorage.clear();
    yield put({
      type: LOGIN_ADMIN_SAGA,
      data: "401",
    });
  }
}

function* registerUserSaga(action) {
  try {
    let promiseUser = yield registerUserInfor(action.data);
    if (promiseUser.status === 201) {
      let login = yield loginUserInfor(action.data.email, action.data.password);
      if (login) {
        localStorage.setItem(TOKEN_USER, login.data.token);
        yield put({
          type: REGISTER_USER,
          data: "201",
        });
      }
    }
  } catch (error) {
    yield put({
      type: REGISTER_USER,
      data: "500",
    });
  }
}

function* getUserInfoSaga() {
  try {
    let promiseUser = yield getUserInfor();
    yield put({
      type: USER_INFO_SAGA,
      data: promiseUser.data,
    });
  } catch (error) {
    yield put({
      type: USER_INFO_SAGA,
      data: {},
    });
  }
}

export function* userSaga() {
  yield takeLatest("LOGIN", loginUserSaga);
  yield takeLatest("LOGIN_ADMIN", loginAdminSaga);
  yield takeLatest("REGISTER", registerUserSaga);
  yield takeLatest("GET_USER_INFO", getUserInfoSaga);
}
