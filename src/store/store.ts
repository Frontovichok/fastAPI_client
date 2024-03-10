import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./services/UserSlice";
import { postAPI } from "./services/post";
import { TypedUseSelectorHook } from "react-redux";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { api } from "./services/auth";
import auth from "../features/auth/AuthSlice";

const rootReducer = combineReducers({
  userReducer,
  [postAPI.reducerPath]: postAPI.reducer,
  [api.reducerPath]: api.reducer,
  auth,
});

export const setupStore = () => {
  return configureStore({
    // Добавляем редьюсер как слайс
    reducer: rootReducer,
    // Добавляем апи мидлвар, что даст нам кэширование, инвалидацию, полинг,
    // и другие полезные штуки
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(postAPI.middleware, api.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
