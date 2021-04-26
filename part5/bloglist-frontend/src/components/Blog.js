import React from 'react'

import { useDispatch, useSelector } from "react-redux"

import { useHistory } from "react-router-dom"

import { updateBlog, deleteBlog, addComment } from "../reducers/blogReducer"

const Blog = ({ blog }) => {

  const user = useSelector(state => state.user)

  const dispatch = useDispatch()
  const history = useHistory()

  const handleLikes = () => {
    dispatch(
      updateBlog({
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: ++blog.likes
      }, blog.id)
    )
  }

  const handleDelete = () => {
    dispatch(deleteBlog(blog.id))
    history.push("/")
  }

  const handleComments = (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    dispatch(addComment(comment, blog.id))
  }

  if (!blog) {
    return null
  }

  return (
    <div>
      <h1>{blog.title} - {blog.author}</h1>
      <span>
        {blog.url}
      </span><br />
      <span>
        likes: <span className="likeCount">{blog.likes}</span>
      </span>
      <button onClick={handleLikes} id="likeButton">
        like
      </button>
      <br />
      {blog.user && user && user.username === blog.user.username &&
        <button onClick={handleDelete}>
          delete
        </button>
      }
      <div>added by {blog.user.username}</div>
      <div>
        <h2>comments</h2>
        <form onSubmit={handleComments}>
          <input type="text" name="comment" />
          <button type="submit">comment</button>
        </form>
        <ul>
          {blog.comments.map(c =>
            <li key={c.comment}>{c.comment}</li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Blog
