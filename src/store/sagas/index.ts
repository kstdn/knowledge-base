import { all, fork } from "redux-saga/effects";
import { userDetailsSaga } from "../../store/sagas/user-details";
import { authSaga } from "./auth";
import { watchAppInit } from "./init";
import { watchInitLocationChange } from "./router";

export default function* rootSaga() {
  yield all([
    fork(watchAppInit),
    fork(watchInitLocationChange),
    fork(authSaga),
    fork(userDetailsSaga),
  ]);
}
