import {app, session, BrowserWindow, ipcMain} from 'electron';
import {env, platform} from 'process';
import {join, extname, sep, delimiter} from 'path';
import {PathLike} from 'fs';
import {constants, readdir, access} from 'fs/promises';
import {spawn} from 'child_process';

/**
 * True if the platform is windows
 */
const isWin = platform === 'win32';

/**
 * The separator for multiple paths in an environment variable
 */
const envPathSep = delimiter;

// keep a reference to the window to avoid garbage collection
let win: BrowserWindow | undefined;

app.on('ready', async () => {
  if (typeof REACT_EXTENSION === 'string') {
    await session.defaultSession.loadExtension(REACT_EXTENSION, {
      allowFileAccess: true,
    });
  }

  if (typeof REDUX_EXTENSION === 'string') {
    await session.defaultSession.loadExtension(REDUX_EXTENSION, {
      allowFileAccess: true,
    });
  }

  await new Promise(resolve => setTimeout(resolve, 10000));

  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
    },
  });

  win.loadFile(join(__dirname, '../../assets/index.html'));
  win.webContents.openDevTools();
});

app.on('window-all-closed', () => {
  app.quit();
});

/**
 * Gets the list of valid extensions for executable files on windows.
 *
 * @returns path extensions.
 */
const getWindowsPathExt = () => {
  const pathExt = env.PATHEXT;
  if (!pathExt) {
    return [];
  }
  return pathExt.split(envPathSep);
};

/**
 * Determines if the provided path is an executable file.
 *
 * @param path path to check
 * @returns true if executable
 */
const isExecutable = async (path: PathLike): Promise<boolean> => {
  try {
    if (isWin) {
      const extension = extname(path.toString()).toUpperCase();
      const hasPathExt = getWindowsPathExt().reduce((hasExt, ext) => {
        return hasExt || extension === ext.toUpperCase();
      }, false);

      if (!hasPathExt) {
        return false;
      }
    }

    await access(path, constants.X_OK);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Gets all executables on the PATH.
 *
 * @returns list of executables
 */
const getPathExecutables = async (): Promise<PathLike[]> => {
  const envPath = env.PATH;
  if (!envPath) {
    return [];
  }

  const executables: PathLike[] = [];
  const statJobs: Promise<void>[] = [];
  for (const path of envPath.split(envPathSep)) {
    try {
      for (const fileName of await readdir(path)) {
        const filePath = join(path, fileName);

        // let these leaf jobs run side by side instead of waiting sequentially
        const statJob = (async () => {
          if (await isExecutable(filePath)) {
            executables.push(filePath);
          }
        })();
        statJobs.push(statJob);
      }
    } catch (e) {
      const statJob = (async () => {
        if (await isExecutable(path)) {
          executables.push(path);
        }
      })();
      statJobs.push(statJob);
    }
  }

  await Promise.all(statJobs);
  return executables;
};

const RECEIVE_EXECUTABLES_DEBOUNCE_MS = 800;
let receiveExecutablesDebounce: NodeJS.Timeout | undefined;

// When executables are requested, respond with a list of all executables
ipcMain.on('REQUEST_EXECUTABLES', async () => {
  clearTimeout(receiveExecutablesDebounce);
  receiveExecutablesDebounce = setTimeout(async () => {
    win?.webContents.send('RECEIVE_EXECUTABLES', await getPathExecutables());
  }, RECEIVE_EXECUTABLES_DEBOUNCE_MS);
});

ipcMain.on('REQUEST_PATH_SEP', () => {
  win?.webContents.send('RECEIVE_PATH_SEP', sep);
});

ipcMain.on('LAUNCH_EXECUTABLE', async (event, path: string) => {
  spawn(path, {
    detached: true,
  });
});
