import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home' 
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import Gradient from './pages/Gradient';
import Ascii from './pages/Ascii';
import Roulette from './pages/Roulette';

gsap.registerPlugin(useGSAP);

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/home' element={<Home />}/>
        <Route path='/gradient' element={<Gradient />} />
        <Route path='/ascii' element={<Ascii/>} />
        <Route path='/roulette' element={<Roulette />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
