import React from 'react'
// import { Link } from 'react-router-dom'

const User = (props) => {

  const createBloglist = (blogs) => {
    return (
      <ul>
        {createListItems(blogs)}
      </ul>
    )
  }

  const createListItems = (blogs) => {
    return blogs.map( blog => {
      return (
        <li key={blog.id} style={{ padding: 5 }}>
          {/* <Link to={`/blogs/${blog.id}`}>{blog.title}</Link> */}
          {blog.title}
        </li>
      )
    })
  }

  /* Conditionally render since data may not be fetched */
  if (!props.user || !props.user.blogs) {
    return null
  }

  return (
    <div className="user">
      <h2>{props.user.name}</h2>
      <h3>blogs created</h3>
      {createBloglist(props.user.blogs)}
    </div>
  )
}

export default User