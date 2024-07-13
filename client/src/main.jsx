import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import Home from './pages/Home.jsx';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromChildren } from 'react-router-dom'
// import RagpickerDashboard from './pages/RagpickerDashboard.jsx';
import RagpickerDashboard from './pages/RagpickerDashboard.jsx'
import Dashboard from './components/ragpickerDashboard/Dashboard.jsx';
import RagPickerProfile from './components/ragPickerProfilePage/RagPickerProfile.jsx';
import AllJobs from './components/ragpickerDashboard/AllJobs.jsx';

const router = createBrowserRouter(
    createRoutesFromChildren(
        <Route path="/" element={<App />}>
            <Route path="" element={<Home />} />
            <Route path='/ragpicker/dashboard' element={<RagpickerDashboard/>}>
                <Route path='' element={<Dashboard/>} />
                <Route path='/ragpicker/dashboard/profile' element={<RagPickerProfile/>}  />
                <Route path='/ragpicker/dashboard/earning' element={<AllJobs/>} />
            </Route>
        </Route>
    )
)

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}/>
)
