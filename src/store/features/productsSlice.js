// Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProductsThunkFn, fetchSingleProductThunkFn } from "./productsThunk";

// Initial state
const initialState = {
	// Sidebar
	isSidebarOpen:false,
	// Products
	productsLoading:false,
	productsError:false,
	products:[],
	filteredProducts:[],
	featuredProducts:[],
	// Single products
	singleProductLoading:false,
	singleProductError:false,
	singleProduct:{},
	// Filters
	gridView:true,
	sort:'price-lowest',
	filters:{
		text:'',
		company:'all',
		category:'all',
		color:'all',
		minPrice:0,
		maxPrice:0,
		price:0,
		shipping:false
	}
};

// Async methods
export const fetchProducts = createAsyncThunk('products/fetchProducts', fetchProductsThunkFn);
export const fetchSingleProduct = createAsyncThunk('products/fetchSingleProduct', fetchSingleProductThunkFn);

// Slice
const productsSlice = createSlice({
	name:'products',
	initialState,
	reducers:{
		// Open / close sidebar
		openSidebar:(state) => {
			state.isSidebarOpen = true;
		},
		closeSidebar:(state) => {
			state.isSidebarOpen = false;
		},
		// Grid or list view
		setGridView:(state) => {
			state.gridView = true;
		},
		setListView:(state) => {
			state.gridView = false;
		},
		// Sort
		updateSort:(state, { payload }) => {
			state.sort = payload;
		},
		sortProduct:(state) => {
			let tempProducts = [...state.filteredProducts];
			if (state.sort === 'price-lowest'){
				tempProducts = tempProducts.sort((a, b) => {
					return a.price - b.price;
					/* Same as
					if (a.price > b.price){
						return 1;
					}
					if (a.price < b.price){
						return -1;
					}
					return 0;
					*/
				});
			}
			if (state.sort === 'price-highest'){
				tempProducts = tempProducts.sort((a, b) => {
					return b.price - a.price;
				});
			}
			if (state.sort === 'name-a'){
				/* The localeCompare() method returns a number indicating whether the current 
				character string is located before, after or is the same as the string passed 
				as parameter, according to lexicographical order.
				Let's not forget that we have to return 0, 1 or -1 */
				tempProducts = tempProducts.sort((a, b) => {
					return a.name.localeCompare(b.name);
				});
			}
			if (state.sort === 'name-z'){
				tempProducts = tempProducts.sort((a, b) => {
					return b.name.localeCompare(a.name);
				});
			}
			state.filteredProducts = tempProducts;
		},
		// Filters
		updateFilters:(state, { payload:{ name, value } }) => {
			state.filters[name] = value;
			// Or
			// return { ...state, filters:{ ...state.filters, [name]:value } };
		},
		filterProducts:(state) => {
			// Always start from original products array
			let tempProducts = [...state.products];
			// Filters
			const { text, category, company, color, price, shipping } = state.filters;
			// Text
			if (text){
				tempProducts = tempProducts.filter((product) => {
					return product.name.toLowerCase().startsWith(text);
				});
			}
			// Category
			if (category !== 'all'){
				tempProducts = tempProducts.filter((product) => {
					return product.category.toLowerCase() === category;
				});
			}
			// Company
			if (company !== 'all'){
				tempProducts = tempProducts.filter((product) => {
					return product.company.toLowerCase() === company;
				});
			}
			// Color
			if (color !== 'all'){
				tempProducts = tempProducts.filter((product) => {
					// product.colors is an array
					return product.colors.find((col) => {
						return col === color;
					});
				});
			}
			// Price
			tempProducts = tempProducts.filter((product) => {
				return product.price <= price;
			});
			// Shipping
			if (shipping){
				tempProducts = tempProducts.filter((product) => {
					return product.shipping;
				});
			}
			// Return
			return { ...state, filteredProducts:tempProducts };
		},
		clearFilters:(state) => {
			return { ...state, filters:{
				...state.filters,
				text:'',
				company:'all',
				category:'all',
				color:'all',
				price:state.filters.maxPrice,
				shipping:false
			} };
		},
	},
	extraReducers:(builder) => {
		// Fetch products
		builder.addCase(fetchProducts.pending, (state) => {
			state.productsLoading = true;
		}).addCase(fetchProducts.fulfilled, (state, { payload }) => {
			// Featured products
			const featuredProducts = payload.filter((product) => {
				return product.featured;
			});
			// Get max price
			let maxPrice = payload.map((p) => {
				return p.price;
			});
			maxPrice = Math.max(...maxPrice);
			// Return
			return { ...state, productsLoading:false, products:payload, filteredProducts:payload, 
				featuredProducts, filters:{ ...state.filters, maxPrice, price:maxPrice } };
		}).addCase(fetchProducts.rejected, (state) => {
			return { ...state, productsLoading:false, productsError:true }
		});
		// Fetch single product
		builder.addCase(fetchSingleProduct.pending, (state) => {
			// In case there are old errors we reset singleProductError
			return { ...state, singleProductLoading:true, singleProductError:false }
		}).addCase(fetchSingleProduct.fulfilled, (state, { payload }) => {
			return { ...state, singleProductLoading:false, singleProduct:payload };
		}).addCase(fetchSingleProduct.rejected, (state) => {
			return { ...state, singleProductLoading:false, singleProductError:true };
		});
	}
});

// Actions export
export const { openSidebar, closeSidebar, setGridView, setListView, 
	updateSort, sortProduct, updateFilters, filterProducts, clearFilters } = productsSlice.actions;

// Reducer export
export default productsSlice.reducer;