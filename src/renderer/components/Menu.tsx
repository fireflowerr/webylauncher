import {useEffect, useState} from 'react';
import type {AppState} from '../store/appState';
import {useSelector} from 'react-redux';
import {useDispatch} from '../hooks/useDispatch';
import { fetchPathSep } from '../store/slices/pathSep/actions';
import { fetchPathExe } from '../store/slices/pathExe/actions';

export const Menu: React.FC = () => {
  const executablePaths = useSelector(
    (state: AppState) => state.pathExe.executables
  );
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
            results: findFirstN(executablePaths, e.target.value, 10),
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
  collection: string[],
  query: string,
  n: number
): string[] => {
  return collection.filter(item => item.startsWith(query)).slice(0, n);
};
