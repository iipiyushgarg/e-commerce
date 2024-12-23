import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { Action } from "@reduxjs/toolkit";
import { dashboardApi } from "../Services/api";
import { AppSlice } from "./AppSlice";

interface CombinedRootState {
  app: ReturnType<typeof AppSlice.reducer>;
  [dashboardApi.reducerPath]: ReturnType<typeof dashboardApi.reducer>;
}

type RootAction = Action<string>;

const combinedReducers = combineReducers({
  app: AppSlice.reducer,
  [dashboardApi.reducerPath]: dashboardApi.reducer,
});

const rootReducer = (
  state: CombinedRootState | undefined,
  action: RootAction
): CombinedRootState => {
  return combinedReducers(state, action);
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(dashboardApi.middleware),
});

setupListeners(store.dispatch);

export default store;
