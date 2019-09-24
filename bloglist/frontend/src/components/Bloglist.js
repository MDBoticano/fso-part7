import React from 'react'
import Blog from './Blog'
import { connect } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Table } from 'semantic-ui-react'

const sortBlogs = (blogsArray, direction = 'descending') => {
  const blogsArrayCopy = [...blogsArray]
  if (direction === 'ascending') {
    blogsArrayCopy.sort((a, b) => a.likes - b.likes)
  }
  else if (direction === 'descending') {
    blogsArrayCopy.sort((a, b) => b.likes - a.likes)
  }
  return blogsArrayCopy
}

const Bloglist = (props) => {
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

  const blogsList = () => props.sortedBlogs.map((blog) =>
    <Blog
      key={blog.id}
      blog={blog}
      handleLike={() => props.likeBlog(blog)}
      handleDelete={() => deleteHandler(blog, blog.id)}
      currentUserId={props.currentUserId}
    />
  )

  return (
    <div id="bloglist">
      <Table striped cell>
        <Table.Body>
          {blogsList()}
        </Table.Body>
      </Table>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    sortedBlogs: sortBlogs(state.blogs),
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Bloglist)