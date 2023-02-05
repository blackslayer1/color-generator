import './App.css';
import { useState } from 'react';

function App() {
  function randomIntFromInterval(min: number, max: number): number { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  const hexLetters: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
  const [color, setColor] = useState<string>('');
  const [secondColor, setSecondColor] = useState<string>('');

  const inputIsValid = (input: string): boolean => {
      let bool = false;
      for(let i=0; i<hexLetters.length; i++){
        if(hexLetters[i] === input){
          bool = true;
        }
      }
      return bool;
  }

  const generate = () => {
    let color_ = ['#'];
    if((document.getElementById('checkbox2') as HTMLInputElement).checked === false){
      for(let i=0; i<6; i++){
        color_.push(hexLetters[randomIntFromInterval(0, hexLetters.length-1)]);
      }
      if((document.getElementById('checkbox') as HTMLInputElement).checked === false){
        setColor(color_.toString().replace(/,/g, ""));
        document.body.style.background=color_.toString().replace(/,/g, "");
      } else {
        let secondColor_ = ['#'];
        for(let i=0; i<6; i++){
          secondColor_.push(hexLetters[randomIntFromInterval(0, hexLetters.length-1)]);
        }
        setSecondColor(secondColor_.toString().replace(/,/g, ""));
        setColor(`${color_.toString().replace(/,/g, "")}, ${secondColor}`)
        document.body.style.background='linear-gradient('+(Math.random()*360) + 'deg,' + color + ' 0%,'+ secondColor +  ' 100%)';
      }
    } else {
      let input = ((document.getElementById('input') as HTMLInputElement).value).toUpperCase();
      if(inputIsValid(input) === false){
        alert("Invalid Input");
      } else {
        if((document.getElementById('checkbox') as HTMLInputElement).checked === false){
          for(let i=0; i<6; i++){
            let random = hexLetters[randomIntFromInterval(0, hexLetters.length-1)];
            if(random === input){
              while(random === input){
                random = hexLetters[randomIntFromInterval(0, hexLetters.length-1)];
              }
            }
            color_.push(random);
            setColor(color_.toString().replace(/,/g, ""));
            document.body.style.background=color_.toString().replace(/,/g, "");
          }
        } else {
          for(let i=0; i<6; i++){
            let random = hexLetters[randomIntFromInterval(0, hexLetters.length-1)];
            if(random === input){
              while(random === input){
                random = hexLetters[randomIntFromInterval(0, hexLetters.length-1)];
              }
            }
            color_.push(random);
          }

          let secondColor_ = ['#'];
          for(let i=0; i<6; i++){
            let random = hexLetters[randomIntFromInterval(0, hexLetters.length-1)];
            if(random === input){
              while(random === input){
                random = hexLetters[randomIntFromInterval(0, hexLetters.length-1)];
              }
            }
            secondColor_.push(random);
          }
          setSecondColor(secondColor_.toString().replace(/,/g, ""));
          setColor(`${color_.toString().replace(/,/g, "")}, ${secondColor}`);
          document.body.style.background='linear-gradient('+(Math.random()*360) + 'deg,' + color + ' 0%,'+ secondColor +  ' 100%)';
        }

      }
    }
  }

  return (
    <div className="App">
      <h2>Random Color Generator</h2>
      <h1>{color}</h1>
      <button onClick={generate}>Generate</button>
      <br/><br/>
      <input id="checkbox" type="checkbox"/>
      <label>Gradient</label>
      <br/>
      <input id="checkbox2" type="checkbox"/>
      <label>Exclude a letter/number from hex </label>
      <input id="input" style={{width: "20px", height: "25px", fontSize: "20px"}} maxLength={1} />
    </div>
  );
}

export default App;
