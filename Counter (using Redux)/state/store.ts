// redux store

import { configureStore } from "@reduxjs/toolkit";

// import reducer from counterSlice
import counterReducer from './counter/counterSlice';


export const store = configureStore({
    reducer: { counter: counterReducer },
});


// Infer types from store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


