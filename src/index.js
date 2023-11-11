import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import {Store} from './app/store'
const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <React.StrictMode>
        <Store>
        <App />
        </Store>
    </React.StrictMode>
  );
  reportWebVitals();