import blogService from '../services/blogs'

const INITIALIZE_BLOGS = 'INITIALIZE_BLOGS'
const NEW_BLOG = 'NEW_BLOG'
const DELETE_BLOG = 'DELETE_BLOG'
const LIKE_BLOG = 'LIKE_BLOG'
const ADD_COMMENT = 'ADD_COMMENT'

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()

    dispatch({
      type: INITIALIZE_BLOGS,
      data: blogs
    })
  }
}

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content)
    dispatch({
      type: NEW_BLOG,
      data: newBlog,
    })
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    const remainingBlogs = await blogService.deleteEntry(id)
    dispatch({
      type: DELETE_BLOG,
      data: remainingBlogs
    })
  }
}

export const likeBlog = (obj) => {
  const objId = obj.id
  const incrementedLikes = obj.likes + 1

  /* Increase # of likes for blog */
  const updatedObj = { ...obj, likes: incrementedLikes }

  return async(dispatch) => {
    const updatedBlog = await blogService.update(objId, updatedObj)
    dispatch({
      type: LIKE_BLOG,
      data: updatedBlog
    })
  }
}

export const addComment = (blog, comment) => {
  const blogId = blog.id
  const updatedObj = {
    ...blog, comments: [...blog.comments, comment]
  }
  return async(dispatch) => {
    const updatedBlog = await blogService.update(blogId, updatedObj)
    dispatch({
      type: ADD_COMMENT,
      data: updatedBlog
    })
  }
}

const blogReducer = (state = [], action) => {
  switch(action.type){
  case INITIALIZE_BLOGS:
    const stateBlogsString = JSON.stringify(state)
    const actionString = JSON.stringify(action.data)
    // if (state.bloglist !== action.data) {
    // console.log('current:', actionString)
    // console.log('previous:', stateBlogsString)

    if (stateBlogsString !== actionString) {
      // console.log('current and previous are different, change state!')
      return action.data
    }
    // console.log('they\'re the same, don\'t change state')
    return state
  case NEW_BLOG:
    return [...state, action.data]
  case DELETE_BLOG:
    return action.data
  case LIKE_BLOG:
    return state.map( blog => blog.id !== action.data.id ? blog : action.data )
  case ADD_COMMENT:
    return state.map( blog => blog.id !== action.data.id ? blog : action.data )
  default:
    return state
  }
}

export default blogReducer