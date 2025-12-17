import { createSlice } from '@reduxjs/toolkit'
import { updateCart } from '../utils/cartUtils';

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart")) //JSON read and turns to js obj
  : { cartItems: [], shippingAddress: {}, paymentMethod: ""};

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
      updateCart(state);
    },
    removeFromCart: (state, action)=>{
      const productId = action.payload 
      state.cartItems = state.cartItems.filter((item)=> item._id != productId)
      updateCart(state);
    },
    clearCart: (state, action)=>{ //empty all cart at once
      state.cartItems = [];
      updateCart(state);
    },
    saveShippingAddress: (state, action)=>{
      state.shippingAddress = action.payload;
      updateCart(state)
    },
  },
});

export const { addToCart, removeFromCart, clearCart, saveShippingAddress } = cartSlice.actions;
export default cartSlice.reducer;
