import { useState } from "react";
import "./App.css";

const btnCSS = 'bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-1 border border-blue-500 hover:border-transparent rounded'

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(false);
  const [winner, setWinner] = useState(null);

  function resetGame() {
    setSquares(Array(9).fill(null));
    setWinner(null);
  }

  function squareClick(index) {
    if(winner){
      return;
    }
    const newSquares = [...squares];
    if(xIsNext){
      newSquares[index] = 'X';
    }else {
      newSquares[index] = 'Y';
    }
    setSquares(newSquares);
    setXIsNext(!xIsNext);
    setWinner(findWonPerson(newSquares));
  }

  return (
    <div className="w-[25%] mx-auto">
      <p>{winner && `${winner} is winner`}</p>
      {winner && <button className={btnCSS} onClick={resetGame}>reset game</button>}
      <div className="grid grid-cols-3 gap-[1px] border-2 text-center bg-black">
        {
          squares.map((square, index)=><div onClick={()=>squareClick(index)} className="bg-white cursor-pointer">{square || <span>&nbsp;</span>}</div>)
        }
      </div>
    </div>
  );
}

export default App;

const possibleIndexes = [
  [0,1,2],
  [0,3,6],
  [0,4,8],
  [1,4,7],
  [2,4,6],
  [2,5,8],
  [3,4,5],
  [6,7,8],
];

function findWonPerson(squares) {
  for (const iterator of possibleIndexes) {
    const [a, b, c] = iterator;
    if(squares[a] === squares[b] && squares[b] === squares[c]){
      return squares[a];
    }
  }
}