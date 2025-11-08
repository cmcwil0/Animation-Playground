import { useGSAP } from '@gsap/react';
import '../css/Roulette.css';
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { useRef } from 'react';

//european roulette table
export const ROULETTE_NUMBERS = [
    0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 
    24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26
];

export function rouletteColor(num) { //assigns color based off standard roulette rules
  if(num === 0) { return 'green' } else if(num <= 10 || (num >= 19 && num <= 28)) { return num % 2 === 0 ? 'black' : 'red'} else {
    return num % 2 === 0 ? 'red' : 'black' } 
};

export const RoulettePreview = {
    render: (renderState) => {
      return renderState ? (
        <div className='roulette-preview'>
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
      
    },
    deactivate: (portalRef, portalBackgroundRef, setRenderState) => {
      setRenderState(false);
      gsap.to(portalRef.current, { backdropFilter: 'blur(20px)', duration: 0.75 });
      portalBackgroundRef.current.style.background = '';
      portalBackgroundRef.current.style.backdropFilter = '';
    },
  
}

function getLandedNumber() {

}



const Roulette = () => {
  return (
    <div className="roulette-container">
        <main className='roulette-table'>
          <div className='roulette-wheel'>
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

          <div className='betting-container'>
            <div className='betting-numbers'>

              

              <div className='main-numbers'>
                {ROULETTE_NUMBERS.sort((a, b) => b-a).map((num) => {
                  if(num !== 0) {console.log(num);return (
                    <div className={`main-number ${rouletteColor(num)}`} data-number={num}>{num}</div>
                  )}
                })}
              </div>


            </div>
            <div className='outside-bets'>
              <div className='diamond black'></div>
              <div className='diamond red'></div>
            </div>
          </div>

        </main>
    </div>
  )
}

export default Roulette
