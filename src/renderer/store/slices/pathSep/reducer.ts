import {Action} from '../../defs';
import { PathSepActionType } from './actions';

export type PathSep = {
  fetching: boolean;
  error: boolean;
  pathSep: string;
};

const PATH_SEP_DEFAULT = {
  fetching: false,
  error: false,
  pathSep: '',
};

export const pathSep = (state: PathSep = PATH_SEP_DEFAULT, action: Action<PathSepActionType>): PathSep  => {
  switch (action.type) {
    case PathSepActionType.FETCH_PATH_SEP: 
      return {...PATH_SEP_DEFAULT, fetching: true};
    case PathSepActionType.SET_PATH_SEP:
      return {...state, pathSep: action.value as string};
    case PathSepActionType.SET_PATH_SEP_ERROR:
      return {...state, error: true};
    default:
      return state;
  }
}

