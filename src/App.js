import React, {useState, useEffect} from 'react'
import './App.css';

function App() {
  const [userChoice, setUserChoice] = useState('rock')
  const [computerChoice, setComputerChoice] = useState('rock')
  const [userPoints,setUserPoints] = useState(0)
  const [computerPoints,setComputerPoints] = useState(0)
  const [turnResult, setTurnResult] = useState(null)
  const [result, setResult] = useState('')
  const [gameOver, setGameOver] = useState(false)

  const choices = ['rock', 'paper', 'scissors']

  const handleClick = (choice) => {
    setUserChoice(choice)
    generateComputerChoice()
  }

  const generateComputerChoice = () => {
      const randomChoice = choices[Math.floor(Math.random() * choices.length)]
      setComputerChoice(randomChoice)
  }

  const reset = () => {
    window.location.reload()
  }

  useEffect(() => {
    const comboMoves = userChoice + computerChoice
    if (userPoints <=4 && computerPoints <=4) {
      if (comboMoves === 'rockscissors' || comboMoves === 'paperrock' || comboMoves === 'scissorspaper') {
        const updatedUserPoints = userPoints + 1
        setUserPoints(updatedUserPoints)
        setTurnResult('User got the point.')
        if (updatedUserPoints === 5) {
          setGameOver(true)
          setResult('User wins!')
        }
      }

      if (comboMoves === 'paperscissors' || comboMoves === 'scissorsrock' || comboMoves === 'rockpaper') {
        const updatedComputerPoints = computerPoints + 1
        setComputerPoints(updatedComputerPoints)
        setTurnResult('Computer got the point.')
        if (updatedComputerPoints === 5) {
          setGameOver(true)
          setResult('Computer wins!')
        }
      }

      if (comboMoves === 'paperpaper' || comboMoves === 'rockrock' || comboMoves === 'scissorsscissors') {
        setTurnResult('No one gets a point.')
      }
    }
  },[userChoice, computerChoice])

  return (
    <div className="App">
      <h1 className='heading'>Rock, Paper, Scissors</h1>
        <div className="score">
          <h1>User: {userPoints}</h1>
          <h1>Computer: {computerPoints}</h1>
        </div>
        <div className="choices">
          <div className="user-choice">
            <img className="user-turn" src={`../images/${userChoice}.png`} alt="" />
          </div>
          <div className="computer-choice">
            <img className="computer-turn" src={`../images/${computerChoice}.png`} alt="" />
          </div>
        </div>
        <div className="button-div">
          {choices.map((choice, index) =>
            <button className="button" key={index} onClick={() => handleClick(choice)} disabled={gameOver}>
              {choice}
            </button>
          )}
        </div>

        <div className="result">
          <h1> Turn Result: {turnResult}</h1><br></br>
          <h1>Final Result: {result}</h1>
        </div>

        <div className="play-again">
          {gameOver &&
            <button className="play" onClick={() => reset ()}>Play Again?</button>
          }
        </div>
    </div>
  );
}

export default App;
