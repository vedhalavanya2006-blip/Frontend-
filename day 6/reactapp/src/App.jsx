import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const increase=()=>{
    setCount(count+1);
  };
  const decrese=()=>{
    setCount(count-1);
  };
  const reset=()=>{
    setCount(0);
  };

  return (
    <div>
      <h2>count Application</h2>
      <span>{count}</span><br></br>
      <button onClick={increase}>increase</button>
      <button onClick={decrese}>decrease</button>
      <button onClick={reset}>reset</button>
    </div>
  )
}

export default App
