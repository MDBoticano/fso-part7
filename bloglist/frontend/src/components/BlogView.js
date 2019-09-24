import React, { useState } from 'react'
import { connect } from 'react-redux'
import { deleteBlog, likeBlog, addComment } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Form } from 'semantic-ui-react'

const BlogView = (props) => {
  const [formComment, setFormComment] = useState('')

  const deleteHandler = (blog, blogId) => {
    try {
      if (window.confirm(`Do you want to delete ${blog.title}`)) {
        props.deleteBlog(blogId)
        props.setNotification({
          message: `Successfully deleted '${blog.title}'`,
          messageStyle: 'success'
        })
      }
    } catch (error) {
      props.setNotification({
        message: 'Failed to delete blog',
        messageStyle: 'error'
      })
    }
  }

  const blogDetails = () => {
    return (
      <div className="blogDetails">
        <p className="blog-url">
          <a href={`${props.blog.url}`}>{props.blog.url}</a>
        </p>
        <div className="blog-likes">
          <p className="num-likes">{props.blog.likes} likes</p>
          <button
            className="like-btn"
            onClick={() => props.likeBlog(props.blog)}
          >
            Like
          </button>
        </div>
        <div className="blog-creator">
          {blogListHasUser()}
          {showDeleteButton()}
        </div>
      </div>
    )
  }

  const blogListHasUser = () => {
    if (props.blog.user && props.blog.user.name) {
      return (
        <p className="blog-user">added by {props.blog.user.name}</p>
      )
    }
  }

  const blogHasAuthor = () => {
    if (props.blog.author) {
      return `by ${props.blog.author}`
    }
  }

  const showDeleteButton = () => {
    if (props.blog.user && props.currentUserId === props.blog.user.id) {
      return (
        <div className="blog-delete">
          <button className="delete-btn" onClick={
            () => deleteHandler(props.blog, props.blog.id)} >
            Delete
          </button>
        </div>
      )
    }
  }

  const blogComments = (blog) => {
    return (
      <div className="blog-comments">
        <h2>Comments</h2>
        {commentAdder()}
        {listComments(blog)}
      </div>
    )
  }

  const commentAdder = () => {
    return (
      <Form onSubmit={submitComment}>
        <input type="text" value={formComment} onChange={handleForm} />
        <button type="submit">Add Comment</button>
      </Form>
    )
  }

  const handleForm = (event) => {
    setFormComment(event.target.value)
  }

  const submitComment = async (event) => {
    event.preventDefault()

    try {
      await props.addComment(props.blog, formComment)
      props.setNotification({
        message: 'successfully added comment',
        messageStyle: 'success',
      })
      setFormComment('')
    } catch (error) {
      props.setNotification({
        message: 'Failed to add comment',
        messageStyle: 'error'
      })
    }
  }

  const listComments = (blog) => {
    if (!blog.comments) { return }

    return (
      <ul>
        {blog.comments.map((comment, i) => {
          return <li key={i}>{comment}</li>
        })}
      </ul>
    )
  }

  if (!props.blog) { return null }

  return (
    <div>
      <div className="blog-summary">
        <h1>{props.blog.title} </h1>
        <p>{blogHasAuthor()}</p>
      </div>
      {blogDetails()}
      {blogComments(props.blog)}
    </div>
  )

}

const mapStateToProps = (state) => {
  return {
    currentUserId: state.login.userId,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    likeBlog: obj => dispatch(likeBlog(obj)),
    deleteBlog: id => dispatch(deleteBlog(id)),
    setNotification: (message, time) => {
      dispatch(setNotification(message, time))
    },
    addComment: (blog, comment) => dispatch(addComment(blog, comment)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogView)