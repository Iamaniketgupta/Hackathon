import React from 'react'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Background from '../components/Background';
import RagCard from '../components/RagCard';

function Listing() {
    return (
        <>
            <Background>
              <Navbar />
                <section className='min-h-screen flex flex-col mt-20'>
                    <h1 className='text-2xl md:text-4xl font-bold tracking-tight text-white text-center mb-10'>Book Your RagPickers 🧹</h1>
                    <div className="Sort mb-10">
                        <form class="max-w-sm">
                            <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">                        
                                <h2 className='text-xl w-full font-bold'>Sort By</h2>                            
                            </label>
                            <select id="countries" class="bg-transparent text-lg border border-white/50 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:placeholder-gray-400
                            dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 font-bold">
                                <option selected value="" className='bg-gray-900'>Choose Sort By</option>
                                <option value="cost" className='bg-gray-900'>Cost 💰</option>
                                <option value="ratings" className='bg-gray-900'>Ratings 🌟</option>
                                <option value="distance" className='bg-gray-900'>Distance 🚴‍♂️</option>
                            </select>
                        </form>
                    </div>
                    <div className="grid md:grid-cols-3 gap-10  min-h-screen">
                       <RagCard/>
                       <RagCard/>
                       <RagCard/>
                       <RagCard/>
                       <RagCard/>
                       <RagCard/>
                    </div>
                </section>
            </Background>
            <Footer />
        </>
    )
}

export default Listing