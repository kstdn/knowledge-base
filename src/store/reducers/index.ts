import { combineReducers } from "@reduxjs/toolkit";
import { connectRouter } from "connected-react-router";
import history from "./../../util/history";
import { authReducer } from "./auth";
import { userDetailsReducer } from "./user-details";

export const rootReducer = combineReducers({
  router: connectRouter(history),
  auth: authReducer,
  userDetails: userDetailsReducer,
});
