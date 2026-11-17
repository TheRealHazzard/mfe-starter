import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '@mfe/shared/src/tokens.css';
import App from './App';
import './shell.css';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
