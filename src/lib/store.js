import { configureStore } from "@reduxjs/toolkit";
import caseReducer from "./features/cases/caseSlice";
import heroReducer from "./../lib/features/hero/heroSlice";
import authReducer from "./features/auth/authSlice";

export const store = configureStore({
  reducer: {
    caseStudies: caseReducer,      // existing slice for cards
    caseDetail: caseDetailReducer,  // new slice for case detail page
    hero: heroReducer,              // existing hero slice
    auth: authReducer,
  },
});
