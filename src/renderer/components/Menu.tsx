import {useEffect, useState} from 'react';
import type {AppState} from '../store/appState';
import {useSelector} from 'react-redux';
import {useDispatch} from '../hooks/useDispatch';
import {fetchPathSep} from '../store/slices/pathSep/actions';
import {fetchPathExe} from '../store/slices/pathExe/actions';

type MenuItem = {
  path: string;
  basename: string;
};

export const Menu: React.FC = () => {
  const executablePaths = useSelector(
    (state: AppState) => state.pathExe.executables
  );
  const pathSep = useSelector((state: AppState) => state.pathSep.pathSep);

  const dispatch = useDispatch();
  const [searchState, setSearchState] = useState({
    query: '',
    results: [],
  } as {
    query: string;
    results: MenuItem[];
  });

  useEffect(() => {
    dispatch(fetchPathExe());
    dispatch(fetchPathSep());
  }, []);

  const createOnClick = (path: string) => (): void => {
    window.api.launchExecutable(path);
  };

  return (
    <div>
      <input
        type="text"
        value={searchState.query}
        onChange={e => {
          setSearchState({
            query: e.target.value,
            results: findFirstN(pathSep, executablePaths, e.target.value, 10),
          });
        }}
      />
      <ol>
        {searchState.results.map(({basename, path}, index) => (
          <li
            key={`${searchState.query}-${index}`}
            onClick={createOnClick(path)}
          >
            {basename}
          </li>
        ))}
      </ol>
    </div>
  );
};

const findFirstN = (
  pathSep: string,
  collection: string[],
  query: string,
  n: number
): MenuItem[] => {
  return collection
    .map(path => {
      const basename = path.split(pathSep).slice(-1)[0];
      return {path, basename};
    })
    .filter(({basename}) => basename.startsWith(query))
    .slice(0, n);
};
