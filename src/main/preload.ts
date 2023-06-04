import {ipcRenderer, contextBridge} from 'electron';

export type WebylauncherApi = {
  requestPathExecutables: () => Promise<string[]>;
  requestPathSep: () => Promise<string>;
  launchExecutable: (path: string) => void;
};

// define the api between back and front end
contextBridge.exposeInMainWorld('api', {
  // receive list of all executables on PATH
  requestPathExecutables: (): Promise<string[]> =>
    new Promise(resolve => {
      ipcRenderer.once('RECEIVE_EXECUTABLES', (event, executables) => {
        executables.sort();
        resolve(executables.map(String));
      });
      ipcRenderer.send('REQUEST_EXECUTABLES');
    }),
  requestPathSep: () =>
    new Promise(resolve => {
      ipcRenderer.once('RECEIVE_PATH_SEP', (event, pathSep) => {
        resolve(pathSep);
      });
      ipcRenderer.send('REQUEST_PATH_SEP');
    }),
  launchExecutable: (path: string) => {
    ipcRenderer.send('LAUNCH_EXECUTABLE', path);
  },
});
