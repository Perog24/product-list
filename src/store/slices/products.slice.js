import { createSlice } from "@reduxjs/toolkit";

const productsSlice= createSlice({
   name: "produstsList",
    initialState:[] ,
    reducers: {
      setProductsList: (state, action) => {
         state.push(action.payload); ;
      },
    },
});

export const { setProductsList } = productsSlice.actions;

export default productsSlice.reducer;
