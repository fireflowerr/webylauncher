import {PathExe} from './slices/pathExe/reducer';
import {PathSep} from './slices/pathSep/reducer';

export type AppState = {
  pathExe: PathExe;
  pathSep: PathSep;
};
