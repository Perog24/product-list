import React from 'react';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from 'react-dom/client';

import App from './App';
import Main from './components/Main';
import Comments from './components/Comments';
import EditeProduct from './components/EditeProduct';
import UserInfo from './components/UserInfo';
import mainStore from './store';

import './index.css';

export const router = createBrowserRouter([
    { path: '/',
        element: <App /> 
    },
    { path: '/product_list',
    element: <Main />,
    children: [
        {path: '/product_list/:id',
        element: <EditeProduct/> ,   
    }
    ]
    },
    { path: '/comments/:id',
        element: <Comments/>,   
    },
    { path: '/userInfo/:id',
        element: <UserInfo/>,   
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
