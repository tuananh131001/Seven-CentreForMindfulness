import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../src/features/sample'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
})