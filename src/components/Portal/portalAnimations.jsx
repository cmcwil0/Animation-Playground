import gsap from 'gsap';
import nodeAnimation from '../../assets/nodeAnimation.mp4';



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

// European roulette numbers
const ROULETTE_NUMBERS = [
    0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 
    24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26
];

export const ANIMATIONS = {
    gradient: {
        activate: (bgRef, portalRef, setRenderState) => {
            bgRef.current.classList.add('moving-gradient');
            setRenderState(null);
        },
        deactivate: (bgRef, portalRef, setRenderState) => {
            bgRef.current.classList.remove('moving-gradient');
            setRenderState(null);
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
        roulette: {
            activate: (bgRef, portalRef, setRenderState) => {
                setRenderState(true);
                gsap.to(portalRef.current, { backdropFilter: 'blur(0px)', duration: 0.75 });
                gsap.to(bgRef.current, {
                    background: 'brown',
                    backdropFilter: 'blur(10px)', 
                });
            },
            deactivate: (bgRef, portalRef, setRenderState) => {
                setRenderState(false);
                gsap.to(portalRef.current, { backdropFilter: 'blur(20px)', duration: 0.75 });
                gsap.to(bgRef.current, {background: 'transparent', backdropFilter: 'blur(0px)'})
            },
            render: (renderState) =>
                renderState ? (
                    <div className='roulette-container'>
                        <ul>
                            {ROULETTE_NUMBERS.map((num, index) => {
                                const angle = index * (360 / ROULETTE_NUMBERS.length); // 360 / 37 = 9.73deg each num takes up. Each index multiplys to get respective position
                                const radius = 170; //distance from center of circle each num will be positioned at (container = 400 x 400 -> center point = 200 x 200 -> 170 leaves 30px margin)
                                return (
                                    <li className='roulette-number' key={index}>
                                        <span
                                            className={`roulette-number-value ${num === 0 ? 'green' : (num % 2 === 0 ? 'black' : 'red')}`} //assigns color class based off 
                                            data-number={num}
                                            style={{transform: `rotate(${angle}deg) translateY(-${radius}px)` }}
                                        >
                                            {num}
                                        </span>
                                    </li>
                                );
                            })}
                        </ul>
                        <div className='inner-circle'></div>
                        <div className='roulette-ball'></div>
                    </div>                                                                  
                ) : null,
            
        },
        //add more animations...
};




