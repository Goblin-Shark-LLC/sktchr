import React from 'react';
import { render } from 'react-dom';
// import { Provider } from 'react-redux';
import Canvas from "./Canvas.jsx";
import style from "../style.css";
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store.js';
<<<<<<< HEAD
import App from './App.jsx'

=======
import App from './App.jsx';
>>>>>>> origin

const root = createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>);
