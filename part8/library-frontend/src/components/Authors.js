import React from 'react'

import { ALL_AUTHORS, EDIT_AUTHOR, ALL_BOOKS } from '../queries/queries'
import { useQuery, useMutation } from '@apollo/client'

const Authors = (props) => {
  let authors = []

  const result = useQuery(ALL_AUTHORS)
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }]
  })

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  if (result.data) {
    authors = result.data.allAuthors
  }

  const handleUpdate = (e) => {
    e.preventDefault()
    editAuthor({
      variables: {
        name: e.target.name.value,
        setBornTo: parseInt(e.target.born.value)
      }
    })
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h2>set birth year</h2>
      <div>
        <form onSubmit={handleUpdate}>
          <select 
            name="name"
          >
            {authors.map(a =>
              <option key={a.name} value={a.name}>{a.name}</option>
            )}
          </select>
          born: <input name="born"></input>
          <br />
          <button type="submit">update author</button>
        </form>
      </div>

    </div>
  )
}

export default Authors
