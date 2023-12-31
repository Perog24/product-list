import { combineReducers } from "redux";

import api from "./api.slice";
import isLogined from "./isLogin.slice";
import products from "./products.slice";
import existCounter from "./existCounter.slice";

export default combineReducers({
   api,
   isLogined,
   products,
   existCounter
})