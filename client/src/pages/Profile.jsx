import React, { useEffect, useState } from 'react'
import Background from '../components/Background'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MapComponent from '../components/MapComponent';
import Review from '../components/Review';
import StarRating from '../components/StarRating';
import { requestUrl, RAZORPAY_KEY } from '../../constant';
import axiosInstance from '../axiosConfig/axiosConfig';
import { useParams, useSearchParams } from 'react-router-dom';
import { isNumber } from 'razorpay/dist/utils/razorpay-utils';
import { toast } from 'react-toastify';

function Profile() {
    const { username } = useParams();
    const [rating, setRating] = useState(5);
    const [hours, setHours] = useState(1);
    const [searchParams, setSearchParams] = useSearchParams();

    const chooseHours=(e)=>{
        if(isNumber(e.target.value) && e.target.value>0 && e.target.value<6){
             setHours(e.target.value);
        }else{
            setHours(1);
        }
    }

    const checkoutHandler = async () => {
        const instance = async () => {
            try {
                const response = await axiosInstance.post(`${requestUrl}/payment/create_order`, {
                    username,
                    hours
                });
                return response.data.message;
            } catch (error) {
                console.log("error : ", error);
            }
        };
        const order = await instance();
        const key = RAZORPAY_KEY;
        const options = {
            key,
            amount: Math.ceil(order.amount / 100),
            currency: "INR",
            name: "RagPicker",
            description: "RazorPay",
            image: "https://cdna.artstation.com/p/assets/images/images/014/813/486/large/kailas-matur-rag-picker-1.jpg?1545654474",
            order_id: order.id,
            callback_url: `${requestUrl}/payment/verify_order`,
            notes: {
                "address": "Razorpay Corporate Office"
            },
            theme: {
                "color": "#121212"
            }
        };
        const razor = new window.Razorpay(options);
        razor.open();
    };
    useEffect(() => {
        console.log(searchParams);
        if (searchParams.get('paymentdone') == "true") {
          toast.success('Hurray! Booked Successfully');
          window.history.replaceState(null, '', username);
        }
      }, []);

    return (
        <>
            <Background>
                <Navbar />
                <section className='min-h-screen flex flex-col md:grid  md:grid-cols-7 mt-20 gap-10'>
                    <div className="w-full md:col-span-3 flex flex-col justify-center items-center pb-10 font-bold">
                        <img
                            className="w-32 h-32 mb-3 rounded-full shadow-lg"
                            src="https://cdna.artstation.com/p/assets/images/images/014/813/486/large/kailas-matur-rag-picker-1.jpg?1545654474"
                            alt="Bonnie image"
                        />
                        <h5 className="mb-1 text-2xl font-medium text-gray-900 dark:text-white">
                            Bonnie Green
                        </h5>
                        <div className='flex flex-col p-2 gap-1 justify-center items-center'>
                            <span className="text-md text-white/90">
                                Charges: Rs100/hr
                            </span>
                            <span className="text-md text-white/90">
                                <div className="flex items-center">
                                    <svg
                                        className="w-4 h-4 text-yellow-300 me-1"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 22 20"
                                    >
                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                    </svg>
                                    <p className="ms-2 text-sm font-bold text-gray-900 dark:text-white">4.95</p>
                                    <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400" />
                                    <a
                                        href="#"
                                        className="text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        73 reviews
                                    </a>
                                </div>
                            </span>
                            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                <h2 className='w-full font-bold'>Hours you need</h2>
                            </label>
                            <input id="hours" type="number" value={hours} onChange={chooseHours} className="bg-transparent w-20 text-center border border-white/50 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5   dark:placeholder-gray-400
                            dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 font-bold"/>

                        </div>
                        <button
                            className="inline-flex focus:ring-gray-200  items-center text-lg px-4 py-2 font-medium text-center text-white rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={checkoutHandler}
                        >
                            Book 🧹
                        </button>
                        <MapComponent />
                    </div>
                    <div className="col-span-4 p-5">
                        <h1 className='text-2xl md:text-4xl font-bold tracking-tight text-white text-center mb-10'>Ratings and Reviews</h1>
                        <form action="">
                            <>
                                <label
                                    htmlFor="message"
                                    className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
                                >
                                    Your review
                                </label>
                                <StarRating rating={rating} setRating={setRating} />
                                <textarea
                                    id="message"
                                    rows={4}
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-black/20 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Write your thoughts here..."
                                    defaultValue={""}
                                />
                                <div className="flex justify-end">
                                    <button
                                        className="inline-flex focus:ring-gray-200 my-2  items-center px-4 py-2 font-medium text-center text-white rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </>

                        </form>
                        <Review />
                        <Review />
                        <Review />
                    </div>
                </section>
            </Background>
            <Footer />
        </>
    )
}

export default Profile