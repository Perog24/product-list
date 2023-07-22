import { createSlice } from "@reduxjs/toolkit";

const productsSlice= createSlice({
   name: "produstsList",
    initialState:[] ,
    reducers: {
      setProductsList: (state, action) => {
         state.push(action.payload); ;
      },
      editeProductsList: (state, action) => {
         const index = state.findIndex((item) => item.id ===action.payload.id);
         if (index !== -1) {
            state[index] = action.payload;
         }
      },
      deleteProductsItem: (state, action) => {
         const index = state.findIndex((item) => item.id === action.payload.id);
         if (index!== -1) {
            state.splice(index, 1);
         }
      }
   }
});

export const { setProductsList,  editeProductsList, deleteProductsItem} = productsSlice.actions;

export default productsSlice.reducer;
