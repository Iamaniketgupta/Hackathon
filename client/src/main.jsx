import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import Home from './pages/Home.jsx';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromChildren } from 'react-router-dom'
import RagAuth from './Auth/RagAuth.jsx';
import UserAuth from './Auth/UserAuth.jsx';

const router = createBrowserRouter(
    createRoutesFromChildren(
        <Route path="/" element={<App />}>
            <Route path="" element={<Home />} />
            <Route path="/rp/signin" element={<RagAuth />} />
            <Route path="/user/signin" element={<UserAuth />} />
        </Route>


    )
)

ReactDOM.createRoot(document.getElementById('root')).render(
        <RouterProvider router={router} />
)
