import React from 'react'
import { connect } from 'react-redux'

const Users = (props) => {
  /* transform bloglist into user-oriented data */
  /**
   * userData = [
   *  {
   *    name: name1,
   *    username: username1,
   *    id: user1id, 
   *    blogs: [ { title: title, author: author, etc }, { title: title ...} ] * 
   *  }, {
   *    name: name2, username: username2, id: user2id, blogs: []
   *  }]
   */

  const transformIntoUserData = (blogData) => {
    /* loop through all blogs */
    let uniqueUsers = []
    let userData = []
    
    blogData.forEach((blog) => {
      /* get the userId if it exists */
      const userId = getUserId(blog)      
      if (!userId) { return }

      /* check if the user already exists in uniqueUser */
      const theUserIsUnique = isUserUnique(userId, uniqueUsers)
      /* If userId exists but the user is not in userData, add the user */
      if (theUserIsUnique) {
        /* create the new user object, and include the blog in it */
        const newUniqueUser = {
          username: blog.user.username,
          name: blog.user.name,
          id: blog.user.id,
          blogs: [blog],
        }

        userData = [...userData, newUniqueUser]
        uniqueUsers.push(blog.user.id)
        console.log('user data:', userData)
        // console.log('unique users id:', uniqueUsers)
      } 
      
      /* if userId exists & user is in userData, add blog to that user */
      else if (!theUserIsUnique) {
        // find the user 
        userData.forEach( (user) => {
          if (user.id === userId) {
            user.blogs = [...user.blogs, blog]
          }
        })
      }
    })


    /* temporary */
    return ([
      { username: 'barney1', blogs: [1, 2, 3] },
      { username: 'barney2', blogs: [1, 2, 3] }
    ])
  }

  const isUserUnique = (userId, addedUsers) => {
    if (userId === '') { return undefined }

    return !addedUsers.includes(userId)
  }

  const getUserId = (blog) => { 
    if (blog.user && blog.user.id) { return blog.user.id } else { return null }
  }

  const mapUsersToTable = (users) => {
    return users.map(user => (
      <tr key={user.username}>
        <td>{user.username}</td>
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
            <td># of blogs</td>
          </tr>
          {mapUsersToTable(transformIntoUserData(props.blogList))}
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