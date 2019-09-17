import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, handleDelete, currentUserId }) => {

  const [detailsVisible, setDetailsVisible] = useState(false)

  const toggleDetails = () => {
    setDetailsVisible(!detailsVisible)
  }

  const blogDetails = () => {
    return (
      <div className="blogDetails">
        <p className="blog-url">{blog.url}</p>
        <div className="blog-likes">
          <p className="num-likes">{blog.likes} likes</p>
          <button className="like-btn" onClick={handleLike}>Like</button>
        </div>
        <div className="blog-creator">
          {blogListHasUser()}
          {showDeleteButton()}
        </div>
      </div>
    )
  }

  const blogListHasUser = () => {
    if (blog.user && blog.user.name) {
      return (
        <p className="blog-user">added by {blog.user.name}</p>
      )
    }
  }

  const blogHasAuthor = () => {
    if (blog.author) {
      return `by ${blog.author}`
    }
  }

  const showDeleteButton = () => {
    if (blog.user && currentUserId === blog.user.id) {
      return (
        <div className="blog-delete">
          <button className="delete-btn" onClick={handleDelete}>Delete</button>
        </div>
      )
    }
  }

  return (
    <div className="blog-entry">
      <div className="blog-summary" onClick={toggleDetails}>
        <p> {blog.title} {blogHasAuthor()}</p>
      </div>
      {detailsVisible && blogDetails()}
    </div>
  )
}

Blog.propTypes = {
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  currentUserId: PropTypes.string.isRequired
}

export default Blog