// Imports
import axios from "axios";
import { products_url as url } from "../../utils/constants";

// Thunk
export const fetchProductsThunkFn = async(_, thunkAPI) => {
	try {
		const response = await axios.get(url);
		return response.data;
	} catch (error){
		console.log(error.response.data.msg);
		return thunkAPI.rejectWithValue(error.response.data);
	}
};
export const fetchSingleProductThunkFn = async(url, thunkAPI) => {
	try {
		const response = await axios.get(url);
		return response.data;
	} catch (error){
		console.log(error.response.data);
		return thunkAPI.rejectWithValue(error.response.data);
	}
};