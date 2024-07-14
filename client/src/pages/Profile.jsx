import React, { useEffect, useState } from 'react';
import Background from '../components/Background';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MapComponent from '../components/MapComponent';
import Review from '../components/Review';
import StarRating from '../components/StarRating';
import { requestUrl, RAZORPAY_KEY } from '../../constant';
import axiosInstance from '../axiosConfig/axiosConfig';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { isNumber } from 'razorpay/dist/utils/razorpay-utils';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

function Profile() {
    const { username } = useParams();
    const [rating, setRating] = useState(5);
    const [hours, setHours] = useState(1);
    const [searchParams, setSearchParams] = useSearchParams();
    const [ragpicker, setRagPicker] = useState(null);
    const [reviews, setReviews] = useState(null);
    const [review, setReview] = useState(null);

    const user = useSelector((state) => state.auth.user);
    
    const chooseHours = (e) => {
        if (isNumber(e.target.value) && e.target.value > 0 && e.target.value < 6) {
            setHours(e.target.value);
        } else {
            setHours(1);
        }
    };

    const getReviews = async () => {
        try {
            const response = await axiosInstance.get(`${requestUrl}/rating/ragpicker/${username}`);
            setReviews(response.data.data);
            console.log(reviews);
        } catch (error) {
            console.log("error : ", error);
        }
    };

    const postReview = async (e) => {
        e.preventDefault();
        try {
            if (review && review.toString().replaceAll(" ", "").length > 10 && rating && ragpicker._id) {
                const response = await axiosInstance.post(`${requestUrl}/rating/postReview`, {
                    feedback: review,
                    ratingstars: rating,
                    ragpickerid: ragpicker._id
                });
                console.log(response);
                toast.success("Review posted successfully");
                getReviews(); // Refresh the reviews list
            } else {
                toast.error("Write a review of at least 10 characters");
            }
        } catch (error) {
            console.log("error : ", error);
            toast.error("Failed to post review");
        }
    };

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
            name: ragpicker.name,
            description: "RazorPay",
            image: ragpicker.pfp,
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
        if (searchParams.get('paymentdone') === "true") {
            toast.success('Hurray! Booked Successfully');
            window.history.replaceState(null, '', username);
        }
        const getRagPicker = async () => {
            try {
                const response = await axiosInstance.get(`${requestUrl}/rp/username/${username}`);
                setRagPicker(response.data.data);
            } catch (error) {
                console.log("error : ", error);
            }
        };

        getRagPicker();
        getReviews();
        console.log(user);
    }, [username, searchParams, user]);

    return (
        ragpicker && (
            <>
                <Background>
                    <Navbar />
                    <section className='min-h-screen flex flex-col md:grid md:grid-cols-7 mt-20 gap-10'>
                        <div className="w-full md:col-span-3 flex flex-col justify-center items-center pb-10 font-bold">
                            <img
                                className="w-32 h-32 mb-3 rounded-full shadow-lg"
                                src={ragpicker.pfp}
                                alt="Bonnie image"
                            />
                            <h5 className="mb-1 font-bold capitalize text-2xl text-gray-900 dark:text-white">
                                {ragpicker?.name}
                            </h5>
                            <div className='flex flex-col p-2 gap-1 justify-center items-center'>
                                <span className="text-md text-white/90">
                                    Charges: Rs {ragpicker?.pricePerHour}/hr
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
                                        <p className="ms-2 text-sm font-bold text-gray-900 dark:text-white">{ragpicker?.ratings || 0}</p>
                                        <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400" />
                                        <a
                                            href="#"
                                            className="text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            {ragpicker?.reviews || 0} reviews
                                        </a>
                                    </div>
                                </span>
                                <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    <h2 className='w-full font-bold'>Hours you need</h2>
                                </label>
                                <input
                                    id="hours"
                                    type="number"
                                    value={hours}
                                    onChange={chooseHours}
                                    className="bg-transparent w-20 text-center border border-white/50 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 font-bold"
                                />
                            </div>

                            {user ? (
                                <button
                                    className="inline-flex focus:ring-gray-200 items-center text-lg px-4 py-2 font-medium text-center text-white rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    onClick={checkoutHandler}
                                >
                                    Book 🧹
                                </button>
                            ) : (
                                <Link to="/user/signin" className="inline-flex focus:ring-gray-200 items-center text-lg px-4 py-2 font-medium text-center text-white rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Book 🧹
                                </Link>
                            )}

                            <MapComponent position2={[ragpicker.lat, ragpicker.long]} />
                        </div>
                        <div className="col-span-4 p-5">
                            <h1 className='text-2xl md:text-4xl font-bold tracking-tight text-white text-center mb-10'>Ratings and Reviews</h1>

                            {user && (
                                <form onSubmit={postReview}>
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
                                            value={review}
                                            onChange={(e) => { setReview(e.target.value) }}
                                            className="block p-2.5 w-full text-sm text-gray-900 bg-black/20 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Write your thoughts here..."
                                        />
                                        <div className="flex justify-end">
                                            <button
                                                className="inline-flex focus:ring-gray-200 my-2 items-center px-4 py-2 font-medium text-center text-white rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </>
                                </form>
                            )}

                            {reviews && reviews.map((reviewItem) => (
                                <Review
                                    key={reviewItem._id}
                                    feedback={reviewItem.feedback}
                                    ratingstars={reviewItem.ratingstars}
                                    createdAt={reviewItem.createdAt}
                                    username={reviewItem.name} // Assuming `userid` is the username, adjust if needed
                                />
                            ))}
                        </div>
                    </section>
                </Background>
                <Footer />
            </>
        )
    );
}

export default Profile;
