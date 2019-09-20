import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const blog = {
  author: 'Dan Manny',
  title: 'The Homepage of the Internet',
  url: 'https://google.com',
  likes: 100,
}

test('Title & Author only shown by default', () => {

  const component = render(<Blog blog={blog} />)

  expect(component.container).toHaveTextContent('The Homepage of the Internet')

  expect(component.container).toHaveTextContent('Dan Manny')

  /* These two should fail since they're hidden by default */
  // expect(component.container).toHaveTextContent('100 likes')

  // expect(component.container).toHaveTextContent('https://google.com')
})

test('Clicking button shows details (URL & likes)', () => {
  const component = render(<Blog blog={blog} />)

  const button = component.container.querySelector('.blog-summary')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent('100 likes')

  expect(component.container).toHaveTextContent('https://google.com')
})