import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleDropdown = (e) => {
        e.stopPropagation();
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        window.onclick = () => {
            setIsDropdownOpen(false);
        };
    }, []);

    useEffect(() => {
        if (isSidebarOpen) {
            setIsDropdownOpen(false);
        }
    }, [isSidebarOpen]);

    return (
        <>
            <button
                type="button"
                className={`fixed top-20 left-4 z-20 md:hidden p-2 bg-blue-600 text-white rounded-full shadow-lg transition duration-200 ${isSidebarOpen ? 'transform rotate-180' : ''}`}
                onClick={toggleSidebar}
            >
                {isSidebarOpen ? (
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                )}
            </button>
            <div className={`fixed z-10 inset-0 flex transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}>
                <div className="flex flex-col w-64 backdrop-blur-md bg-white/10 text-white h-full md:block">
                    <div className="flex items-center justify-between p-4">
                        <Link
                            to="#"
                            className="flex items-center space-x-3 rtl:space-x-reverse"
                        >
                            <img
                                src="https://cdna.artstation.com/p/assets/images/images/014/813/486/large/kailas-matur-rag-picker-1.jpg?1545654474"
                                className="h-10 rounded-lg"
                                alt="RagPicker Logo"
                            />
                            <span className="self-center text-2xl font-semibold whitespace-nowrap">
                                RagPickers
                            </span>
                        </Link>
                        <button
                            type="button"
                            className="md:hidden p-2 focus:outline-none"
                            onClick={toggleSidebar}
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex-1 mt-8 overflow-y-auto">
                        <ul className="p-4 space-y-4">
                            <li>
                                <Link
                                    to="/user/dashboard"
                                    className="block py-2 px-3 text-white hover:bg-black/30 rounded"
                                >
                                    Profile
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/user/dashboard/history"
                                    className="block py-2 px-3 text-white hover:bg-black/30 rounded"
                                >
                                    History
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/user/dashboard/settings"
                                    className="block py-2 px-3 text-white hover:bg-black/30 rounded"
                                >
                                    Settings
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="flex-1 p-4">
                    {/* Main content goes here */}
                </div>
            </div>
        </>
    );
}

export default Sidebar;
