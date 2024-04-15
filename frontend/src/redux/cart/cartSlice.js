import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = { cartItems: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const existItem = state.cartItems.find((i) => i.size === item.size);

      if (existItem) {
        state.cartItems = state.cartItems.map((i) =>
          i.size === existItem.size ? item : i
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      return updateCart(state);
    },
    deleteItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.size !== action.payload.size
      );
      updateCart(state);
    },
    increaseQuantity: (state, action) => {
      const item = action.payload;

      const existItem = state.cartItems.find((i) => i.size === item.size);

      existItem.quantity += 1;
      return updateCart(state);
    },
    decrementQuantity: (state, action) => {
      const item = action.payload;

      const existItem = state.cartItems.find((i) => i.size === item.size);
      existItem.quantity -= 1;
      if (existItem.quantity < 1) {
        state.cartItems = state.cartItems.filter(
          (item) => item.size !== action.payload.size
        );
      }
      return updateCart(state);
    },
  },
});

export const { addToCart, deleteItem, increaseQuantity, decrementQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
