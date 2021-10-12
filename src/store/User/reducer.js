import { createSlice } from "@reduxjs/toolkit";
import { fetchAllUsers } from "../../services/users.service";

const initialState = {
  users: [],
  user: {}
};

export const UsersSlice = createSlice({
  name: "Users",
  initialState,
  reducers: {
    setUser(s,a) {
      s.user = a.payload || s.user;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllUsers.fulfilled, (s, a) => {
      s.users = a.payload; 
    });
  }
});

export const { setUser } = UsersSlice.actions;
