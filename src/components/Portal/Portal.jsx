import './Portal.css'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef, useEffect, useState } from 'react';
import { initialState, portalAppear, movingGradient} from './portalAnimations';

const Portal = () => {
    const portalRef = useRef(); //reference portal dom element
    const portalBgRef = useRef();
    const [isStarted, setIsStarted] = useState(false);


    //sets initial state
    useEffect(() => {
        gsap.set(portalRef.current, initialState());
    }, []);
    
    
    const handleAppear = () => {
        let tl = gsap.timeline(); //sets up timeline

        tl.to(portalRef.current, portalAppear(() => setIsStarted(true)))
         .to(portalBgRef.current, {
            onStart: () => portalBgRef.current.classList.add('moving-gradient'),
            duration: 0.5
         })
         .to(portalBgRef.current, { opacity: 1, duration: 1 })

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



  return (
    <div className='portal-container'>
      <div className='portal-background' ref={portalBgRef}/>
      <div
       className='portal' 
       ref={portalRef}
       onClick={handleAppear}
       onMouseEnter={handleMouseEnter}
       onMouseLeave={handleMouseLeave}
       style={{ cursor: isStarted ? 'default' : 'pointer'}}
       />
    </div>
  )
}

export default Portal
