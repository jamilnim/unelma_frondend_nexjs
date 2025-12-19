// src/lib/features/startupIdea/builderSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mother: {
    industry: null,
    user: null,
    problem: null,
    time: null,
    budget: null,
  },
  userInfo: {
    name: "",
    email: "",
    contact: "",
  },
};

const builderSlice = createSlice({
  name: "builder",
  initialState,
  reducers: {
    setMotherField(state, action) {
      const { key, value } = action.payload;
      state.mother[key] = value;
    },
    removeMotherField(state, action) {
      const key = action.payload;
      state.mother[key] = null;
    },
    setUserInfo(state, action) {
      const { key, value } = action.payload;
      state.userInfo[key] = value;
    },
  },
});

export const { setMotherField, removeMotherField, setUserInfo } =
  builderSlice.actions;
export default builderSlice.reducer;
