import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserData {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  isLogin: boolean;
}

const InitialState: UserData = {
  _id: "",
  name: "",
  email: "",
  password: "",
  phone: "",
  isLogin: false,
};

const userLoginSlice = createSlice({
  name: "userLogin",
  initialState: InitialState,
  reducers: {
    updateUserData: (state, action: PayloadAction<UserData>) => {
      const { _id, name, email, password, phone } = action.payload;
      state._id = _id as string;
      state.name = name;
      state.email = email;
      state.password = password;
      state.phone = phone;
      state.isLogin = true;
    },

    logoutUser: (state) => {
      state._id = "";
      state.name = "";
      state.email = "";
      state.password = "";
      state.phone = "";
      state.isLogin = false;
    },
  },
});

export const { updateUserData, logoutUser } = userLoginSlice.actions;
export default userLoginSlice.reducer;