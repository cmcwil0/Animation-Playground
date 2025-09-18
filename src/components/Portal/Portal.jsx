import './Portal.css';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import nodeAnimation from '../../assets/nodeAnimation.mp4';
import { useRef, useEffect, useState } from 'react';
import { initialState, portalAppear} from './portalAnimations';

const Portal = () => {
    const portalRef = useRef(); //reference portal dom element
    const portalBgRef = useRef();
    const leftCaretRef = useRef();
    const rightCaretRef = useRef();
    const [isStarted, setIsStarted] = useState(false);
    const [showNode, setShowNode] = useState(false);


    //sets initial state
    useEffect(() => {
        gsap.set(portalRef.current, initialState());
    }, []);
    
    const handleAppear = () => {
        let tl = gsap.timeline(); //sets up timeline
        tl.to(portalRef.current, portalAppear(() => setIsStarted(true)))
         .to(portalBgRef.current, {
            onStart: () => portalBgRef.current.classList.add('moving-gradient'), //adds gradientAnimation class
            duration: 0.35
         })
         .to(portalBgRef.current, { opacity: 1, duration: 0.75 }) //fades in gradient for smooth transition
         .to([leftCaretRef.current, rightCaretRef.current], { opacity: 0.5 }) //fades in left and right arrows
    };

    const handleChange = () => {
        let tl = gsap.timeline();
        tl.to(portalBgRef.current, {opacity: 0, duration: 0.75}) //fades out for smooth transition
            .to(portalBgRef.current, { 
                duration: 0.1,
                onStart: ()=> portalBgRef.current.classList.remove('moving-gradient')})
            .to(portalBgRef.current, { onStart: () =>  setShowNode(true)}) //sets node animation
            .to(portalBgRef.current, { opacity: 1}) //sets opacity back to 1 so it will show contents
            .to(portalRef.current, { backdropFilter: 'blur(0px)'})

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
        <div className='portal-background' ref={portalBgRef}>
            {showNode && (
                <video 
                    src={nodeAnimation}
                    autoPlay
                    loop
                    muted
                    style={{width: '100%', height: '100%', objectFit: 'cover', display: 'block'}}
                />
            )}
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
        <svg className='caret caret-left' ref={leftCaretRef} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="matrix(-1, 0, 0, 1, 0, 0)" filter="url(#caret-shadow)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M8.5 17C8.5 17.4045 8.74364 17.7691 9.11732 17.9239C9.49099 18.0787 9.92111 17.9931 10.2071 17.7071L15.2071 12.7071C15.5976 12.3166 15.5976 11.6834 15.2071 11.2929L10.2071 6.29289C9.92111 6.00689 9.49099 5.92134 9.11732 6.07612C8.74364 6.2309 8.5 6.59554 8.5 7V17Z" fill="#ffffff"></path> </g></svg>
        <svg className='caret caret-right' ref={rightCaretRef} onClick={handleChange} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#caret-shadow)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M8.5 17C8.5 17.4045 8.74364 17.7691 9.11732 17.9239C9.49099 18.0787 9.92111 17.9931 10.2071 17.7071L15.2071 12.7071C15.5976 12.3166 15.5976 11.6834 15.2071 11.2929L10.2071 6.29289C9.92111 6.00689 9.49099 5.92134 9.11732 6.07612C8.74364 6.2309 8.5 6.59554 8.5 7V17Z" fill="#ffffff"></path> </g></svg>
    </div>
  )
}

export default Portal
