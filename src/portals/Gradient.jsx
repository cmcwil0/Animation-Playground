import gsap from 'gsap';

export const GradientPreview = {
    activate: (portalRef, portalBackgroundRef, setRenderState) => {
        setRenderState(null);
        portalBackgroundRef.current.classList.add('moving-gradient');
      
    },
    deactivate: (portalRef ,portalBackgroundRef, setRenderState) => {
        portalBackgroundRef.current.classList.remove('moving-gradient');
        setRenderState(null);
    },
    render: (renderState) => null,
}


const Gradient = () => {
  return (
    <div className="gradient-container">
      ayooo gradient
    </div>
  )
}

export default Gradient
