import { createSlice } from '@reduxjs/toolkit'

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart")) //JSON read and turns to js obj
  : { cartItems: [], };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((i) => i._id == item._id);
      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id == existItem._id ? item : x
        ); //naya array bancha updated one bascha
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      state.itemPrice = state.cartItems.reduce(
        (acc, x) => acc + x.qty * x.price,
        0).toFixed(2)
      state.shippingCharge = state.itemPrice >= 100 ? 0 : 10
      state.totalPrice = (Number(state.itemPrice) + Number(state.shippingCharge)).toFixed(2)
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
