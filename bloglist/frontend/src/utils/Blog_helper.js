/* transform bloglist into user-oriented data */
export const transformBlogsIntoUsers = (blogData) => {
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

export const getBlogsFromUser = (blogData, userId) => {
  let userData = {}

  blogData.forEach((blog) => {
    const blogUserId = getUserId(blog)

    if (!blogUserId || (blogUserId !== userId)) { return }

    else if (userData.id !== userId) {
      const newUser = createUserFrom(blog)
      userData = newUser
    }

    else {
      userData.blogs = [...userData.blogs, blog]
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