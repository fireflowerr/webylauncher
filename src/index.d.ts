import type {WebylauncherApi} from './main/preload';

declare global {
  interface Window {
    api: WebylauncherApi;
  }

  const REACT_EXTENSION: string | undefined;
  const REDUX_EXTENSION: string | undefined;
}
