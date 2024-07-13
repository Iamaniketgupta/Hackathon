import React, { useState } from 'react';
import axios from 'axios';
import Otp from './components/Otp';
import { FaRegEyeSlash, FaEye } from "react-icons/fa";
import { toast } from 'react-toastify';
import { requestUrl } from '../../../constant';


const requestapi= `${requestUrl}/rp`
const RagSignin = ({ setRegisterTab }) => {
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
    });

    const [otpsent, setOtpSent] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const usernamePattern = /^[a-zA-Z0-9-_]+$/;
        if (!usernamePattern.test(formData.username)) {
            toast.error("Username can only contain letters, numbers, '-' or '_', and no spaces.");
            return;
        }

        try {
            setLoading(true);

            const response = await axios.post(`${requestapi}/register`, formData);
            if (response.status === 200) {
                setOtpSent(true);
                toast.success("🚀 OTP Sent on your Email");
            } else {
                toast.error(error.response.data.message || "Registration failed. Please try again.");
            }
            setLoading(false);

        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error(error.response.data.message || "Failed to register. Please try again later.");
            setLoading(false);

        }
    };

    const togglePassVis = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className='max-w-md mx-auto p-5'>
            {!otpsent ? (
                <>
                    <h1 className='text-center text-2xl md:text-3xl mb-8 font-semibold text-gray-800'>Partner as Rag Picker</h1>
                    <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
                        <div className='flex gap-3 md:gap-4'>
                            <div className='w-full md:w-1/2 space-y-2'>
                                <label htmlFor="name" className='block text-sm px-2 font-medium text-gray-700'>
                                    Full Name <span className='text-red-500'>*</span>
                                </label>
                                <input
                                    type="text"
                                    autoComplete="off"
                                    className='bg-gray-100 outline-none focus:ring-1 ring-blue-500 px-4 py-2 text-gray-900 rounded-full w-full'
                                    name="name"
                                    id="name"
                                    required
                                    placeholder='Full Name'
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='w-full md:w-1/2 space-y-2'>
                                <label htmlFor="username" className='block px-2 text-sm font-medium text-gray-700'>
                                    Username <span className='text-red-500'>*</span>
                                </label>
                                <input
                                    type="text"
                                    autoComplete="off"
                                    className='bg-gray-100 outline-none focus:ring-1 ring-blue-500 px-4 py-2 text-gray-900 rounded-full w-full'
                                    name="username"
                                    id="username"
                                    required
                                    placeholder='Username'
                                    value={formData.username}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className='space-y-2'>
                            <label htmlFor="email" className='block text-sm px-2 font-medium text-gray-700'>
                                Email <span className='text-red-500'>*</span>
                            </label>
                            <input
                                type="email"
                                autoComplete="off"
                                className='bg-gray-100 outline-none focus:ring-1 ring-blue-500 px-4 py-2 text-gray-900 rounded-full w-full'
                                name="email"
                                id="email"
                                required
                                placeholder='Email'
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='space-y-2 relative mb-4'>
                            <label htmlFor="password" className='block text-sm px-2 font-medium text-gray-700'>
                                Password <span className='text-red-500'>*</span>
                            </label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                autoComplete="off"
                                className='bg-gray-100 outline-none focus:ring-1 ring-blue-500 px-4 py-2 text-gray-900 rounded-full w-full'
                                name="password"
                                id="password"
                                required
                                placeholder='Password'
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <button
                                type="button"
                                className='absolute inset-y-0 right-3 top-5 flex items-center px-3 text-gray-700'
                                onClick={togglePassVis}
                            >
                                {showPassword ? (
                                    <FaEye className='h-5 w-5' aria-hidden='true' />
                                ) : (
                                    <FaRegEyeSlash className='h-5 w-5' aria-hidden='true' />
                                )}
                            </button>
                        </div>
                        <button
                        typeof='submit'
                            className='bg-blue-500 hover:bg-blue-400 font-semibold px-4 py-2 rounded   w-[95%] block mx-auto text-white flex items-center justify-center'
                        >
                            {loading ? (
                                <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                'Join Now'
                            )}
                        </button>

                        <div className='text-center mt-5'>
                            <p className='text-gray-700'>
                                Already a Partner?{' '}
                                <button onClick={() => setRegisterTab(false)} className='text-blue-500'>
                                    Login
                                </button>
                            </p>
                        </div>
                    </form>
                </>
            ) : (
                <Otp formData={formData} requestapi={requestapi} setOtpSent={setOtpSent} />
            )}
        </div>
    );
};

export default RagSignin;
