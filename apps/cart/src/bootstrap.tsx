import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '@mfe/shared/src/tokens.css';
import App from './App';

// Standalone mode: lets this team develop and demo the app without the shell.
createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <div style={{ padding: 24 }}>
      <App />
    </div>
  </BrowserRouter>,
);
