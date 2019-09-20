import React from 'react'
import { render, waitForElement } from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  test('if no user logged, blogs are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    /* Waits for the login button to show */
    await waitForElement(
      // () => component.container.querySelector('.toggleable--hide-btn')

      // Suggested check to wait for data to load
      // () => component.getByText('login')

      // Alternative: wait for login form to be in DOM (but hidden)
      () => component.container.querySelector('#loginForm')
    )

    // If there's no user logged in (default), Only display login form
    const loginForm = component.container.querySelector('#loginForm')
    expect(loginForm).not.toHaveStyle('display: none')

    // There should be zero blogs
    const blogs = component.container.querySelectorAll('.blog-entry')
    expect(blogs.length).toBe(0)
  })

  test('if a logged in user exists, return blogs', async () => {
    // Log in
    const user = {
      username: 'Jan',
      token: '1231231214',
      name: 'Jan Man'
    }

    // console.log('logging in')
    localStorage.setItem('loggedBlogUser', JSON.stringify(user))

    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.container.querySelector('#bloglist')
    )

    // There should now be blogs
    const blogsAfterLogin = component.container.querySelectorAll('.blog-entry')
    expect(blogsAfterLogin.length).toBe(3)
  })
})