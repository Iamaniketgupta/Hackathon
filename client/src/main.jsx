import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import Home from './pages/Home.jsx';
import Listing from './pages/Listing.jsx';

import { Route, RouterProvider, createBrowserRouter, createRoutesFromChildren } from 'react-router-dom'
// import RagpickerDashboard from './pages/RagpickerDashboard.jsx';
import RagpickerDashboard from './pages/RagpickerDashboard.jsx'
import Dashboard from './components/ragpickerDashboard/Dashboard.jsx';
import RagPickerProfile from './components/ragPickerProfilePage/RagPickerProfile.jsx';
import AllJobs from './components/ragpickerDashboard/AllJobs.jsx';
import Settings from './components/ragpickerSettingsPage/Setting.jsx';
import Profile from './pages/Profile.jsx';

const router = createBrowserRouter(
    createRoutesFromChildren(
        <Route path="/" element={<App />}>
            <Route path="" element={<Home />} />
            <Route path='/ragpicker/dashboard' element={<RagpickerDashboard/>}>
                <Route path='' element={<Dashboard/>} />
                <Route path='/ragpicker/dashboard/profile' element={<RagPickerProfile/>}  />
                <Route path='/ragpicker/dashboard/earning' element={<AllJobs/>} />
                <Route path='/ragpicker/dashboard/settings' element={<Settings/>} />
            </Route>
            <Route path="/" element={<Home />} />
            <Route path="/book" element={<Listing />} />
            <Route path="/:username" element={<Profile />} />
        </Route>
    )
)

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}/>
)
