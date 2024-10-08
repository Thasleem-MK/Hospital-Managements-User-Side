import { configureStore } from "@reduxjs/toolkit";
import userRegistrationSlice from "./userRegistration";
import userLoginSlice from "./userLogin";

export const store = configureStore({
  reducer: {
    userRegistration: userRegistrationSlice,
    userLogin: userLoginSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
