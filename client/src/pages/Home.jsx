import React from 'react'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Background from '../components/Background';
import Hero from '../components/Hero';
import ShuffleHero from '../components/Shuffle';
function Home({ children }) {
    return (
        <>
            <Background>
                <header className="fixed inset-x-0 top-0 z-50">
                    <Navbar />
                </header>
                <Hero />
                <ShuffleHero />
            </Background>
            <Footer />
        </>
    )
}

export default Home