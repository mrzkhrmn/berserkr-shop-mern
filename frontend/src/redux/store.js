import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice.js";
import categoryReducer from "./category/categorySlice.js";
import productReducer from "./products/productSlice.js";
import cartReducer from "./cart/cartSlice.js";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  user: userReducer,
  category: categoryReducer,
  product: productReducer,
  cart: cartReducer,
});

const persistConfig = { key: "root", storage, version: 1 };

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
