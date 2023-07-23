import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from "redux";
import createMiddleWareSaga from "redux-saga";
import { rootSaga } from "./saga/root";
import categoryReducer from "./reducer/categoryReducer";
import userReducer from "./reducer/userReducer";
import brandReducer from "./reducer/brandReducer";
import colorReducer from "./reducer/colorReducer";
import sizeReducer from "./reducer/sizeReducer";
import productReducer from "./reducer/productReducer";
import orderDetailReducer from "./reducer/orderDetailReducer";
import orderReducer from "./reducer/orderReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  // tất cả reducer sẽ định nghĩa tại đây
  categoryReducer,
  productReducer,
  userReducer,
  orderDetailReducer,
  brandReducer,
  colorReducer,
  sizeReducer,
  orderReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const middleWareSaga = createMiddleWareSaga();
const store = createStore(persistedReducer, applyMiddleware(middleWareSaga));
const persistor = persistStore(store);
middleWareSaga.run(rootSaga);

export { store, persistor };
