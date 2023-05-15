import type { ThunkAction } from "redux-thunk/es/types";
import { applyMiddleware, combineReducers, createStore, compose, AnyAction} from "redux";
import thunk from 'redux-thunk'

export type AppState = {
  pathExe: PathExe
};

export type PathExe = {
  fetching: boolean,
  error: boolean,
  executables: String[]
};

enum PathExeActionType {
  FETCH_PATH_EXE = 'pathExe/fetchPathExe',
  SET_PATH_EXE = 'pathExe/setPathExe',
  SET_PATH_EXE_ERROR = 'pathExe/setPathExeError'
}

type Action<T = string, V = unknown> = {[key: string]: V} & {type: T | string};
type PathExeAction = Action<PathExeActionType>;

export const fetchPathExe = (): ThunkAction<void, AppState, unknown, AnyAction> => {
  return async (dispatch) => {
    dispatch({type: PathExeActionType.FETCH_PATH_EXE});
      try{
        const executables = await window.api.requestPathExecutables();
        dispatch({type: PathExeActionType.SET_PATH_EXE, value: executables});
        return executables;
      } catch (e) {
        console.warn('failed to fetch executables');
        dispatch({type: PathExeActionType.SET_PATH_EXE_ERROR})
        return [];
      }
  }
}

const PATH_EXE_DEFAULT: PathExe = {
  fetching: false,
  error: false,
  executables: []
};

const pathExe = (state: PathExe = PATH_EXE_DEFAULT, action: PathExeAction) => {
  switch (action.type) {
    case PathExeActionType.FETCH_PATH_EXE: 
      return {...PATH_EXE_DEFAULT, fetching: true};
    case PathExeActionType.SET_PATH_EXE:
      return {...state, executables: action.value};
    case PathExeActionType.SET_PATH_EXE_ERROR:
      return {...PATH_EXE_DEFAULT, error: true};
    default:
      return state;
  }
};

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const reducer = combineReducers({pathExe});
export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
