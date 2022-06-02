import { configureStore } from '@reduxjs/toolkit';

import counterReducer from './counter/counterSlice';
import titleReducer from './title/titleSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    title: titleReducer,
  }
})