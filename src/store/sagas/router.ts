import { LOCATION_CHANGE } from 'connected-react-router';
import { take } from 'redux-saga/effects';

export function* watchInitLocationChange() {
  while (true) {
    // eslint-disable-next-line
    const { payload } = yield take(LOCATION_CHANGE);
    // yield something
    // check docs for "connected-react-router"
  }
}
