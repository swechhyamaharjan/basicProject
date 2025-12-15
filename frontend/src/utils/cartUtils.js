export const updateCart = (state) => {
  state.itemPrice = state.cartItems.reduce(
    (acc, x) => acc + (Number(x.qty) * (x.price)), 0
  ).toFixed(2);
  state.shippingCharge = state.itemPrice >= 100 ? 0 : 10
  state.totalPrice = (Number(state.itemPrice) + Number(state.shippingCharge)).toFixed(2)
  localStorage.setItem("cart", JSON.stringify(state));
  return state;
}