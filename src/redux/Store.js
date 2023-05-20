import { configureStore } from "@reduxjs/toolkit";
import ReduxSlice from './Slice.js'

export const store = configureStore({
    reducer:{
        festiv:ReduxSlice
    }
})