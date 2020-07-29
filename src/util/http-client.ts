import { Dispatch } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { refreshAccessToken } from "../api/modules/authentication";
import {
  baseUrl,
  createdStatusCode,
  unauthorizedErrorCode,
} from "../constant-values";
import { store } from "../store";
import { refreshTokenFailure } from "../store/actions";

const config: AxiosRequestConfig = {
  baseURL: baseUrl,
  withCredentials: true,
  headers: {
    post: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  },
};

const instanceWithInterceptors = axios.create(config);

instanceWithInterceptors.interceptors.response.use(
  (res) => res.data.data,
  (error) => {
    if (isAccessTokenExpiredError(error)) {
      return resetTokenAndReattemptRequest(error, store.dispatch);
    }
    // If the error is due to other reasons, we just throw it back to axios
    return Promise.reject(error);
  }
);

export const httpClient = instanceWithInterceptors;
export const httpClientWithoutInterceptors = axios.create(config);

let isAlreadyFetchingAccessToken = false;

// This is the list of waiting requests that will retry after the access token refresh completes
let subscribers: Function[] = [];

async function resetTokenAndReattemptRequest(
  error: AxiosError,
  dispatch: Dispatch
) {
  try {
    /* We create a new Promise that will retry the request,
    clone all the request configuration from the failed
    request in the error object. */
    const retryOriginalRequest = new Promise((resolve) => {
      addSubscriber(() => {
        const errorResponse = error?.response;
        if (errorResponse) {
          resolve(instanceWithInterceptors(errorResponse.config));
        }
      });
    });

    if (!isAlreadyFetchingAccessToken) {
      isAlreadyFetchingAccessToken = true;

      try {
        const response = await refreshAccessToken();
        if (response.status !== createdStatusCode) {
          onAccessTokenFetchError(dispatch);
          return Promise.reject(error);
        }
        isAlreadyFetchingAccessToken = false;
        onAccessTokenFetchSuccess();
      } catch {
        onAccessTokenFetchError(dispatch);
        return Promise.reject(error);
      }
    }
    return retryOriginalRequest;
  } catch (err) {
    return Promise.reject(err);
  }
}

const onAccessTokenFetchError = (dispatch: Dispatch) => {
  dispatch(refreshTokenFailure());
};

const onAccessTokenFetchSuccess = () => {
  subscribers.forEach((callback) => callback());
  subscribers = [];
};

const addSubscriber = (callback: Function) => {
  subscribers.push(callback);
};

const isAccessTokenExpiredError = (error: AxiosError) => {
  return error?.response?.status === unauthorizedErrorCode;
};
