import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import themeReducer from "./slices/themeSlice";
import recentlyVisitedReducer from "./slices/recentlyVisitedSlice";
import { apiSlice } from "./slices/apiSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    recentlyVisited: recentlyVisitedReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
