import { RootState } from '..';
import { createSelector } from '@reduxjs/toolkit';

const getUserDetailsState = (state: RootState) => state.userDetails;

export const getUserDetailsStatus = createSelector(
  getUserDetailsState,
  state => state.status
);

export const getUserDetails = createSelector(
  getUserDetailsState,
  state => state.details
);
