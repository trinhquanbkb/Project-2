import {
  GET_CHART_USER_SAGA,
  LOGIN_ADMIN_SAGA,
  REGISTER_ADMIN_SAGA,
  REGISTER_USER,
  USER_INFO_SAGA,
} from "../type";

const userData = {
  statusLogin: "",
  statusRegister: "",
  statusRegisterAdmin: "",
  userInfo: null,
  chartUser: [],
};

const userReducer = (state = userData, action) => {
  switch (action.type) {
    case LOGIN_ADMIN_SAGA: {
      if (action.data === "200") {
        state.statusLogin = true;
      } else if (action.data === "401") {
        state.statusLogin = false;
      } else {
        state.statusLogin = "";
      }
      return { ...state };
    }
    case REGISTER_USER: {
      if (action.data === "201") {
        state.statusRegister = true;
      } else if (action.data === "500") {
        if (state.statusRegister === "") {
          state.statusRegister = false;
        } else if (state.statusRegister === false) {
          state.statusRegister = "error";
        } else if (state.statusRegister === "error") {
          state.statusRegister = false;
        } else {
          state.statusRegister = "";
        }
      }
      return { ...state };
    }
    case USER_INFO_SAGA: {
      state.userInfo = { ...action.data };
      return { ...state };
    }
    case GET_CHART_USER_SAGA: {
      let array = [];
      action.data.forEach((item) => {
        array.push({
          month: "Tháng " + item.month,
          totalUser: item.totalUser,
        });
      });
      state.chartUser = [...array];
      return { ...state };
    }
    case REGISTER_ADMIN_SAGA: {
      if (action.data === "201") {
        state.statusRegisterAdmin = true;
      } else if (action.data === "500") {
        state.statusRegisterAdmin = false;
      } else {
        state.statusRegisterAdmin = "";
      }
      return { ...state };
    }
    default: {
      return { ...state };
    }
  }
};

export default userReducer;
