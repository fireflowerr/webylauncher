import {Provider} from 'react-redux';
import {Menu} from './Menu';
import { typedStore } from '../store/store';

export const App: React.FC = () => {
  return (
    <Provider store={typedStore}>
      <Menu />
    </Provider>
  );
};
