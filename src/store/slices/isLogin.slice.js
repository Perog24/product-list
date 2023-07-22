import { createSlice } from "@reduxjs/toolkit";

const isLoginedSlice = createSlice({
   name: "isLogined",
    initialState: false,
    reducers: {
      setIsLogined: (state, action) => {
        return action.payload;
      },
    },
});

export const { setIsLogined } = isLoginedSlice.actions;

export default isLoginedSlice.reducer;
