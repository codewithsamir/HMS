// import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

// interface AuthState {
//     user: object ; 
   
// }



// export const authSlice = createApi({
//     reducerPath:'api',
//     baseQuery: fetchBaseQuery({
//         baseUrl:String(process.env.NEXT_PUBLIC_APPWRITE_HOST_URL),
//         prepareHeaders(headers){
//             headers.set('x-api-key',String(process.env.APPWRITE_API_KEY));
//             return headers;
//         }
//     }),
//     endpoints(builder){
//         return{
//             authdata: builder.query<AuthState , number | void>({
//                 query(limit = 10){
//                     return `/account`
//                 },
//             }),
//         };
//     },
// });

// export const { useAuthdataQuery} = authSlice;




import { account } from "@/models/client/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface User {
    $id: string;
    name: string;
    email: string;
    [key: string]: any;
}

interface AuthState {
    user: User | null;
    error: string | null;
    isLoading: boolean;
    isUserLogin: boolean;
}

export const authSlice = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_APPWRITE_HOST_URL as string,
        prepareHeaders(headers) {
            headers.set("x-api-key", process.env.APPWRITE_API_KEY as string);
            return headers;
        },
    }),
    tagTypes: ["Auth"],
    endpoints: (builder) => ({
        getUser: builder.query<AuthState, void>({
            async queryFn() {
                try {
                    const user = await account.get();
                    return { data: { user, error: null, isLoading: false, isUserLogin: true } };
                } catch (error: any) {
                    return { error: { status: "CUSTOM_ERROR", error: error.message || "Failed to fetch user" } };
                }
            },
        }),
        registerUser: builder.mutation<{ success: boolean; message: string }, { email: string; password: string; name: string }>({
            async queryFn({ email, password, name }) {
                try {
                    const newUser = await account.create("unique()", email, password, name);
                    return { data: { success: true, message: "User registered successfully!" } };
                } catch (error: any) {
                    return { error: { status: "CUSTOM_ERROR", error: error.message || "Registration failed" } };
                }
            },
        }),
        loginUser: builder.mutation<{ success: boolean; message: string }, { email: string; password: string }>({
            async queryFn({ email, password }) {
                try {
                    await account.createEmailPasswordSession(email, password);
                    return { data: { success: true, message: "Login successful!" } };
                } catch (error: any) {
                    return { error: { status: "CUSTOM_ERROR", error: error.message || "Login failed" } };
                }
            },
        }),
        logoutUser: builder.mutation<{ success: boolean }, void>({
            async queryFn() {
                try {
                    await account.deleteSession("current");
                    return { data: { success: true } };
                } catch (error: any) {
                    return { error: { status: "CUSTOM_ERROR", error: error.message || "Logout failed" } };
                }
            },
        }),
    }),
});

// Export hooks
export const { useGetUserQuery, useRegisterUserMutation, useLoginUserMutation, useLogoutUserMutation } = authSlice;



