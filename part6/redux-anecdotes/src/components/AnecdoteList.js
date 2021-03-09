import React, { useEffect } from 'react'
//import { useSelector, useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { vote, init } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

import anecdoteService from '../services/anecdotes'

const AnecdoteList = (props) => {

  // const anecdotes = useSelector(state => state)
  // const dispatch = useDispatch()

  const byVotes = (a, b) => b.votes - a.votes

  // const sortedAnecdotes = useSelector(state => state.anecdotes.sort(byVotes))

  useEffect(() => {
    // dispatch(init())
    props.init()
  }, [])

  const handleVotes = (id, content, votes) => {
    // dispatch(vote(id, ++votes, content))
    // dispatch(setNotification(`you voted for ${content}`, 10))
    props.vote(id, ++votes, content)
    props.setNotification(`you voted for ${content}`, 10)
  }

  return (
    <div>
      {props.anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVotes(anecdote.id, anecdote.content, anecdote.votes)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  const byVotes = (a, b) => b.votes - a.votes
  return {
    anecdotes: state.anecdotes.sort(byVotes)
  }
}

const mapDispatchToProps = {
  init,
  vote,
  setNotification
}

// export default AnecdoteList
const ConnectedList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default ConnectedList