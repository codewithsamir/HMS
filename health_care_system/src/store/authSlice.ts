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
//             authdata2: builder.query<AuthState , number | void>({
//                 query(limit = 10){
//                     return `/user`
//                 },
//             }),
//         };
//     },
// });

// export const { useAuthdataQuery} = authSlice;




import { account } from "@/models/client/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { OAuthProvider } from "appwrite";

interface User {
    $id: string;
    name: string;
    email: string;
    [key: string]: any;
}

interface AuthState {
    user: User | null;
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
                    return { data: { user,  isUserLogin: true } };
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
        byGoogle: builder.mutation<{ success: boolean; message: string }, void>({
            async queryFn() {
                try {
                    await account.createOAuth2Session(
                        OAuthProvider.Google, // provider
                        'https://probable-space-sniffle-445j9g59qvjc97v-3000.app.github.dev/User', // redirect here on success
                        'https://probable-space-sniffle-445j9g59qvjc97v-3000.app.github.dev/fail', // redirect here on failure
                        [] // scopes (optional)
                    );
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
export const { useGetUserQuery, useRegisterUserMutation, useLoginUserMutation, useLogoutUserMutation,useByGoogleMutation } = authSlice;



