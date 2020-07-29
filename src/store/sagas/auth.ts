import { push } from "connected-react-router";
import { all, fork, put, takeEvery, takeLeading } from "redux-saga/effects";
import { login, logout } from "../../api/modules/authentication";
import { getCurrentUser } from "../../api/util";
import { Route } from "../../shared/UrlRoute";
import {
  appInit,
  login as loginAction,
  loginFailure,
  loginSuccess,
  logout as logoutAction,
  logoutSuccess,
  refreshTokenFailure,
} from "../actions";

export function* watchLogin() {
  yield takeLeading(loginAction.type, loginWorker);
}

function* loginWorker({
  payload: { username, password },
}: ReturnType<typeof loginAction>) {
  try {
    yield login({ username, password });
    yield put(loginSuccess(getCurrentUser()));
    yield put(push(Route.Root));
  } catch (error) {
    yield put(loginFailure());
  }
}

export function* watchLogout() {
  yield takeLeading(logoutAction.type, logoutWorker);
}

function* logoutWorker() {
  yield logout();
  yield put(logoutSuccess());
  yield put(push(Route.Root));
  yield put(appInit());
}

export function* watchRefreshTokenFailure() {
  yield takeEvery(refreshTokenFailure, refreshTokenFailureWorker);
}

function* refreshTokenFailureWorker() {
  yield put(push(Route.Root));
}

export function* authSaga() {
  yield all([
    fork(watchLogin),
    fork(watchLogout),
    fork(watchRefreshTokenFailure),
  ]);
}
