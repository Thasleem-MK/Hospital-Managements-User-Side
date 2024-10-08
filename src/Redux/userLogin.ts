import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// UserData interface
export interface UserData {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  isLogin: boolean;
}

// Initial state
const InitialState: UserData = {
  _id: "",
  name: "",
  email: "",
  password: "",
  phone: "",
  isLogin: false,
};

// Slice definition
const userLoginSlice = createSlice({
  name: "userLogin",
  initialState: InitialState,
  reducers: {
    // Update the entire user data
    updateUserData: (state, action: PayloadAction<UserData>) => {
      const { _id, name, email, password, phone } = action.payload;
      state._id = _id as string; // Convert string _id to ObjectId if necessary
      state.name = name;
      state.email = email;
      state.password = password;
      state.phone = phone;
      state.isLogin = true; // Automatically set isLogin to true on successful login
    },
    // Logout user and reset state
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

// Exporting the actions and the reducer
export const { updateUserData, logoutUser } = userLoginSlice.actions;
export default userLoginSlice.reducer;