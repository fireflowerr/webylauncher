import type {ThunkAction, ThunkDispatch} from 'redux-thunk/es/types';
import {
  applyMiddleware,
  combineReducers,
  createStore,
  compose,
  AnyAction,
} from 'redux';
import thunk from 'redux-thunk';
import { PathExe } from './slices/pathExe/reducer';
import { PathSep } from './slices/pathSep/reducer';

export type AppState = {
  pathExe: PathExe;
  pathSep: PathSep;
};




