import './Portal.css'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef, useEffect, useState } from 'react';

const Portal = () => {
    const portalRef = useRef(); //reference portal dom element
    const [isStarted, setIsStarted] = useState(false);

    //GSAP Initial state and hover animation
    const initialState = { borderWidth: 4, 
        borderRadius: '50%', 
        borderColor: 'white', 
        borderStyle: 'solid',
        backgroundColor: 'white', 
        width: 100, 
        height: 100,
    };

    const handleMouseEnter = () => {
        if(!isStarted) {
            gsap.to(portalRef.current, { scale: 1.1, opacity: 0.5, });
        }
    };

    const handleMouseLeave = () => {
        if(!isStarted) {
            gsap.to(portalRef.current, { scale: 1, opacity: 1, });
        }
    };

    const portalAppear = { backgroundColor: 'transparent', 
        width: 400, 
        height: 400,
        opacity: 1,
        onComplete: () => setIsStarted(true),
    };

    //sets initial state
    useEffect(() => {
        gsap.set(portalRef.current, initialState);
    }, []);

    const handleAppear = () => {
        gsap.to(portalRef.current, portalAppear);
    };

    //GSAP Timeline
    


  return (
    <div className='portal-container'>
      <div
       className='portal' 
       ref={portalRef} 
       onClick={handleAppear}
       onMouseEnter={handleMouseEnter}
       onMouseLeave={handleMouseLeave}
       style={{ cursor: isStarted ? 'default' : 'pointer'}}
       >
      </div>
    </div>
  )
}

export default Portal
