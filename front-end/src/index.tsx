import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@ui5/webcomponents-react';
import { Provider } from 'react-redux';

import { store } from './redux/store';
import App from './App';
import './styles/global.scss'



const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);


