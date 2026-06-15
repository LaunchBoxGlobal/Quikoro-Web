// redux/signup/signupSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullName: "",
  email: "",
  role: "",
  password: "",
  confirmPassword: "",
  otp: "",
};

const authSlice = createSlice({
  name: "signup",
  initialState,

  reducers: {
    setSignupData: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },

    clearSignupData: () => initialState,
  },
});

export const { setSignupData, clearSignupData } = authSlice.actions;

export default authSlice.reducer;
