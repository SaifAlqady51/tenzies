import React from 'react'
import './App.css';
import Die from './components/Die';
import {nanoid} from 'nanoid';
import Confetti from "react-confetti"


function App() {
  // Make state for the dice
  const [dice, setDice] = React.useState(allNewDice())
  // Make state for the tenzies game to know whether you won the game or not
  const [tenzies,setTenzies] = React.useState(false)

  const [counter,setCounter] = React.useState(0)

  // Update the board every time it is changed
  React.useEffect(()=>{
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameDice = dice.every(die => die.value === firstValue)
    if(allHeld && allSameDice) {
      setTenzies(true)
    }
  },[dice])

  // Make new dice object
  function generateNewDice() {
    let result =  Math.floor(Math.random()*6) + 1
    return {
      value: result,
      img:`./Images/Dice_${result}.png`,
      isHeld:false,
      id:nanoid()}
  }


  // Generate new random dice
  function allNewDice() {
    let newDice = [];
    for(let i = 0;i<10;i++){
      newDice.push(generateNewDice())
      
    }
    return newDice
  }


  // Roll the dice when the button is clicked
  function rollDice(){
    if(!tenzies){
      setDice(dice.map(die => {
        return die.isHeld? die: generateNewDice()
      }))
      setCounter(prev => prev +1)
    }
    else{
      setCounter(0)
      setTenzies(false)
      setDice(allNewDice())

    }


  }
  // Know whether the die is hold or not
  function holdDice(id){
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? {...die,isHeld:!die.isHeld} : die
    }))
    
  }

  const diceElements = dice.map(die => <Die key={die.id} value={die.value} isHeld={die.isHeld} img ={die.img} holdDice={() => holdDice(die.id)} />)

  return (
    <main>
      {tenzies && <Confetti />}

      <div className='container'>
      <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className='die-container'>

          {diceElements}

        </div>
          <button className='roll-dice' onClick={rollDice}>{tenzies? 'New Game' : 'Roll'} ({counter})</button>
      </div>
    </main>
  )
}

export default App;
