import { useEffect, useState } from "react";
import "./App.css";

const btnCSS =
  "bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-1 border border-blue-500 hover:border-transparent rounded";

function App() {
  //[states]
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(false);
  const [winner, setWinner] = useState(null);
  const [previusStates, setPreviusStates] = useState([]);
  const [noOneWin, setNoOneWin] = useState(false);

  //reset game
  function resetGame() {
    setSquares(Array(9).fill(null));
    setWinner(null);
    setPreviusStates([]);
  }

  // detect no one win and all squares filled
  useEffect(()=>{
    if(!winner && !squares.includes(null)){
      setNoOneWin(true);
    }
  },[!winner && !squares.includes(null)])

  function squareClick(index) {
    // check if anyone win or no one win
    if (winner || noOneWin) {
      return;
    }
    //make a compy of original state and push it remember state
    const newSquares = [...squares];
    setPreviusStates([...previusStates, newSquares]);
    //switching players
    if (xIsNext) {
      newSquares[index] = "X";
    } else {
      newSquares[index] = "Y";
    }
    //set updated squres for render DOM
    setSquares(newSquares);
    setXIsNext(!xIsNext);
    //check is anyone win
    if(findWonPerson(newSquares)){
      setWinner(findWonPerson(newSquares));
    }
  }

  //get back previus game state
  function handlePreState(prState) {
    setSquares(prState);
  }

  return (
    <div className="w-[25%] mx-auto">
      <p>{winner && `${winner} is winner`}</p>
      {winner && (
        <button className={btnCSS} onClick={resetGame}>
          reset game
        </button>
      )}
      <div className="grid grid-cols-3 gap-[1px] border-2 text-center bg-black">
        {squares.map((square, index) => (
          <div
            onClick={() => squareClick(index)}
            className="bg-white cursor-pointer"
          >
            {square || <span>&nbsp;</span>}
          </div>
        ))}
      </div>
      
      <div>
        {previusStates.map((prState, i) => (
          <li>
            <button onClick={() => handlePreState(prState)} className={btnCSS}>
              previus state {i+1}
            </button>
          </li>
        ))}
      </div>
    </div>
  );
}

export default App;

const possibleIndexes = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 4, 6],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8],
];

//check anyone won or not
function findWonPerson(squares) {
  for (const iterator of possibleIndexes) {
    const [a, b, c] = iterator;
    if (squares[a] === squares[b] && squares[b] === squares[c]) {
      return squares[a];
    }
  }
}
