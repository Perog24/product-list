import { createSlice } from "@reduxjs/toolkit";

const existProdCountSlice = createSlice({
   name: "existProdCount",
    initialState: 0,
    reducers: {
      setCount: (state, action) => state = action.payload,      
    },
});

export const { increment, decrement, setCount } = existProdCountSlice.actions;

export default existProdCountSlice.reducer;