import { AnyAction, applyMiddleware, combineReducers, compose, createStore } from "redux";
import { pathExe } from "./slices/pathExe/reducer";
import { pathSep } from "./slices/pathSep/reducer";
import thunk, { ThunkDispatch } from "redux-thunk";
import { AppState } from "./appState";

const composeEnhancers =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const reducer = combineReducers({pathExe, pathSep});
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export type TypedStore = typeof store & {
  dispatch: ThunkDispatch<AppState, unknown, AnyAction>;
};

export const typedStore: TypedStore = store;