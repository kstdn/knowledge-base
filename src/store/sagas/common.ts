import { Task } from 'redux-saga';
import { take, delay, fork } from 'redux-saga/effects';

/**
 * Spawns a `saga` on each action dispatched to the Store that matches
 * `actionType`. Will pass 'cacheIsInvalid' param to saga with value true if the specified
 * time intefval in ms has passed. 
 * 
 * @export
 * @param {string} actionType
 * @param {number} ms
 * @param {(cacheIsInvalid: boolean) => Generator} callback
 */
export function* takeAndValidateCache(
  actionType: string,
  ms: number,
  callback: (cacheIsInvalid: boolean) => Generator,
) {
  let delayTask: Task | undefined = undefined;
  while (true) {
    yield take(actionType);
    if (delayTask && delayTask.isRunning()) {
      yield callback(false);
    } else {
      yield callback(true);
      delayTask = yield fork(delaying, ms);
    }
  }
}

function* delaying(ms: number) {
  yield delay(ms);
}