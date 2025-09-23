import gsap from 'gsap'

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
