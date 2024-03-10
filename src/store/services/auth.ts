import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ILogin } from "../../models/ILogin";

export const api = createApi({
  reducerPath: "authAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://127.0.0.1:8001",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/x-www-form-urlencoded");
      return headers;
    },
    credentials: "include", // This allows server to set cookies
  }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    login: builder.mutation<void, ILogin>({
      query: (creds) => ({
        url: "/auth/jwt/login",
        method: "POST",
        headers: {
          accept: "application/json, text/plain, */*",
        },
        body: `username=${encodeURI(creds.username)}&password=${encodeURI(
          creds.password
        )}`,
      }),
      invalidatesTags: ["Auth"],
    }),
    userData: builder.query<any, void>({
      query: () => {
        console.log("in userData: ");
        return {
          url: "/users/me",
        };
      },
    }),
    logout: builder.mutation<any, void>({
      query: () => {
        console.log("logout auth.ts");
        return {
          url: "/auth/jwt/logout",
          method: "POST",
        };
      },
    }),
  }),
});

export const { useLoginMutation, useLazyUserDataQuery, useLogoutMutation } =
  api;
