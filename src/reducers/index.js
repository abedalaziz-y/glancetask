
import { userReducer } from './userReducer.js'

import { searchReducer } from "./searchreducer.js";

import { wishlistReducer } from "./wishlist";
import { sidebarReducer } from "./sideBar.js";
import { combineReducers } from "redux";
 const rootReducer = combineReducers({
     user: userReducer,
      search: searchReducer,
     
     wishlist: wishlistReducer,
     sidebar: sidebarReducer,

})
export default rootReducer