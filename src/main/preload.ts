import {ipcRenderer, contextBridge} from 'electron';
import {PathLike} from 'fs';

export type WebylauncherApi = {
  requestPathExecutables: () => Promise<string[]>
};

// define the api between back and front end
contextBridge.exposeInMainWorld('api', {
  // receive list of all executables on PATH
  requestPathExecutables: (): Promise<string[]> =>
    new Promise(resolve => {
      ipcRenderer.once('RECEIVE_EXECUTABLES', (event, executables) => {
        resolve(executables.map(String));
      });
      ipcRenderer.send('REQUEST_EXECUTABLES');
    }),
});
