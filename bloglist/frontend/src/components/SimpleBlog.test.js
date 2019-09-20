import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

const blog = {
  title: 'My Blog Title',
  author: 'Mun Row',
  likes: 100,
}

test('renders content', () => {

  const component = render(<SimpleBlog blog={blog} />)

  /* Title test */
  expect(component.container).toHaveTextContent('My Blog Title')

  expect(component.container).toHaveTextContent('Mun Row')

  expect(component.container).toHaveTextContent('blog has 100 likes')
})

test('onClick works', () => {

  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  const button = getByText('like')

  fireEvent.click(button)
  expect(mockHandler.mock.calls.length).toBe(1)

  fireEvent.click(button)
  expect(mockHandler.mock.calls.length).toBe(2)
})