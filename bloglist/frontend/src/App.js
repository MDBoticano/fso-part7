import React, { useState, useEffect } from 'react'

import Toggleable from './components/Toggleable'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Bloglist from './components/Bloglist'
import CreateBlog from './components/CreateBlog'

import loginService from './services/login'

import { useField, useResource } from './hooks/index'

const App = () => {
  const ASCENDING = 'ascending'
  const DESCENDING = 'descending'

  /* State values */
  const [blogs, blogService] = useResource('/api/blogs')

  const formTitle = useField('text')
  const formAuthor = useField('text')
  const formUrl = useField('text')

  const [notification, setNotification] = useState(null)
  const [notifType, setNotifType] = useState(null)

  const [user, setUser] = useState(null)

  const loginUsername = useField('text')
  const loginPassword = useField('password')

  const [sortDirection, setSortDirection] = useState(DESCENDING)

  const sortBlogs = (blogsArray, direction = DESCENDING) => {
    const blogsArrayCopy = [...blogsArray]
    if (direction === ASCENDING) {
      blogsArrayCopy.sort((a, b) => a.likes - b.likes)
    }
    else if (direction === DESCENDING) {
      blogsArrayCopy.sort((a, b) => b.likes - a.likes)
    }
    return blogsArrayCopy
  }

  /* useEffect hooks */
  // Get the blogs from the server
  useEffect(() => {
    async function fetchBlogs() {
      const initialBlogs = await blogService.getAll()

      // Load blogs sorted (descending by default)
      const sortedBlogs = sortBlogs(initialBlogs, sortDirection)
      blogService.setValue(sortedBlogs)
    }
    fetchBlogs()
    //eslint-disable-next-line
  }, [sortDirection])

  // Check for logged in user
  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedBlogUser')
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser)
      setUser(user)
      blogService.setToken(user.token)
    }
    //eslint-disable-next-line
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      let username = loginUsername.value
      let password = loginPassword.value
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)

      loginUsername.reset()
      loginPassword.reset()
    } catch (exception) {
      setNotification('Wrong credentials')
      setNotifType('error')
      setTimeout(() => {
        setNotification(null)
        setNotifType(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }

  const addBlog = async (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    const blogObject = {
      title: formTitle.value,
      author: formAuthor.value,
      url: formUrl.value,
      userId: user.userId
    }

    try {
      const newBlog = await blogService.create(blogObject)
      const updatedBlogsList = blogs.concat(newBlog)

      blogService.setValue(sortBlogs(updatedBlogsList, sortDirection))

      if (formAuthor.value) {
        setNotification(`Added blog ${formTitle.value} by ${formAuthor.value}`)
        setNotifType('success')
      } else {
        setNotification(`Added blog ${formTitle.value}`)
        setNotifType('success')
      }
      setTimeout(() => {
        setNotification(null)
        setNotifType(null)
      }, 5000)

      formTitle.reset()
      formAuthor.reset()
      formUrl.reset()
    } catch (error) {
      setNotification('Failed to add blog')
      setNotifType('error')
      setTimeout(() => {
        setNotification(null)
        setNotifType(null)
      }, 5000)
    }
  }

  const handleLike = async (blog) => {
    const blogId = blog.id

    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      id: blogId
    }

    try {
      const updatedBlog = await blogService.update(blogId, blogObject)
      const updatedBlogsList = blogs.map(entry => {
        if (entry.id !== blogId) {
          return entry
        } else {
          return updatedBlog
        }
      })
      blogService.setValue(updatedBlogsList)

      // to sort blogs after updating:
      // setBlogs(sortBlogs(updatedBlogsList, sortDirection))

    } catch (error) {
      setNotification('Failed to add blog')
      setNotifType('error')
      setTimeout(() => {
        setNotification(null)
        setNotification(null)
      }, 5000)
    }
  }

  const handleDelete = async (blog) => {
    const blogId = blog.id

    try {
      if (window.confirm(`Do you want to delete ${blog.title}`)) {
        const updatedBlogsList = await blogService.deleteEntry(blogId)
        blogService.setValue(updatedBlogsList)
      }
    } catch (error) {
      setNotification('Failed to delete blog')
      setNotifType('error')
      setTimeout(() => {
        setNotification(null)
        setNotifType(null)
      }, 5000)
    }
  }

  const listSortToggle = () => {
    if (sortDirection === ASCENDING) { setSortDirection(DESCENDING) }
    if (sortDirection === DESCENDING) { setSortDirection(ASCENDING) }
  }

  const removeReset = (fieldProp) => {
    //eslint-disable-next-line
    const { reset, ...restOfProps } = fieldProp
    return restOfProps
  }

  const loginForm = () => {
    return (
      <Toggleable buttonLabel="login">
        <LoginForm
          loginUsername={removeReset(loginUsername)}
          loginPassword={removeReset(loginPassword)}
          handleLogin={handleLogin}
        />
      </Toggleable>
    )
  }

  const blogFormRef = React.createRef()

  const blogsView = () => {
    return (
      <>
        <p className="logged-user">{user.name} is logged in</p>
        <button id="logout" onClick={handleLogout}>logout</button>
        <div id="blog-create-toggleable">
          <Toggleable buttonLabel="new blog" ref={blogFormRef}>
            <CreateBlog
              addBlog={addBlog}
              title={removeReset(formTitle)}
              author={removeReset(formAuthor)}
              url={removeReset(formUrl)}
            />
          </Toggleable>
        </div>
        <button id="toggle-bloglist-sort" onClick={listSortToggle}>
          Sort by # of likes: {sortDirection}
        </button>
        <Bloglist
          blogs={blogs} currentUserId={user.userId}
          handleLike={handleLike}
          handleDelete={handleDelete}
        />
      </>
    )
  }

  return (
    <div className="App">
      <h1 id="page-title">Blogs</h1>
      <Notification message={notification} messageType={notifType} />
      {user === null && loginForm()}
      {user !== null && blogsView()}
    </div>
  )
}

export default App