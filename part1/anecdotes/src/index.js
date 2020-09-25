import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const Anecdote = (props) => {
  return (
    <div>
      <span>
        {props.text}
      </span>
      <br />
      <span>
        has {props.votes} votes
      </span>
      <br />
    </div>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(props.anecdotes.length).fill(0))
  // not sure if you should use a state for the max voted anecdote
  //const [max, setMax] = useState(0)

  const handleChange = () => {
    setSelected(getRandomInt(props.anecdotes.length));
  }

  const handleVote = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  }

  const getMaxVotes = () => {
    return votes.indexOf(Math.max(...votes));
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote text={props.anecdotes[selected]} votes={votes[selected]} />
      <Button text="vote" handleClick={handleVote} />
      <Button text="next anecdote" handleClick={handleChange} />

      <h1>Anecdote with most votes</h1>
      <Anecdote text={props.anecdotes[getMaxVotes()]} votes={votes[getMaxVotes()]} />
    </div>
  )
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)