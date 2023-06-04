import {useEffect, useState} from 'react';
import type {AppState} from '../store/appState';
import {useSelector} from 'react-redux';
import {useDispatch} from '../hooks/useDispatch';
import {fetchPathSep} from '../store/slices/pathSep/actions';
import {fetchPathExe} from '../store/slices/pathExe/actions';

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
    results: string[];
  });

  useEffect(() => {
    dispatch(fetchPathExe());
    dispatch(fetchPathSep());
  }, []);

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
        {searchState.results.map((path, index) => (
          <li key={`${searchState.query}-${index}`}>${path}</li>
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
): string[] => {
  return collection
    .filter(item => item.split(pathSep).slice(-1)[0].startsWith(query))
    .slice(0, n);
};
