import { configureStore } from "@reduxjs/toolkit";
import caseReducer from "./features/cases/caseSlice";
import heroReducer from "./features/hero/heroSlice";
import authReducer from "./features/auth/authSlice";
import serviceReducer from "./features/service/serviceSlice";

export const store = configureStore({
  reducer: {
    caseStudies: caseReducer,
    hero: heroReducer,
    auth: authReducer,
    services: serviceReducer,
  },
});
