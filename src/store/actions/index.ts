import { createAction } from '@reduxjs/toolkit';
import { UserDto } from '../../api/modules/users/dto/user.dto';

export const appInit = createAction('APP_INIT');

export const refreshTokenSuccess = createAction<string>('REFRESH_TOKEN_SUCCESS');
export const refreshTokenFailure = createAction('REFRESH_TOKEN_FAILURE');

export const login = createAction<{ username: string; password: string }>(
  'LOGIN',
);
export const loginSuccess = createAction<string>('LOGIN_SUCCESS');
export const loginFailure = createAction('LOGIN_FAILURE');

export const logout = createAction('LOGOUT');
export const logoutSuccess = createAction('LOGOUT_SUCCESS');

export const getUserDetails = createAction('GET_USER_DETAILS');
export const getUserDetailsSuccess = createAction<UserDto>('GET_USER_DETAILS_SUCCESS');
export const getUserDetailsFailure = createAction('GET_USER_DETAILS_FAILURE');
