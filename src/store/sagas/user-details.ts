import { all, fork, put, takeLatest } from "redux-saga/effects";
import { getOwnUser } from "../../api/modules/users";
import { UserDto } from "../../api/modules/users/dto/user.dto";
import {
  getUserDetails as getUserDetailsAction,
  getUserDetailsFailure,
  getUserDetailsSuccess,
} from "../../store/actions";

export function* watchGetUserDetails() {
  yield takeLatest(getUserDetailsAction.type, getUserDetailsWorker);
}

function* getUserDetailsWorker() {
  try {
    const details: UserDto = yield getOwnUser();
    yield put(getUserDetailsSuccess(details));
  } catch {
    yield put(getUserDetailsFailure());
  }
}

export function* userDetailsSaga() {
  yield all([fork(watchGetUserDetails)]);
}
