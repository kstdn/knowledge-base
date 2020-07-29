import { RootState } from '..';
import { createSelector } from '@reduxjs/toolkit';

export const getRouterState = (state: RootState) => state.router;

export const getPathname = createSelector(
  getRouterState,
  state => state.location.pathname
);
