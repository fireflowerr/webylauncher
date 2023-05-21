import { ThunkAction } from "redux-thunk";
import { AppState } from "../../appState";
import { AnyAction } from "redux";

export enum PathSepActionType {
  FETCH_PATH_SEP = 'systemInfo/fetchPathSep',
  SET_PATH_SEP = 'systemInfo/setPathSep',
  SET_PATH_SEP_ERROR = 'systemInfo/setPathSepError'
}

export const fetchPathSep = (): ThunkAction<
  Promise<string>,
  AppState,
  unknown,
  AnyAction
> => {
  return async (dispatch) => {
    dispatch({type: PathSepActionType.FETCH_PATH_SEP});
    try {
      const pathSep = await window.api.requestPathSep();
      dispatch({type: PathSepActionType.SET_PATH_SEP, value: pathSep});
      return pathSep;
    } catch (e) {
      console.warn('failed to fetch path separator');
      dispatch({type: PathSepActionType.SET_PATH_SEP_ERROR});
      return '';
    }
  }
};