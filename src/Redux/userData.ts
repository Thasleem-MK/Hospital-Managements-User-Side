import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserData {
  _id?: string;
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
  latitude?: number;
  longitude?: number;
}

const InitialState: UserData = {
  _id: "",
  name: "",
  email: "",
  password: "",
  phone: "",
};

const userLoginSlice = createSlice({
  name: "userLogin",
  initialState: InitialState,
  reducers: {
    updateUserData: (state, action: PayloadAction<UserData>) => {
      const { _id, name, email, password, phone,latitude,longitude } = action.payload;
      state._id = _id as string || state._id;
      state.name = name || state.name;
      state.email = email||state.email;
      state.password = password || state.password;
      state.phone = phone || state.phone;
      state.latitude = latitude || state.latitude;
      state.longitude = longitude || state.longitude;
    },

    logoutUser: (state) => {
      state._id = "";
      state.name = "";
      state.email = "";
      state.password = "";
      state.phone = "";
    },
  },
});

export const { updateUserData, logoutUser } = userLoginSlice.actions;
export default userLoginSlice.reducer;