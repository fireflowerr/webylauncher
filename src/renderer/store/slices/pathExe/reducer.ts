import { Action } from "../../defs";
import { PathExeActionType } from "./actions";

export type PathExe = {
  fetching: boolean;
  error: boolean;
  executables: string[];
};

const PATH_EXE_DEFAULT: PathExe = {
  fetching: false,
  error: false,
  executables: [],
};

export const pathExe = (state: PathExe = PATH_EXE_DEFAULT, action: Action<PathExeActionType>): PathExe => {
  switch (action.type) {
    case PathExeActionType.FETCH_PATH_EXE:
      return {...PATH_EXE_DEFAULT, fetching: true};
    case PathExeActionType.SET_PATH_EXE:
      return {...state, executables: action.value as string[]};
    case PathExeActionType.SET_PATH_EXE_ERROR:
      return {...PATH_EXE_DEFAULT, error: true};
    default:
      return state;
  }
};