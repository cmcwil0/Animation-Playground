import './Roulette.css';
import gsap from 'gsap';

//european roulette table
const ROULETTE_NUMBERS = [
    0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 
    24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26
];

export const rouletteAnimation = {
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
    gsap.to(portalBackgroundRef.current, {background: 'transparent', backdropFilter: 'blur(0px)'})
  },
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
                        className={`roulette-number-value ${num === 0 ? 'green' : (num % 2 === 0 ? 'black' : 'red')}`} //assigns color class based off 
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
  }
}

const Roulette = () => {
  return (
    <div className="roulette-container">
        roulette
    </div>
  )
}

export default Roulette
