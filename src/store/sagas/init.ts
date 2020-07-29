import { push } from "connected-react-router";
import { put, takeEvery } from "redux-saga/effects";
import { refreshAccessToken } from "../../api/modules/authentication";
import { accessTokenExists, getCurrentUser } from "../../api/util";
import { Route } from "../../shared/UrlRoute";
import {
  appInit,
  loginSuccess,
  refreshTokenFailure,
  refreshTokenSuccess,
} from "../actions";

export function* watchAppInit() {
  yield takeEvery(appInit, setIsAuthenticatedState);
}

export function* setIsAuthenticatedState() {
  if (accessTokenExists()) {
    yield setCurrentUser();
  } else {
    try {
      yield refreshAccessToken();
      yield setCurrentUser(true);
    } catch {
      yield put(refreshTokenFailure());
    }
  }
}

export function* setCurrentUser(viaRefresh: boolean = false) {
  const username = getCurrentUser();
  if (viaRefresh) {
    yield put(refreshTokenSuccess(username));
  } else {
    yield put(loginSuccess(username));
  }
  yield put(push(Route.Root));
}
