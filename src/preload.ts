import {ipcRenderer, contextBridge} from 'electron';
import {PathLike} from 'fs';

// define the api between back and front end
contextBridge.exposeInMainWorld('api', {
  // recieve list of all executables on PATH
  requstPathExecutables: (): Promise<PathLike[]> =>
    new Promise(resolve => {
      ipcRenderer.once('RECIEVE_EXECUTABLES', (event, executables) => {
        resolve(executables);
      });
      ipcRenderer.send('REQUEST_EXECUTABLES');
    }),
});
