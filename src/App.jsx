import { useState } from "react";
import "./App.css";

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  function squareClick(index) {
    const newSquares = [...squares];
    newSquares[index] = 'X';
    setSquares(newSquares);
  }

  return (
    <div className="w-[25%] mx-auto">
      <div className="grid grid-cols-3 gap-[1px] border-2 text-center bg-black">
        {
          squares.map((square, index)=><div onClick={()=>squareClick(index)} className="bg-white cursor-pointer">{square || <span>&nbsp;</span>}</div>)
        }
      </div>
    </div>
  );
}

export default App;
