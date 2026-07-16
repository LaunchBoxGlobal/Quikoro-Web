import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookings: {},
};

const chatNotifications = createSlice({
  name: "chatNotifications",
  initialState,

  reducers: {
    addChatNotification: (state, action) => {
      const { bookingId, notification } = action.payload;

      if (!bookingId) return;

      if (!state.bookings[bookingId]) {
        state.bookings[bookingId] = [];
      }

      state.bookings[bookingId].push(notification);
    },

    clearBookingNotifications: (state, action) => {
      delete state.bookings[action.payload];
    },
  },
});

export const { addChatNotification, clearBookingNotifications } =
  chatNotifications.actions;

export default chatNotifications.reducer;
