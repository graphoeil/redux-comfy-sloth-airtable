// Imports
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./features/productsSlice";
import cartReducer from "./features/cartSlice";
import userReducer from "./features/userSlice";

// Store
const store = configureStore({
	reducer:{
		cart:cartReducer,
		products:productsReducer,
		user:userReducer
	}
});

// Export
export default store;