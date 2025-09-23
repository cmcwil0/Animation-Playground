import gsap from 'gsap';
import '../../../css/Roulette.css';
import { rouletteColor, ROULETTE_NUMBERS } from '../../../pages/Roulette';
import { useRef } from 'react';

export const RoulettePreview = {
    render: (renderState) => {
      return renderState ? (
        <div className='roulette-animation'>
          <ul>
            {ROULETTE_NUMBERS.map((num, index) => {
                const angle = index * (360 / ROULETTE_NUMBERS.length); // 360 / 37 = 9.73deg each num takes up. Each index multiplys to get respective position
                const radius = 175; //distance from center of circle each num will be positioned at (container = 400 x 400 -> center point = 200 x 200 -> 175 leaves 30px margin)
                return (
                    <li className='roulette-number' key={index}>
                        <span
                          className={`roulette-number-value ${rouletteColor(num)}`} //classname assigns color
                          data-number={num}
                          style={{transform: `rotate(${angle}deg) translateY(-${radius}px)`}}
                        >
                          {num}
                        </span>
                    </li>
                )
            })}
          </ul>
          <div className='inner-circle'>
            <div className='roulette-ball'></div>
          </div>
        </div>
      ) : null;
    },
    activate: (portalRef, portalBackgroundRef, setRenderState) => {
      setRenderState(true);
      gsap.to(portalRef.current, { backdropFilter: 'blur(0px)', duration: 0.75 });
      gsap.to(portalBackgroundRef.current, { 
          background: 'brown',
          backdropFilter: 'blur(10px)', 
      });
      let tl = gsap.timeline();
      tl.to(('.roulette-ball'), {  })
    },
    deactivate: (portalRef, portalBackgroundRef, setRenderState) => {
      setRenderState(false);
      gsap.to(portalRef.current, { backdropFilter: 'blur(20px)', duration: 0.75 });
      portalBackgroundRef.current.style.background = '';
      portalBackgroundRef.current.style.backdropFilter = '';
    },
  
}
