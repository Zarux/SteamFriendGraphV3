import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const ws = new WebSocket("ws://localhost:8080")

ReactDOM.render(
    <React.StrictMode>
        <App ws={ws}/>
    </React.StrictMode>,
    document.getElementById('root')
);
