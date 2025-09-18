import gsap from 'gsap';

//GSAP intial state
export const initialState = () => ({ 
    borderWidth: 3, 
    borderRadius: '50%', 
    borderColor: 'white', 
    borderStyle: 'solid',
    backgroundColor: 'white', 
    width: 100, 
    height: 100,
});

//portal appear animation
export const portalAppear = (onComplete) => ({ 
    width: 400, 
    height: 400,
    opacity: 1,
    duration: 0.75,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    boxShadow: '0 4px 16px rgba(0,0,0,0.85)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.25)',
    onComplete,
});


//animation 1, glassmphormism 



