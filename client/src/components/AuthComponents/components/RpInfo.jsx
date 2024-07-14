import React from 'react';

const RpInfo = () => {
    return (
        <div className='bg-white'>
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
    );
}

export default RpInfo;
