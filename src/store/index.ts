import { configureStore } from "@reduxjs/toolkit";
import { routerMiddleware } from "connected-react-router";
import createSagaMiddleware from "redux-saga";
import history from "../util/history";
import { rootReducer } from "./reducers";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware, routerMiddleware(history)],
});

sagaMiddleware.run(rootSaga);

export type Store = typeof store;
export type RootState = ReturnType<typeof store.getState>;
