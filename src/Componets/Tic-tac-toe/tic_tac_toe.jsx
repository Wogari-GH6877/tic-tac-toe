import React, {useState } from 'react'
import "./tic_tac_toe.css"
import cross_icon from "../assests/cross_icon.png"
import circle_icon from "../assests/circle_icon.png"


function Tic_tac_toe() {
  
  const [gameMode,setGameMode]=useState(null)
  const [board,setboard]=useState(Array(9).fill(""));
  const [theTurn,setTheTurn]=useState(true);
  const [winner,setwinner]=useState(null)
  

  const computerChoice="o";
  const playerChoice="x";

  const winningPattern=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
    
  ]
const pickwinner=(board)=>{

  for(let [x,y,z] of winningPattern){
    if(board[x]===board[y] && board[y]===board[z] && board[z]!==""){
      setwinner(board[x])
      return
    }
  }

}
  const handleclick=(index)=>{

  if (board[index] !== "" || winner) return;

   const newboard=[...board];

   if (gameMode==="friend"){
    newboard[index]= theTurn ? "x" : "o";
   setboard(newboard);
   setTheTurn(!theTurn);
   pickwinner(newboard);

   }else if(gameMode==="computer"){
    const newboard=[...board]
    newboard[index] = playerChoice;
    setboard(newboard);
    pickwinner(newboard);

    setTimeout(()=>computerPlay(newboard),500)

   }
  }

  //  if(gameMode==="computer" && theTurn){
    
  //  }else{
  //   setTheTurn(!theTurn);
  //  }
  // }

  // how the computer is play
  const computerPlay= (currentBoard)=>{

    if(winner){
      return
    }

    const emptyPosition=currentBoard.map((val,indx)=>(val===""?indx:null)).filter((val)=> val!==null);

    if (emptyPosition.length===0) return

    const newBoard=[...currentBoard];
    const randomIdx=emptyPosition[Math.floor(Math.random()*emptyPosition.length)];
    newBoard[randomIdx]=computerChoice;

    setboard(newBoard);
    pickwinner(newBoard)
    
  }

  const Reset = ()=>{
    setboard(Array(9).fill(""));
    setTheTurn(true);
    setwinner(null);
  }

const resetMode = () => {
    Reset();
    setGameMode(null);
  };
  return (

    <div className='mainContainer'>

      <h1 className='header'>TIC-TAC-TOE GAME USING <span>REACT</span></h1>
      <div className="mode-select">
          <h2 className='mode_text'>Choose Game Mode</h2>
          
          <button className="mode" onClick={() => setGameMode("friend")}>
            Play with Friend 👥
          </button>
          <button className="mode"onClick={() => setGameMode("computer")}>
            Play Alone 🤖
          </button>
          
        </div>

      <h2 className='winnershow'>{winner?(<>congratulations:
      <img src={winner==="x"? cross_icon:circle_icon} alt="icons"/></>):gameMode==="computer"?"Play With Computer":(
        `NextPlayer: ${theTurn? "X":"O"}`
      )}</h2>
    <div className='Container'>
      {board.map((value,index)=>(
        <div className='cell'
          key={index}
          onClick={()=>{handleclick(index)}}

        >
          {value&&(<img className="image"
          src={value==="x"?cross_icon:circle_icon} alt='icons'/>)}
        </div>

      ))}

    </div>

    <button className='Button' onClick={Reset}>Reset</button>
    <button className='Button' onClick={resetMode}>ResetMode</button>

    </div>
  )
}
export default Tic_tac_toe
