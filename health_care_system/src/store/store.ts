import {configureStore} from "@reduxjs/toolkit"
import {authSlice} from "./authSlice"


export const store = configureStore({
    reducer:{
        // auth:authSlice,
        [authSlice.reducerPath] :authSlice.reducer,

    },
    middleware: (getDefaultMiddleware) =>{
        return getDefaultMiddleware().concat(authSlice.middleware);
    }
})

export type AppDispatch = typeof store.dispatch;

export type Rootstate = ReturnType<typeof store.getState>;