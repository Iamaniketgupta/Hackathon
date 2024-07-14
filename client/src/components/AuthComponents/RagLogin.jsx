import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { requestUrl } from '../../../constant';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';

const RagLogin = ({ setRegisterTab }) => {
    const [formData, setFormData] = useState({
        identifier: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()
    const navigate  = useNavigate()
    
    const user = useSelector(state=>state.auth.user);
    const type = useSelector(state=>state.auth.type);

    console.log("user : " , user);
    console.log("type  : " , type)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);

            const response = await axios.post(`${requestUrl}/rp/login`, formData);
            if (response.status === 200) {
                toast.success("🚀 Login successful!");
                console.log('Login successful:', response.data);
                const obj = {
                    user : response.data.data.ragPicker,
                    type : 'ragpicker'
                }
                dispatch(login(obj));
                navigate("/ragpicker/dashboard")
                
            } else {
                toast.error("Login failed. Please try again.");
            }
            setLoading(false);

        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to login. Please try again later.";
            toast.error(errorMessage);
            console.error('Error logging in:', error);
            setLoading(false);

        }
    };

    return (
        <div className='py-4 text-gray-800'>
            <h1 className='text-center text-2xl mb-10 text-gray-800'>Welcome back Eco Warrior</h1>
            <form className='mx-5 ' onSubmit={handleSubmit}>
                <div className='w-full flex flex-col gap-2 my-4'>
                    <label htmlFor="identifier" className='px-2 text-black'>
                        Username or Email <span className='text-red-500'>*</span>
                    </label>
                    <input
                        type="text"
                        className='bg-gray-100 outline-none focus:ring-1 ring-blue-500 px-8 py-2 text-gray-900 rounded-full'
                        name="identifier"
                        id="identifier"
                        required
                        autoComplete="off"
                        placeholder='Username or Email'
                        value={formData.identifier}
                        onChange={handleChange}
                    />
                </div>
                <div className='w-full flex flex-col gap-2 my-4'>
                    <label htmlFor="password" className='px-2 text-black'>
                        Password <span className='text-red-500'>*</span>
                    </label>
                    <input
                        type="password"
                        className='bg-gray-100 outline-none focus:ring-1 ring-blue-500 px-8 py-2 text-gray-900 rounded-full'
                        name="password"
                        id="password"
                        required
                        autoComplete="off"
                        placeholder='Password'
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <button
                    type="submit"
                    className='bg-blue-500 hover:bg-blue-400 font-semibold px-4 py-2 rounded mt-10 mb-5 w-[95%] mx-auto text-white flex items-center justify-center'
                >
                    {loading ? (
                        <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    ) : (
                        'Login'
                    )}
                </button>
            </form>
            <div className='text-center mt-5'>
                <p className='text-gray-700'>
                    Don't have an account?{' '}
                    <button onClick={() => setRegisterTab(true)} className='text-blue-500'>
                        Register for free
                    </button>
                </p>
            </div>
        </div>
    );
};

export default RagLogin;
