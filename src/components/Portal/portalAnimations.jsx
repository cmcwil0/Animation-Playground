import gsap from 'gsap';
import nodeAnimation from '../../assets/nodeAnimation.mp4';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';


//GSAP intial state
export const initialState = () => ({
    backdropFilter: 'none',
    borderRadius: '50%', 
    border: '1px solid white', 
    backgroundColor: 'white',
    boxShadow: '0 4px 16px rgba(0,0,0,0.5)', 
    width: 100, 
    height: 100,
});

//portal appear animation
export const portalAppear = (onComplete) => ({ 
    width: 400, 
    height: 400,
    opacity: 1,
    scale: 1,
    duration: 0.75,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    boxShadow: '0 4px 16px rgba(0,0,0,0.85)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.25)',
    onComplete,
});


