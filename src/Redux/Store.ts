import { configureStore } from "@reduxjs/toolkit";
import userRegistrationSlice from "./userRegistration";
import userLoginSlice from "./userData";
import hospitalSlice from "./HospitalsData";

export const store = configureStore({
  reducer: {
    userRegistration: userRegistrationSlice,
    userLogin: userLoginSlice,
    hospitalData: hospitalSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
