import React from 'react'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Background from '../components/Background';
import Hero from '../components/Hero';
import ShuffleHero from '../components/Shuffle';
import FAQ from '../components/FAQ';
import Steps from '../components/Steps';
function Home() {   
    return (
        <>
            <Background>
                <Navbar />
                <Hero />
                <a name="steps"></a>
                <Steps/>
                <ShuffleHero />
                <FAQ/>
            </Background>
            <Footer />
        </>
    )
}

export default Home