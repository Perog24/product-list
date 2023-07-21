import { configureStore } from  "@reduxjs/toolkit";

import rootReducer from "./slices"

const mainStore = configureStore({
   reducer: rootReducer,
   devTools: true,
});

export default mainStore;
