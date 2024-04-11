import React from 'react';
import { render } from 'react-dom';
// import { Provider } from 'react-redux';
import App from "./App.jsx";
import style from "../style.css";
import { createRoot } from 'react-dom/client';


const root = createRoot(document.getElementById('root'));
root.render(<App/>);