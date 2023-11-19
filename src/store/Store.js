import { configureStore } from '@reduxjs/toolkit';
import parliamentReducer from '../slices/ParliamentSlice';

const Store = configureStore({
  reducer: {
    parliament: parliamentReducer,
  },
});
export default Store;