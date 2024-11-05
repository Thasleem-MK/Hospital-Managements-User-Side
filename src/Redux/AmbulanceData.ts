import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AmbulanceService {
  _id: string;
  address: string;
  email: string;
  latitude: string;
  longitude: string;
  password: string;
  phone: string;
  serviceName: string;
  vehicleType: string;
  __v: number;
}

const initialState: AmbulanceService[] = [];
const ambulanceSlice = createSlice({
  name: "ambulances",
  initialState,
  reducers: {
    setAmbulances: (_state, action: PayloadAction<AmbulanceService[]>) => {
      return action.payload;
    },
  },
});

export const { setAmbulances } = ambulanceSlice.actions;

export default ambulanceSlice.reducer;
