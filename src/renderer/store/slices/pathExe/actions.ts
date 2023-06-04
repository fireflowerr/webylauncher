import {ThunkAction} from 'redux-thunk';
import {AppState} from '../../appState';
import {AnyAction} from 'redux';

export enum PathExeActionType {
  FETCH_PATH_EXE = 'pathExe/fetchPathExe',
  SET_PATH_EXE = 'pathExe/setPathExe',
  SET_PATH_EXE_ERROR = 'pathExe/setPathExeError',
}

export const fetchPathExe = (): ThunkAction<
  Promise<string[]>,
  AppState,
  unknown,
  AnyAction
> => {
  return async dispatch => {
    dispatch({type: PathExeActionType.FETCH_PATH_EXE});
    try {
      const executables = await window.api.requestPathExecutables();
      dispatch({type: PathExeActionType.SET_PATH_EXE, value: executables});
      return executables;
    } catch (e) {
      console.warn('failed to fetch executables');
      dispatch({type: PathExeActionType.SET_PATH_EXE_ERROR});
      return [];
    }
  };
};
