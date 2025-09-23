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



const RouletteBall = () => {
    const ballRef = useRef();
    let tl = gsap.timeline();
    useGSAP(() => {
        tl.to(ballRef, {
            transform: 'translateY(-50px)',
        })
    }, []);
    return <div className='roulette-ball' ref={ballRef}></div>
    
}

export const ANIMATIONS = {
    gradient: {
        activate: (bgRef, portalRef, setRenderState) => {
            
        },
        deactivate: (bgRef, portalRef, setRenderState) => {
            
        },
        render: (renderState) => null,
    },
    node: {
        activate: (bgRef, portalRef, setRenderState) => {
            setRenderState(true);
            gsap.to(portalRef.current, { backdropFilter: 'blur(0px)', duration: 0.75 });
        },
        deactivate: (bgRef, portalRef, setRenderState) => {
            setRenderState(false);
            gsap.to(portalRef.current, { backdropFilter: 'blur(20px)', duration: 0.75 });
        },
        render: (renderState) =>
            renderState ? (
                <video 
                    src={nodeAnimation}
                    autoPlay
                    loop
                    muted
                    style={{width: '100%', height: '100%', objectFit: 'cover', display: 'block'}}
                />           
            ) : null,
        },
   
        //add more animations...
};




