import type {AppState} from '../store/app_state';
import type {ThunkDispatch} from 'redux-thunk';
import {Provider} from 'react-redux';
import {store, fetchPathExe} from '../store/app_state';
import {AnyAction} from 'redux';

type TypedStore = typeof store & {
  dispatch: ThunkDispatch<AppState, unknown, AnyAction>;
};

const typedStore: TypedStore = store;

export const App: React.FC = () => {
  return (
    <Provider store={typedStore}>
      <button type="button" onClick={() => typedStore.dispatch(fetchPathExe())}>
        TEST
      </button>
    </Provider>
  );
};
