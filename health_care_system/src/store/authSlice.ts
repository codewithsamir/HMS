import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query'

interface AuthState {
    user: object ; 
    error: string;
    isLoading: boolean;
    isUserLogin: boolean;
}

// const initialState: AuthState = {
//     user:{},
//     error:"",
//     isLoading:false,
//     isUserLogin:false,
// }

export const authSlice = createApi({
    reducerPath:'api',
    baseQuery: fetchBaseQuery({
        baseUrl:String(process.env.NEXT_PUBLIC_APPWRITE_HOST_URL),
        prepareHeaders(headers){
            headers.set('x-api-key',String(process.env.APPWRITE_API_KEY));
            return headers;
        }
    }),
    endpoints(builder){
        return{
            fetchBreeds: builder.query<AuthState , number | void>({
                query(limit = 10){
                    return `/account`
                },
            }),
        };
    },
});

export const { use} = authSlice;


