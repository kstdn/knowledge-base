import {
  httpClient,
  httpClientWithoutInterceptors,
} from "../../../util/http-client";
import { ApiRoute } from "../../api-route";
import { removeAccessToken, removeRefreshToken } from "../../util";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginDto } from "./dto/login.dto";

export const register = async (createUserDto: CreateUserDto) => {
  return httpClient.post(ApiRoute.Register, createUserDto);
};

export const login = (loginDto: LoginDto) => {
  return httpClient.post(ApiRoute.Login, loginDto);
};

export const refreshAccessToken = () => {
  return httpClientWithoutInterceptors.post(ApiRoute.RefreshToken);
};

export const logout = () => {
  // TODO: reconsider server logout
  // return axios.post(ApiRoute.Logout);
  removeAccessToken();
  removeRefreshToken();
};

export const changePassword = (changePasswordDto: ChangePasswordDto) => {
  return httpClient.patch<void, void>(
    ApiRoute.ChangePassword,
    changePasswordDto
  );
};
