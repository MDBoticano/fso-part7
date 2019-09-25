import React, { useEffect } from 'react'

import Toggleable from './components/Toggleable'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Bloglist from './components/Bloglist'
import BlogView from './components/BlogView'
import CreateBlog from './components/CreateBlog'
import UsersInfo from './components/UsersInfo'
import User from './components/User'

import loginService from './services/login'
import { useField, /* usePrevious */ } from './hooks/index'
import { getBlogsFromUser } from './utils/Blog_helper'

import { connect } from 'react-redux'
import { setUser, logout, setToken } from './reducers/loginReducer'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, createBlog, likeBlog } from './reducers/blogsReducer'

import {
  BrowserRouter as Router,
  Route, Link,
} from 'react-router-dom'

import { Container, Menu, Button } from 'semantic-ui-react'

const App = (props) => {
  const formTitle = useField('text')
  const formAuthor = useField('text')
  const formUrl = useField('text')

  const loginUsername = useField('text')
  const loginPassword = useField('password')

  /* Initialize blogs through Redux */
  const initializeBlogsProp = props.initializeBlogs
  // const currentBlogs = props.bloglist
  // const previousBlogs = usePrevious(currentBlogs)
  useEffect(() => {
    // console.log('init')
    // const currString = JSON.stringify(currentBlogs)
    // const prevString = JSON.stringify(previousBlogs)

    // if (currentBlogs !== previousBlogs) {
    // if(currString !== prevString) {
    initializeBlogsProp()
    // }
  // }, [initializeBlogsProp, currentBlogs, previousBlogs])
  }, [initializeBlogsProp, props.bloglist])

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
      <Toggleable id="login-toggle" buttonLabel="sign in">
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
        <Button id="logout" onClick={handleLogout}>logout</Button>
      </div>
    )
  }

  const blogFormRef = React.createRef()

  const blogsView = () => {
    return (
      <>
        <div id="blog-create-toggleable">
          <Toggleable
            buttonLabel="new blog"
            ref={blogFormRef}
            id="create-blog-toggle"
          >
            <CreateBlog
              addBlog={addBlog}
              title={removeReset(formTitle)}
              author={removeReset(formAuthor)}
              url={removeReset(formUrl)}
            />
          </Toggleable>
        </div>
        <Bloglist />
      </>
    )
  }

  return (
    <Container>
      <div className="App">
        <Router>
          <Menu>
            <Menu.Item link>
              <Link to="/" style={{ padding: 5 }}>Blogs</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/users" style={{ padding: 5 }}>Users</Link>
            </Menu.Item>
            <Menu.Item position="right" className="login">
              {props.username !== '' && loggedInUser()}
              {props.username === '' && loginForm()}
            </Menu.Item>
          </Menu>

          <h1 id="page-title">Blogs</h1>

          <Notification />

          <Route exact path="/" render={() => {
            return props.username !== '' && blogsView()
          }} />
          <Route exact path="/users" render={() => {
            return (
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
    </Container>
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