import blogService from '../services/blogs'

const INITIALIZE_BLOGS = 'INITIALIZE_BLOGS'
const NEW_BLOG = 'NEW_BLOG'
const LIKE_BLOG = 'LIKE_BLOG'

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

const blogReducer = (state = [], action) => {
  switch(action.type){
  case INITIALIZE_BLOGS:
    return action.data
  case NEW_BLOG:
    return [...state, action.data]
  case LIKE_BLOG:
    return state.map( blog => blog.id !== action.data.id ? blog : action.data )
  default:
    return state
  }
}

export default blogReducer