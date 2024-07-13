import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import Home from './pages/Home.jsx';
import Listing from './pages/Listing.jsx';

import { Route, RouterProvider, createBrowserRouter, createRoutesFromChildren } from 'react-router-dom'
import Profile from './pages/Profile.jsx';

const router = createBrowserRouter(
    createRoutesFromChildren(
        <Route path="/" element={<App />}>
            <Route path="/" element={<Home />} />
            <Route path="/book" element={<Listing />} />
            <Route path="/:username" element={<Profile />} />
        </Route>
    )
)

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}/>
)
