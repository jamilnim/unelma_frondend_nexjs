import { configureStore } from '@reduxjs/toolkit';
import caseReducer from './caseSlice';

export const store = configureStore({
  reducer: {
    caseStudies: caseReducer,
  },
});
