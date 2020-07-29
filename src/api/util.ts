import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import {
  accessTokenHeaderPayloadKey,
  refreshTokenPartialKey,
} from "../constant-values";
import { NO_USERNAME_IN_ACCESS_TOKEN } from "../messages";
import { AccessTokenPayload } from "./modules/authentication/dto/access-token-payload.dto";

export const accessTokenExists = (): boolean => {
  return !!Cookies.get(accessTokenHeaderPayloadKey);
};

export const getAccessTokenPayload = (): AccessTokenPayload | undefined => {
  const accessTokenPayloadEncoded = Cookies.get(accessTokenHeaderPayloadKey);
  if (!accessTokenPayloadEncoded) {
    return undefined;
  }
  return jwtDecode(accessTokenPayloadEncoded);
};

export const getCurrentUser = (): string => {
  const payload = getAccessTokenPayload();
  const username = payload?.username;
  if (username) {
    return username;
  } else {
    throw new Error(NO_USERNAME_IN_ACCESS_TOKEN);
  }
};

export const removeAccessToken = () => {
  Cookies.remove(accessTokenHeaderPayloadKey);
};

export const removeRefreshToken = () => {
  Cookies.remove(refreshTokenPartialKey);
};
