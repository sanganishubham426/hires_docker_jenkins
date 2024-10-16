import { configureStore } from '@reduxjs/toolkit'
import Slice from './Slice'
import APISlice from './APISlice'

const store = configureStore({
  reducer: {
    hires: Slice,
    API: APISlice
  }
})

export default store