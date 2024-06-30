import React from 'react'
import Die from './components/Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

export default function App() {

  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {

  }, [count])

  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allValue = dice.every(die => die.value === firstValue)

    if (allHeld && allValue) {
      setTenzies(true)
    }
  }, [dice])

  function generateNewDie() {
    return {
      id: nanoid(),
      value: Math.ceil(Math.random() * 6),
      isHeld: false
    }
  }

  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice
  }

  function countRoll() {
    setCount(prevCount => prevCount + 1)
  }

  function rollDice() {
    if (!tenzies) {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? die : generateNewDie()
      }))
      countRoll()
    } else {
      setTenzies(false)
      setDice(allNewDice())
      setCount(0)
    }

  }

  function holdDice(id) {
    setDice(oldDice => {
      return oldDice.map((newDice) => {
        return newDice.id === id ? { ...newDice, isHeld: !newDice.isHeld } : newDice
      })
    })
  }

  const diceElement = dice.map(die => (
    <Die isHeld={die.isHeld} handleClick={() => holdDice(die.id)} key={die.id} value={die.value} />
  ))

  return (
    <main>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls. <strong>Good luck!</strong></p>
      <p className="count">Roll Count: <strong>{count}</strong></p>
      <div className="dice-container">
        {diceElement}
      </div>
      <button className="roll-button" onClick={rollDice}>{tenzies ? 'New Game' : 'Roll'}</button>
      {tenzies && <Confetti />}
    </main>
  )
}