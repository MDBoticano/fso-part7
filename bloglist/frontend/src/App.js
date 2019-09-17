import React, { useState, useEffect } from 'react'

import Toggleable from './components/Toggleable'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Bloglist from './components/Bloglist'
import CreateBlog from './components/CreateBlog'

// import blogService from './services/blogs'
import loginService from './services/login'

import { useField, useResource } from './hooks/index'

const App = () => {
  const ASCENDING = 'ascending'
  const DESCENDING = 'descending'


  /* State values */
  // const [blogs, setBlogs] = useState([])
  const [blogs, blogService] = useResource('/api/blogs')

  // const [newTitle, setNewTitle] = useState('')
  // const [newAuthor, setNewAuthor] = useState('')
  // const [newUrl, setNewUrl] = useState('')

  const formTitle = useField('text')
  const formAuthor = useField('text')
  const formUrl = useField('text')

  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  // const [username, setUsername] = useState('')
  // const [password, setPassword] = useState('')
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
      // const initialBlogs = await blogService.getAll()
      const initialBlogs = await blogService.getAll()

      // setBlogs(initialBlogs)

      // Load blogs sorted (descending by default)
      const sortedBlogs = sortBlogs(initialBlogs, sortDirection)
      // setBlogs(sortedBlogs)
      blogService.setValue(sortedBlogs)
    }

    fetchBlogs()
  }, [sortDirection])

  // Check for logged in user
  useEffect(() => {
    // console.log('logging in user')
    const loggedInUser = window.localStorage.getItem('loggedBlogUser')
    if (loggedInUser) {
      // console.log('user exists, logging in')
      const user = JSON.parse(loggedInUser)
      setUser(user)
      blogService.setToken(user.token)
    } else {
      // console.log('no user, login please')
    }
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
      // setUsername('')
      // setPassword('')

      loginUsername.reset()
      loginPassword.reset()
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
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
      // title: newTitle,
      // author: newAuthor,
      // url: newUrl,
      
      title: formTitle.value,
      author: formAuthor.value,
      url: formUrl.value,

      userId: user.userId
    }

    try {
      const newBlog = await blogService.create(blogObject)
      const updatedBlogsList = blogs.concat(newBlog)
      // setBlogs(updatedBlogsList)

      // to sort after adding:
      // setBlogs(sortBlogs(updatedBlogsList, sortDirection))
      blogService.setValue(sortBlogs(updatedBlogsList, sortDirection))

      // if (newAuthor) {
      if (formAuthor.value) {
        // setSuccessMessage(`Added blog ${newTitle} by ${newAuthor}`)
        setSuccessMessage(`Added blog ${formTitle.value} by ${formAuthor.value}`)
      } else {
        // setSuccessMessage(`Added blog ${newTitle}`)
        setSuccessMessage(`Added blog ${formTitle.value}`)
      }
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)

      // setNewTitle('')
      // setNewAuthor('')
      // setNewUrl('')

      formTitle.reset()
      formAuthor.reset()
      formUrl.reset()
    } catch (error) {
      setErrorMessage('Failed to add blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  /* 5.7: send PUT request to update blog */
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
      // setBlogs(updatedBlogsList)
      blogService.setValue(updatedBlogsList)

      // to sort blogs after updating:
      // setBlogs(sortBlogs(updatedBlogsList, sortDirection))

    } catch (error) {
      setErrorMessage('Failed to like blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleDelete = async (blog) => {
    const blogId = blog.id

    try {
      if (window.confirm(`Do you want to delete ${blog.title}`)) {
        const updatedBlogsList = await blogService.deleteEntry(blogId)
        // setBlogs(updatedBlogsList)
        blogService.setValue(updatedBlogsList)
      }
    } catch (error) {
      setErrorMessage('Failed to delete blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  // const handleUsername = ({ target }) => {
  //   setUsername(target.value)
  // }

  // const handlePassword = ({ target }) => {
  //   setPassword(target.value)
  // }

  // const handleTitle = ({ target }) => {
  //   setNewTitle(target.value)
  // }

  // const handleAuthor = ({ target }) => {
  //   setNewAuthor(target.value)
  // }

  // const handleUrl = ({ target }) => {
  //   setNewUrl(target.value)
  // }

  const listSortToggle = () => {
    if (sortDirection === ASCENDING) { setSortDirection(DESCENDING) }
    if (sortDirection === DESCENDING) { setSortDirection(ASCENDING) }
  }

  const removeReset = (fieldProp) => {
    const { reset, ...restOfProps } = fieldProp
    return restOfProps
  }

  const loginForm = () => {
    return (
    <Toggleable buttonLabel="login">
      <LoginForm
        // username={loginUsername.value} handleUsername={loginUsername.onChange}
        loginUsername={removeReset(loginUsername)}
        // password={loginPassword.value} handlePassword={loginPassword.onChange}
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
              // handleTitle={handleTitle} title={newTitle}
              // handleTitle={formTitle.onChange} title={formTitle.value}
              title={removeReset(formTitle)}
              // handleAuthor={handleAuthor} author={newAuthor}
              // handleAuthor={formAuthor.onChange} author={formAuthor.value}
              author={removeReset(formAuthor)}
              // handleUrl={handleUrl} url={newUrl}
              // handleUrl={formUrl.onChange} url={formUrl.value}
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
      <Notification message={errorMessage} messageType='error' />
      <Notification message={successMessage} messageType='success' />
      {user === null && loginForm()}
      {user !== null && blogsView()}
    </div>
  )
}

export default App
