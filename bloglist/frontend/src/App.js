import React, { useState, useEffect } from 'react'

import Toggleable from './components/Toggleable'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Bloglist from './components/Bloglist'
import BlogView from './components/BlogView'
import CreateBlog from './components/CreateBlog'
import UsersInfo from './components/UsersInfo'
import User from './components/User'

import loginService from './services/login'
import { useField } from './hooks/index'
import { getBlogsFromUser } from './utils/Blog_helper'

import { connect } from 'react-redux'
import { setUser, logout, setToken } from './reducers/loginReducer'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, createBlog, likeBlog } from './reducers/blogsReducer'

import {
  BrowserRouter as Router,
  Route, Link,
} from 'react-router-dom'

const App = (props) => {
  const ASCENDING = 'ascending'
  const DESCENDING = 'descending'

  /* State values */
  const formTitle = useField('text')
  const formAuthor = useField('text')
  const formUrl = useField('text')

  const loginUsername = useField('text')
  const loginPassword = useField('password')

  const [sortDirection, setSortDirection] = useState(DESCENDING)

  /* Initialize blogs through Redux */
  const initializeBlogsProp = props.initializeBlogs
  useEffect(() => {
    initializeBlogsProp()
  }, [initializeBlogsProp])

  // Check for logged in user
  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedBlogUser')
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser)
      props.setUser(user)
      props.setToken(user.token)
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
      props.setUser(user)
      props.setToken(user.token)

      props.setNotification({
        message: `welcome ${user.username}`,
        messageStyle: 'success',
      })

      loginUsername.reset()
      loginPassword.reset()
    } catch (exception) {
      props.setNotification({
        message: 'incorrect login',
        messageStyle: 'error',
      })
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogUser')
    props.logout()
  }

  const addBlog = async (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    const blogObject = {
      title: formTitle.value,
      author: formAuthor.value,
      url: formUrl.value,
      userId: props.userId
    }

    try {
      await props.createBlog(blogObject)

      if (formAuthor.value) {
        props.setNotification({
          message: `Added blog ${formTitle.value} by ${formAuthor.value}`,
          messageStyle: 'success',
        })
      } else {
        props.setNotification({
          message: `Added blog ${formTitle.value}`,
          messageStyle: 'success'
        })
      }
      formTitle.reset()
      formAuthor.reset()
      formUrl.reset()
    } catch (error) {
      props.setNotification({
        message: 'Failed to add blog',
        messageStyle: 'error'
      })
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

  const getUserById = (id) => {
    return getBlogsFromUser(props.bloglist, id)
  }

  const getBlogById = (id) => {
    return props.bloglist.find(blog => blog.id === id)
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

  const loggedInUser = () => {
    return (
      <div className="logged-in">
        <p className="logged-user">{props.name} is logged in</p>
        <button id="logout" onClick={handleLogout}>logout</button>
      </div>
    )
  }

  const blogFormRef = React.createRef()

  const blogsView = () => {
    return (
      <>
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
        <Bloglist />
      </>
    )
  }

  return (
    <div className="App">

      <Router>
        <div className="router-nav" style={{ backgroundColor: '#ccc' }}>
          <Link to="/" style={{ padding: 5 }}>Blogs</Link>
          <Link to="/users" style={{ padding: 5 }}>Users</Link>
          <div className="login">
            {props.username !== '' && loggedInUser()}
          </div>
        </div>
        {props.username === '' && loginForm()}
        <h1 id="page-title">Blogs</h1>
        <Notification />



        <Route exact path="/" render={() => {
          return props.username !== '' && blogsView()
        }} />
        <Route exact path="/users" render={() => {
          return (
            // props.username ? <UsersInfo /> : <Redirect to="/" />
            <UsersInfo />
          )
        }} />
        <Route exact path="/users/:id" render={({ match }) =>
          <User user={getUserById(match.params.id)} />}
        />
        <Route exact path="/blogs/:id" render={({ match }) =>
          <BlogView blog={getBlogById(match.params.id)} />}
        />
      </Router>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    username: state.login.username,
    name: state.login.name,
    userId: state.login.userId,
    bloglist: state.blogs,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => dispatch(setUser(user)),
    logout: () => dispatch(logout()),
    setNotification: (message, time) => {
      dispatch(setNotification(message, time))
    },
    setToken: (token) => { dispatch(setToken(token)) },
    initializeBlogs: () => dispatch(initializeBlogs()),
    createBlog: (blog) => dispatch(createBlog(blog)),
    likeBlog: (blog) => dispatch(likeBlog(blog))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)