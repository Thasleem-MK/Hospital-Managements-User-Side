import { configureStore } from "@reduxjs/toolkit";
import userRegistrationSlice from "./userRegistration";
import userLoginSlice from "./userData";
import hospitalSlice from "./HospitalsData";
import ambulaceData from "./AmbulanceData";

export const store = configureStore({
  reducer: {
    userRegistration: userRegistrationSlice,
    userLogin: userLoginSlice,
    hospitalData: hospitalSlice,
    ambulanceData: ambulaceData,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
