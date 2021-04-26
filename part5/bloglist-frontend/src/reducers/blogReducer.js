import blogService from "../services/blogs"

const reducer = (state = [], action) => {
  switch (action.type) {
    case "NEW_BLOG":
      return state.concat(action.data)
    case "UPDATE_BLOG":
      let blog = state.find(b => b.id === action.data.id)
      blog = {
        ...action.data,
        user: blog.user
      }
      return state.map(b => blog.id === b.id ? blog : b)
    case "DELETE_BLOG":
      return state.filter(blog => blog.id !== action.data.id)
    case "INIT":
      return action.data
    default:
      return state
  }
}

export const init = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: "INIT",
      data: blogs
    })
  }
}

export const addBlog = (blogObject, username) => {
  return async dispatch => {
    const blog = await blogService.create(blogObject)
    blog.user = {
      username: username
    }
    dispatch({
      type: "NEW_BLOG",
      data: blog
    })
  }
}

export const updateBlog = (blogObject, id) => {
  return async dispatch => {
    const blog = await blogService.update(blogObject, id)
    dispatch({
      type: "UPDATE_BLOG",
      data: blog
    })
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: "DELETE_BLOG",
      data: { id }
    })
  }
}

export const addComment = (comment, id) => {
  return async dispatch => {
    const blog = await blogService.addComment(comment, id)
    dispatch({
      type: "UPDATE_BLOG",
      data: blog
    })
  }
}

export default reducer