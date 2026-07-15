import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import createWebStorage from "redux-persist/es/storage/createWebStorage";

import userReducer from "../services/authApi/userSlice";
import { authApi } from "../services/authApi/authApi";
import { userApi } from "../services/userApi/userApi";
import { categoryApi } from "../services/categoryApi/categoryApi";
import { reportApi } from "../services/reportApi/reportApi";
import { dashboardApi } from "../services/dashboardApi/dashboardApi";
import { serviceApi } from "../services/serviceApi/serviceApi";
import { bookingApi } from "../services/bookingApi/bookingApi";

const storage = createWebStorage("local");

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const rootReducer = combineReducers({
  user: userReducer,

  [authApi.reducerPath]: authApi.reducer,
  [dashboardApi.reducerPath]: dashboardApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [reportApi.reducerPath]: reportApi.reducer,
  [serviceApi.reducerPath]: serviceApi.reducer,
  [bookingApi.reducerPath]: bookingApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(
      authApi.middleware,
      dashboardApi.middleware,
      userApi.middleware,
      categoryApi.middleware,
      reportApi.middleware,
      serviceApi.middleware,
      bookingApi.middleware,
    ),
});

export const persistor = persistStore(store);
