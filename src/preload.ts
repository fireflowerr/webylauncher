import {ipcRenderer, contextBridge} from 'electron';
import {PathLike} from 'fs';

// define the api between back and front end
contextBridge.exposeInMainWorld('api', {
  // receive list of all executables on PATH
  requestPathExecutables: (): Promise<PathLike[]> =>
    new Promise(resolve => {
      ipcRenderer.once('RECEIVE_EXECUTABLES', (event, executables) => {
        resolve(executables);
      });
      ipcRenderer.send('REQUEST_EXECUTABLES');
    }),
});
