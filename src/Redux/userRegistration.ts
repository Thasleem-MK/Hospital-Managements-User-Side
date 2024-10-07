import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FormData {
  name: string;
  email: string;
  mobile: string;
  password: string;
  confirmPassword: string;
}

interface UserState {
  formData: FormData;
  otpSent: boolean;
  otp: string;
  randomOtp: string;
}

const initialState: UserState = {
  formData: {
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  },
  otpSent: false,
  otp: "",
  randomOtp: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateFormData: (
      state,
      action: PayloadAction<{ field: keyof FormData; value: string }>
    ) => {
      state.formData[action.payload.field] = action.payload.value;
    },
    setOtpSent: (state, action: PayloadAction<boolean>) => {
      state.otpSent = action.payload;
    },
    setOtp: (state, action: PayloadAction<string>) => {
      state.otp = action.payload;
    },
    setRandomOtp: (state, action: PayloadAction<string>) => {
      state.randomOtp = action.payload;
    },
    resetForm: (state) => {
      state.formData = initialState.formData;
      state.otpSent = false;
      state.otp = "";
      state.randomOtp = "";
    },
  },
});

export const { updateFormData, setOtpSent, setOtp, setRandomOtp, resetForm } =
  userSlice.actions;
export default userSlice.reducer;