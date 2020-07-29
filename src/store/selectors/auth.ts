import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { Status } from "../../util/Status";

const getAuthState = (state: RootState) => state.auth;

export const getUser = createSelector(getAuthState, (state) => state.user);
export const getStatus = createSelector(getAuthState, (state) => state.status);
export const getIsAuthSettled = createSelector(
  getAuthState,
  (state) =>
    state.status === Status.Resolved || state.status === Status.Rejected
);
export const getIsAuthenticated = createSelector(
  getAuthState,
  getIsAuthSettled,
  (state, isAuthSettled) => isAuthSettled && !!state.user
);
