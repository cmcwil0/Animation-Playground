import gsap from 'gsap';


export const gradientAnimation = {
    activate: (portalRef, portalBackgroundRef, setRenderState) => {
        portalBackgroundRef.current.classList.add('moving-gradient');
        setRenderState(false);
    },
    deactivate: (portalRef ,portalBackgroundRef, setRenderState) => {
        portalBackgroundRef.current.classList.remove('moving-gradient');
        setRenderState(false);
    },
    render: (renderState) => null,
}


const Gradient = () => {
  return (
    <div className="gradient-container">
      
    </div>
  )
}

export default Gradient
