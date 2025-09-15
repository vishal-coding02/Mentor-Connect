import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducer/LogingReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
