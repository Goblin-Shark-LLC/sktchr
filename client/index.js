import React from 'react';
import { render } from 'react-dom';
// import { Provider } from 'react-redux';
import App from "./App.jsx";
import style from "../style.css";
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store.js';


const root = createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>);