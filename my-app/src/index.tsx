import React from 'react';
import ReactDOM from 'react-dom/client'; // Используем ReactDOM для создания root
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './styles.css'; // Импортируем стили (если есть)

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <BrowserRouter> {/* Оборачиваем App в BrowserRouter */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);