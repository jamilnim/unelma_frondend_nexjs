import { configureStore } from '@reduxjs/toolkit';
import caseReducer from './features/cases/caseSlice'; // for case list
import caseDetailReducer from './features/cases/caseDetailSlice'; // for single case detail
import heroReducer from './features/hero/heroSlice';
import authReducer from "./features/auth/authSlice";
import productReducer from "./features/product/productSlice";
import reviewReducer from "./features/product/reviewSlice";
import customerFeedbackReducer from "./features/customerFeedback/customerfeedbackSlice";
import inquiryReducer from "./features/inquiry/inquirySlice";
import aboutReducer from "./features/about/aboutSlice";
import serviceReducer from "./features/service/serviceSlice";
import appointmentsReducer from "./features/appointments/appointmentsSlice";

export const store = configureStore({
  reducer: {
    caseStudies: caseReducer,      // existing slice for cards
    caseDetail: caseDetailReducer,  // new slice for case detail page
    hero: heroReducer,              // existing hero slice
    auth: authReducer,
    product: productReducer,
    reviews: reviewReducer,
    customerFeedback: customerFeedbackReducer,
    inquiry: inquiryReducer,
    about: aboutReducer,
    services: serviceReducer,
    appointments: appointmentsReducer,
  },
});
