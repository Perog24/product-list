import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import App from './App';
import mainStore from './store';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( 
    <Provider store = {mainStore}>
        <App />  
    </Provider>
);
