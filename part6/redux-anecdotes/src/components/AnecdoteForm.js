import React from 'react'
// import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = (props) => {

  // const dispatch = useDispatch()

  const handleAnecdote = async (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    // dispatch(addAnecdote(anecdote))
    props.addAnecdote(anecdote)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleAnecdote}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  addAnecdote
}

// export default AnecdoteForm
const ConnectedForm = connect(null, mapDispatchToProps)(AnecdoteForm)
export default ConnectedForm