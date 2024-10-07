import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import contacts from "./contacts";
import filters from "./filters";
import { authReducer } from "./auth/slice"; // Import the auth reducer
import { combineReducers } from "redux";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["contacts"], // Add auth here if you want to persist auth
};

const rootReducer = combineReducers({
  contacts: contacts.reducer,
  filters: filters.reducer,
  auth: authReducer, // Add auth reducer to the combined reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export default {
  store,
  persistor,
  actions: { ...contacts.actions, ...filters.actions },
};
