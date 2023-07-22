import React from 'react';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from 'react-dom/client';

import App from './App';
import Main from './components/Main';
import mainStore from './store';

import './index.css';

export const router = createBrowserRouter([
    { path: '/',
        element: <App /> 
    },
    { path: '/product_list',
    element: <Main />,
    children: [

    ]
    },
    { path: '*',
        element: <h1>404</h1>},
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(    
    <Provider store = {mainStore}>
        <RouterProvider router = {router}>
            <App />  
            <Main/>
        </RouterProvider>
    </Provider>
    
);
