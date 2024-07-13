import React, { useState } from 'react';
import Background from '../components/Background'
import UserSignin from '../components/AuthComponents/UserSignIn';
import UserLogin from '../components/AuthComponents/UserLogin';

const UserAuth = () => {
    const [RegisterTab, setRegisterTab] = useState(true);

    return (
        <Background>
            <div className=' overflow-hidden '>
                <div className=' p-2 '>

                    <div className="flex max-md:mt-16 max-sm:text-xs  mb-4 max-w-[280px] md:max-w-[400px] mx-auto gap-3 shadow-md border rounded-full">
                        <div
                            onClick={() => setRegisterTab(true)}
                            className={`w-1/2 rounded-full font-semibold ${RegisterTab ? 'bg-blue-600  text-white' : 'bg-white text-gray-900'}  m-1 flex items-center justify-center h-8 md:h-10 cursor-pointer`}
                        >
                            Register
                        </div>
                        <div
                            onClick={() => setRegisterTab(false)}
                            className={`w-1/2 rounded-full font-semibold ${!RegisterTab ? 'bg-blue-600  text-white' : 'bg-white text-gray-900'} m-1 flex items-center justify-center h-8 md:h-10 cursor-pointer`}
                        >
                            Login
                        </div>
                    </div>
                    {/* Tabs */}

                    <div className='md:p-5 flex  mx-auto  max-md:max-w-[400px] max-w-[500px] max-md:my-10   items-center'>
                        <div className='bg-white border w-full shadow-lg  rounded-xl max-sm:text-sm  md:p-5'>
                            {RegisterTab ? <UserSignin setRegisterTab={setRegisterTab} /> : <UserLogin setRegisterTab={setRegisterTab} />}
                        </div>
                    </div>
                </div>

            </div>
        </Background>
    );
}

export default UserAuth;
