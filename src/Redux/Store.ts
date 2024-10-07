import { configureStore } from "@reduxjs/toolkit";
import userRegistrationSlice from "./userRegistration";

export const store = configureStore({
  reducer: {
    userRegister: userRegistrationSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
