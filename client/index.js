import React from 'react';
import { render } from 'react-dom';
// import { Provider } from 'react-redux';
import Canvas from "./Canvas.jsx";
import style from "../style.css";
import { createRoot } from 'react-dom/client';


const root = createRoot(document.getElementById('root'));
root.render(<Canvas/>);