interface ICartState {
  itemsPrice: number | string;
  cartItems: [];
  shippingPrice: string;
  taxPrice: string;
  totalPrice: string;
}

export const updateCart = (state: ICartState): ICartState => {
  // Calculate total cart price:
  state.itemsPrice = addDecimals(
    state.cartItems.reduce(
      (acc: number, curr: { price: number, qty: number }) => acc + curr.price * curr.qty, 0
    )
  );

  // Calculate shipping:
  state.shippingPrice = addDecimals(Number(state.itemsPrice) > 100 ? 0 : 10);

  // Calculating tax price of 15%:
  state.taxPrice = addDecimals(Number((Number(state.itemsPrice) * 0.15).toFixed(2)));

  // Caculate total price:
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);

  localStorage.setItem("cart", JSON.stringify(state));

  return state;
}

export const addDecimals = (num: number): string => {
  return (Math.round(num * 100) /100).toFixed(2);
};