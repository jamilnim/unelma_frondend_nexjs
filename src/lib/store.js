import { configureStore } from "@reduxjs/toolkit";
import caseReducer from "./features/cases/caseSlice";
import heroReducer from "./../lib/features/hero/heroSlice";
import authReducer from "./features/auth/authSlice";

export const store = configureStore({
  reducer: {
    caseStudies: caseReducer,
    hero: heroReducer,
    auth: authReducer,
  },
});
