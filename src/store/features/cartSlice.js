// Imports
import { createSlice } from "@reduxjs/toolkit";

// LocalStorage ?
const getLocalStorage  = () => {
	const cart = localStorage.getItem('comflySlothRedux');
	if (cart){
		return JSON.parse(cart);
	}
	return [];
};

// Initial state
const initialState = {
	cart:getLocalStorage(),
	totalItems:0,
	totalAmount:0,
	shippingFee:534
};

// Slice
const cartSlice = createSlice({
	name:'cart',
	initialState,
	reducers:{
		// Add to cart
		addToCart:(state, { payload:{ id, color, amount, product } }) => {
			// Already in the cart ?
			const tempItem = state.cart.find((item) => {
				return item.id === id + color;
			});
			if (tempItem){
				// Already in the cart, we update amount
				const tempCart = state.cart.map((cartItem) => {
					if (cartItem.id === id + color){
						let newAmount =  cartItem.amount + amount;
						// Check the stock
						if (newAmount > cartItem.max){
							newAmount = cartItem.max;
						}
						// Update amount for this cartItem
						return { ...cartItem, amount:newAmount };
					} else {
						return cartItem;
					}
				});
				// Update cart state
				return { ...state, cart:tempCart };
			} else {
				// New product
				const newItem = { id:`${id}${color}`, name:product.name, 
					color, amount, image:product.images[0].url, 
					price:product.price, max:product.stock };
				// Add to state
				state.cart.push(newItem);
				// Or return { ...state, cart:[...state.cart, newItem] };
			}
		},
		// Amount change
		amountChange:(state, { payload:{ id, value } }) => {
			const tempCart = state.cart.map((item) => {
				if (item.id === id){
					if (value === 'inc'){
						let newAmount = item.amount + 1;
						if (newAmount > item.max){
							newAmount = item.max;
						}
						return { ...item, amount:newAmount };
					} else {
						let newAmount = item.amount - 1;
						if (newAmount < 1){
							newAmount = 1;
						}
						return { ...item, amount:newAmount };
					}
				}
				return item;
			});
			state.cart = tempCart;
		},
		// Remove from cart
		removeItem:(state, { payload:id }) => {
			state.cart = state.cart.filter((item) => {
				return item.id !== id;
			});
		},
		// Clear cart
		clearCart:(state) => {
			state.cart = [];
		},
		// Calculate totals
		calculateTotals:(state) => {
			const { totalItems, totalAmount } = state.cart.reduce((acc, current) => {
				const { amount, price } = current;
				acc.totalItems += amount;
				acc.totalAmount += amount * price;
				// !!!! Don't forget to return accumulation !!!!
				return acc;
			}, { totalItems:0, totalAmount:0 });
			return { ...state, totalItems, totalAmount };
		}
	}
});

// Actions export
export const { addToCart, amountChange, removeItem, 
	clearCart, calculateTotals } = cartSlice.actions;

// Reducer export
export default cartSlice.reducer;