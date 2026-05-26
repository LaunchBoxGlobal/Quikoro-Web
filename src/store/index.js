import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { persistReducer, persistStore } from "redux-persist";

// import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import createWebStorage from "redux-persist/es/storage/createWebStorage";

import signupReducer from "../services/authApi/authSlice";
import userReducer from "../services/userService/userSlice";

import { authApi } from "../services/authApi/authApi";
import { serviceApi } from "../services/serviceApi/serviceApi";
import { bookingApi } from "../services/bookingApi/bookingApi";
import { categoryApi } from "../services/categoryApi/categoryApi";
import { userApi } from "../services/userService/userApi";
import { settingsApi } from "../services/settingsApi/settingsApi";

// Safe storage for Vite/SSR
const storage = createWebStorage("local");

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["signup", "user"],
};

const rootReducer = combineReducers({
  signup: signupReducer,
  user: userReducer,

  [authApi.reducerPath]: authApi.reducer,
  [serviceApi.reducerPath]: serviceApi.reducer,
  [bookingApi.reducerPath]: bookingApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [settingsApi.reducerPath]: settingsApi.reducer,
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
      serviceApi.middleware,
      bookingApi.middleware,
      categoryApi.middleware,
      userApi.middleware,
      settingsApi.middleware,
    ),
});

export const persistor = persistStore(store);
