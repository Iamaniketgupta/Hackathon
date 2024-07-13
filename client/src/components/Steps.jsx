import React from 'react'
import ragpicker from '../assets/ragpicker.png';

function Steps() {
    return (
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
            <div className="grid gap-6 row-gap-10 lg:grid-cols-2">
                <div className="relative">
                    <img
                        className="inset-0 w-full rounded-3xl shadow-lg h-96 lg:absolute lg:h-full"
                        src={ragpicker}
                        alt="Rag Picker"
                    />
                </div>
                <div className="lg:py-6 lg:pr-16">
                    <div className="flex">
                        <div className="flex flex-col items-center mr-4">
                            <div>
                                <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                                    <svg
                                        className="w-4 text-white"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        viewBox="0 0 24 24"
                                    >
                                        <line
                                            fill="none"
                                            strokeMiterlimit="10"
                                            x1="12"
                                            y1="2"
                                            x2="12"
                                            y2="22"
                                        />
                                        <polyline
                                            fill="none"
                                            strokeMiterlimit="10"
                                            points="19,15 12,22 5,15"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div className="w-px h-full bg-gray-300" />
                        </div>
                        <div className="pt-1 pb-8">
                            <p className="mb-2 text-lg font-bold text-white">Step 1</p>
                            <p className="text-white">
                                User Signup: Register by providing basic details like name, email, and password.
                            </p>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="flex flex-col items-center mr-4">
                            <div>
                                <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                                    <svg
                                        className="w-4 text-white"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        viewBox="0 0 24 24"
                                    >
                                        <line
                                            fill="none"
                                            strokeMiterlimit="10"
                                            x1="12"
                                            y1="2"
                                            x2="12"
                                            y2="22"
                                        />
                                        <polyline
                                            fill="none"
                                            strokeMiterlimit="10"
                                            points="19,15 12,22 5,15"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div className="w-px h-full bg-gray-300" />
                        </div>
                        <div className="pt-1 pb-8">
                            <p className="mb-2 text-lg font-bold text-white">Step 2</p>
                            <p className="text-white">
                                Profile Setup: Complete your profile by adding your address and contact information.
                            </p>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="flex flex-col items-center mr-4">
                            <div>
                                <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                                    <svg
                                        className="w-4 text-white"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        viewBox="0 0 24 24"
                                    >
                                        <line
                                            fill="none"
                                            strokeMiterlimit="10"
                                            x1="12"
                                            y1="2"
                                            x2="12"
                                            y2="22"
                                        />
                                        <polyline
                                            fill="none"
                                            strokeMiterlimit="10"
                                            points="19,15 12,22 5,15"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div className="w-px h-full bg-gray-300" />
                        </div>
                        <div className="pt-1 pb-8">
                            <p className="mb-2 text-lg font-bold text-white">Step 3</p>
                            <p className="text-white">
                                Browse Ragpickers: View available ragpickers, filter by location and availability.
                            </p>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="flex flex-col items-center mr-4">
                            <div>
                                <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                                    <svg
                                        className="w-4 text-white"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        viewBox="0 0 24 24"
                                    >
                                        <line
                                            fill="none"
                                            strokeMiterlimit="10"
                                            x1="12"
                                            y1="2"
                                            x2="12"
                                            y2="22"
                                        />
                                        <polyline
                                            fill="none"
                                            strokeMiterlimit="10"
                                            points="19,15 12,22 5,15"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div className="w-px h-full bg-gray-300" />
                        </div>
                        <div className="pt-1 pb-8">
                            <p className="mb-2 text-lg font-bold text-white">Step 4</p>
                            <p className="text-white">
                                Book a Service: Select a ragpicker, choose a date and time, and confirm the booking.
                            </p>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="flex flex-col items-center mr-4">
                            <div>
                                <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                                    <svg
                                        className="w-4 text-white"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        viewBox="0 0 24 24"
                                    >
                                        <line
                                            fill="none"
                                            strokeMiterlimit="10"
                                            x1="12"
                                            y1="2"
                                            x2="12"
                                            y2="22"
                                        />
                                        <polyline
                                            fill="none"
                                            strokeMiterlimit="10"
                                            points="19,15 12,22 5,15"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div className="w-px h-full bg-gray-300" />
                        </div>
                        <div className="pt-1 pb-8">
                            <p className="mb-2 text-lg font-bold text-white">Step 5</p>
                            <p className="text-white">
                                Payment: Choose a payment method and complete the payment process.
                            </p>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="flex flex-col items-center mr-4">
                            <div>
                                <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                                    <svg
                                        className="w-4 text-white"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        viewBox="0 0 24 24"
                                    >
                                        <line
                                            fill="none"
                                            strokeMiterlimit="10"
                                            x1="12"
                                            y1="2"
                                            x2="12"
                                            y2="22"
                                        />
                                        <polyline
                                            fill="none"
                                            strokeMiterlimit="10"
                                            points="19,15 12,22 5,15"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div className="w-px h-full bg-gray-300" />
                        </div>
                        <div className="pt-1 pb-8">
                            <p className="mb-2 text-lg font-bold text-white">Step 6</p>
                            <p className="text-white">
                                Service Execution: The ragpicker is notified and the service is carried out.
                            </p>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="flex flex-col items-center mr-4">
                            <div>
                                <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                                    <svg
                                        className="w-6 text-white"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <polyline
                                            fill="none"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeMiterlimit="10"
                                            points="6,12 10,16 18,8"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="pt-1">
                            <p className="mb-2 text-lg font-bold text-white">Step 7</p>
                            <p className="text-white">
                                Post-Service: Provide feedback and rate the service.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Steps
