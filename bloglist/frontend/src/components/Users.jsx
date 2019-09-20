import React from 'react'
import { connect } from 'react-redux'

const Users = (props) => {
  /* transform bloglist into user-oriented data */
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
        const newUser = createUserFrom(blog)

        userData = [...userData, newUser]
        uniqueUsers.push(newUser.id)
        // console.log('user data:', userData)
        // console.log('unique users id:', uniqueUsers)
      } 
      
      /* if userId exists & user is in userData, add blog to that user */
      else if (!theUserIsUnique) {
        // find the user and add the blog to its bloglist
        for (let i = 0; i < uniqueUsers.length; i++) {
          if (uniqueUsers[i] === userId) {
            userData[i].blogs = [...userData[i].blogs, blog]
            break
          }
        }
      }
    })
    return userData
  }

  /* Helper functions */
  const getUserId = (blog) => { 
    if (blog.user && blog.user.id) { return blog.user.id } else { return null }
  }

  const isUserUnique = (userId, addedUsers) => {
    if (userId === '') { return undefined }

    return !addedUsers.includes(userId)
  }

  const createUserFrom = (blog) => {
    return {
      username: blog.user.username,
      name: blog.user.name,
      id: blog.user.id,
      blogs: [blog],
    }
  }  

  const mapUsersToTable = (users) => {
    return users.map(user => (
      <tr key={user.username}>
        <td>{user.name}</td>
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