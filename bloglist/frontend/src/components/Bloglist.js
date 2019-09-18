import React from 'react'
import Blog from './Blog'
import { connect } from 'react-redux'
import { likeBlog } from '../reducers/blogsReducer'

const Bloglist = ( props ) => {

  const blogsList = () => props.blogs.map((blog) =>
    <Blog
      key={blog.id}
      blog={blog}
      handleLike={() => props.likeBlog(blog)}
      handleDelete={() => props.handleDelete(blog)}
      currentUserId={props.currentUserId}
    />
  )

  return (
    <div id="bloglist">
      {blogsList()}
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    likeBlog: obj => dispatch(likeBlog(obj)),
  }
}

export default connect(null, mapDispatchToProps)(Bloglist)