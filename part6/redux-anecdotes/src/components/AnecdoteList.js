import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const byVotes = (a, b) => b.votes - a.votes

  const sortedAnecdotes = useSelector(state => state.anecdotes.sort(byVotes))

  const handleVotes = (id, content) => {
    dispatch(vote(id))
    dispatch(setNotification(`you voted for ${content}`))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }

  return (
    <div>
      {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVotes(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList