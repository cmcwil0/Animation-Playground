import gsap from 'gsap';
import nodeAnimation from '../assets/nodeAnimation.mp4'

export const AsciiPreview = {
  activate: (portalRef, portalBackgroundRef, setRenderState) => {
    setRenderState(true);
    gsap.to(portalRef.current, { backdropFilter: 'blur(0px)', duration: 1 })
    
  },
  deactivate: (portalRef, portalBackgroundRef, setRenderState) => {
    gsap.to(portalRef.current, { backdropFilter: 'blur(20px)', duration: 0.75 })
    setRenderState(false);
  },
  render: () => (
    <div className='ascii-animation'>
      <video 
        src={nodeAnimation}
        autoPlay
        loop
        muted
        style={{width: '100%', height: '100%', objectFit: 'cover', display: 'block'}}
       />
    </div>
  )
}


const Ascii = () => {
  return (
    <div className='ascii-container'>
      <video 
        src={nodeAnimation}
        autoPlay
        loop
        muted
        style={{width: '100vw', height: '100vh', objectFit: 'cover', display: 'block'}}
       />
    </div>
  )
}

export default Ascii
