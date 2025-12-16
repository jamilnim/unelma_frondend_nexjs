import { createSlice } from "@reduxjs/toolkit";

let savedUser = null;

if (typeof window !== "undefined") {
  savedUser = JSON.parse(localStorage.getItem("user"));
}

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: savedUser || null,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(action.payload));
      }
    },
    logoutUser(state) {
      state.user = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
      }
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
