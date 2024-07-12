import { useState } from 'react'
import './App.css'
import Hero from './components/Hero';
import ShuffleHero from './components/Shuffle';
import Back from './components/Back';

function App() {

  return (
  
      <Back>

        <Hero />
        <ShuffleHero />

      </Back>
  )
}

export default App
