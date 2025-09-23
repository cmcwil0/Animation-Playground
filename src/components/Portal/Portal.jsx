import './Portal.css';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef, useEffect, useState, act } from 'react';
import { rouletteAnimation } from './portals/Roulette/Roulette';
import { gradientAnimation } from './portals/Gradient/Gradient';
import { asciiAnimation } from './portals/Ascii/Ascii';

const ANIMATIONS = [
    gradientAnimation, asciiAnimation, rouletteAnimation
]

const initialState = () => ({
    backdropFilter: 'none',
    borderRadius: '50%', 
    border: '1px solid white', 
    backgroundColor: 'white',
    boxShadow: '0 4px 16px rgba(0,0,0,0.5)', 
    width: 100, 
    height: 100,
});

const portalAppear = (onComplete) => ({ 
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

const Portal = () => {
    const portalRef = useRef(); //reference portal dom element
    const portalBackgroundRef = useRef(); //using these is best practice in react when referenceing dom elements
    const leftCaretRef = useRef();
    const rightCaretRef = useRef();
    const [isStarted, setIsStarted] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0); //defaults to gradient at index 0 of array

    const [renderState, setRenderState] = useState(null); //render state for certain animations

    //sets initial state
    useGSAP(() => {
        gsap.set(portalRef.current, initialState());
    }, []);
    
    const handleAppear = () => {
        let tl = gsap.timeline(); //sets up timeline
        tl.to(portalRef.current, portalAppear(() => setIsStarted(true)))
         .to(portalBackgroundRef.current, {
            onStart: () => ANIMATIONS[activeIndex].activate(portalRef, portalBackgroundRef, setRenderState), //.activates current index (initial set to gradient)
            duration: 0.35
         })
         .to(portalBackgroundRef.current, { opacity: 1, duration: 0.75 }) //fades in gradient for smooth transition
         .to([leftCaretRef.current, rightCaretRef.current], { opacity: 0.5 }) //fades in left and right carets
    };

    const handleChange = (newIndex) => {
        let tl = gsap.timeline();
        tl.to(portalBackgroundRef.current, {opacity: 0, duration: 1}) //fades out for smooth transition
            .to(portalBackgroundRef.current, { 
                duration: 0.1,
                onStart: () => {
                    ANIMATIONS[activeIndex].deactivate(portalRef, portalBackgroundRef, setRenderState);
                    setActiveIndex(newIndex);
                    ANIMATIONS[newIndex].activate(portalRef, portalBackgroundRef, setRenderState);
                },
            })
            .to(portalBackgroundRef.current, { opacity: 1, duration: 3}) //sets opacity back to 1 so it will show contents
    };

    const handleMouseEnter = () => {
        if(!isStarted) { //initial hover
            gsap.to(portalRef.current, { opacity: 0.5, scale: 1.1 });
        }
    };

    const handleMouseLeave = () => {
        if(!isStarted) { //initial hover
            gsap.to(portalRef.current, { opacity: 1, scale: 1 });
        }
    };

    const handlePrev = () => { //caret back <
        const prevIndex = (activeIndex - 1 + ANIMATIONS.length) % ANIMATIONS.length;
        handleChange(prevIndex);
    };

    const handleNext = () => { //caret forward >
        const nextIndex = (activeIndex + 1) % ANIMATIONS.length;
        handleChange(nextIndex);
    };



  return (
    <div className='portal-container'>
        <div className='portal-background' ref={portalBackgroundRef}>
            {ANIMATIONS[activeIndex].render(renderState)}
        </div>
        <div
         className='portal' 
         ref={portalRef}
         onClick={handleAppear}
         onMouseEnter={handleMouseEnter}
         onMouseLeave={handleMouseLeave}
         style={{ cursor: isStarted ? 'default' : 'pointer'}}
         />
        <svg width="0" height="0" style={{ position: 'absolute' }}> {/* shadow svg*/}
          <filter id="caret-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#000" floodOpacity="0.8"/>
          </filter>
        </svg>
        <svg className='caret caret-left' ref={leftCaretRef} onClick={handlePrev} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="matrix(-1, 0, 0, 1, 0, 0)" filter="url(#caret-shadow)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M8.5 17C8.5 17.4045 8.74364 17.7691 9.11732 17.9239C9.49099 18.0787 9.92111 17.9931 10.2071 17.7071L15.2071 12.7071C15.5976 12.3166 15.5976 11.6834 15.2071 11.2929L10.2071 6.29289C9.92111 6.00689 9.49099 5.92134 9.11732 6.07612C8.74364 6.2309 8.5 6.59554 8.5 7V17Z" fill="#ffffff"></path> </g></svg>
        <svg className='caret caret-right' ref={rightCaretRef} onClick={handleNext} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#caret-shadow)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M8.5 17C8.5 17.4045 8.74364 17.7691 9.11732 17.9239C9.49099 18.0787 9.92111 17.9931 10.2071 17.7071L15.2071 12.7071C15.5976 12.3166 15.5976 11.6834 15.2071 11.2929L10.2071 6.29289C9.92111 6.00689 9.49099 5.92134 9.11732 6.07612C8.74364 6.2309 8.5 6.59554 8.5 7V17Z" fill="#ffffff"></path> </g></svg>
    </div>
  )
}

export default Portal
