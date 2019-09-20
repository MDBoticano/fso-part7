import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { transformBlogsIntoUsers } from '../utils/Blog_helper.js'

const Users = (props) => {
  const mapUsersToTable = (users) => {
    return users.map(user => (
      <tr key={user.username}>
        <td>
          <Link to={`/users/${user.id}`}>{user.name}</Link>
        </td>
        <td>{user.blogs.length}</td>
      </tr>
    ))
  }

  return (
    <div className="users-list">
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <td></td>
            <td><strong># of blogs</strong></td>
          </tr>
          {mapUsersToTable(transformBlogsIntoUsers(props.blogList))}
        </tbody>
      </table>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogList: state.blogs,
  }
}

export default connect(mapStateToProps)(Users)