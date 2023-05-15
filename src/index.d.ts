import type {WebylauncherApi} from './main/preload';

declare global {
  interface Window {
    api: WebylauncherApi
  }
}