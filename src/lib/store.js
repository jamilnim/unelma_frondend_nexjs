import { configureStore } from '@reduxjs/toolkit';
import caseReducer from './features/cases/caseSlice';

export const store = configureStore({
  reducer: {
    caseStudies: caseReducer,
  },
});
