interface ConsultingSchedule {
  day: string;
  start_time: string;
  end_time: string;
}

interface Doctor {
  name: string;
  consulting: ConsultingSchedule[];
}

interface Specialty {
  name: string;
  description: string;
  department_info: string;
  phone: string;
  doctors: Doctor[];
}

export interface Review {
  _id?: string;
  user_name: string;
  rating: number;
  comment: string;
  date: string;
}

export interface WorkingHours {
  day: string;
  opening_time: string;
  closing_time: string;
  is_holiday: boolean;
}

interface Booking {
  user_name: string;
  mobile: string;
  email: string;
  specialty: string;
  doctor_name: string;
  booking_date: string;
  booking_time: string;
  status: "pending" | "accepted" | "declined";
}

export interface Hospital {
  _id?: string;
  name: string;
  address: string;
  password: string;
  phone: string;
  email: string;
  emergencyContact?: string;
  image: { imageUrl: string; public_id: string };
  latitude?: number;
  longitude?: number;
  about?: string;
  working_hours: WorkingHours[];
  reviews: Review[];
  specialties: Specialty[];
  booking: Booking[];
}

export interface HospitalState {
  hospitals: Hospital[];
}

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: HospitalState = {
  hospitals: [],
};

const hospitalSlice = createSlice({
  name: "hospital",
  initialState,
  reducers: {
    setHospitalData: (state, action: PayloadAction<{ data: Hospital[] }>) => {
      state.hospitals = action.payload.data;
    },
  },
});

export const { setHospitalData } = hospitalSlice.actions;

export default hospitalSlice.reducer;
