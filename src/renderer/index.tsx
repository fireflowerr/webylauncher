import {createRoot} from 'react-dom/client';
import {App} from './components/App';

const appDiv = document.getElementById('app');
if (!appDiv) {
  throw new Error('failed to get app container');
}

const root = createRoot(appDiv);
root.render(<App />);
