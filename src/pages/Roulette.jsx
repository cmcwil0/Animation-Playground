import '../css/Roulette.css';
import gsap from 'gsap';

//european roulette table
export const ROULETTE_NUMBERS = [
    0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 
    24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26
];

export function rouletteColor(num) { //assigns color based off standard roulette rules
  if(num === 0) { return 'green' } else if(num <= 10 || (num >= 19 && num <= 28)) { return num % 2 === 0 ? 'black' : 'red'} else {
    return num % 2 === 0 ? 'red' : 'black' } 
};



const Roulette = () => {
  return (
    <div className="roulette-container">
        roulette
    </div>
  )
}

export default Roulette
