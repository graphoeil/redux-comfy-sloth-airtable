// Imports
import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
	myUser:null
};

// Slice
const userSlice = createSlice({
	name:'user',
	initialState,
	reducers:{
		// Set my user
		setMyUser:(state, { payload }) => {
			state.myUser = payload;
		}
	}
});

// Actions export
export const { setMyUser } = userSlice.actions;

// Reducer export
export default userSlice.reducer;