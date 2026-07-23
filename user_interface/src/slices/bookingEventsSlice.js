// slices/bookingEventsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const bookingEventsSlice = createSlice({
  name: "bookingEvents",
  initialState: { lastEvent: null },
  reducers: {
    setLastBookingEvent: (state, action) => {
      state.lastEvent = {
        ...action.payload,
        receivedAt: Date.now(),
      };
    },
  },
});

export const { setLastBookingEvent } = bookingEventsSlice.actions;
export default bookingEventsSlice.reducer;
