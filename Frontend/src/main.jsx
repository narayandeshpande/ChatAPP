import App from './App.jsx';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Authprovider } from './context/Authprovider.jsx';
import { BrowserRouter } from 'react-router-dom';
import { SocketProvider } from './context/SocketContaxt.jsx';
import React from 'react';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Authprovider>
        <SocketProvider>
          <App />
        </SocketProvider>
      </Authprovider>
    </BrowserRouter>
  </React.StrictMode>
);
