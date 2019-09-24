import React from 'react'
import { Form, Button } from 'semantic-ui-react'

const CreateBlog = ({ addBlog, author, title, url }) => {
  return (
    <Form onSubmit={addBlog}>
      <h2>Add blog</h2>
      <Form.Field required>
        <label htmlFor="title">Title</label>
        <input {...title} />
      </Form.Field>
      <Form.Field>
        <label htmlFor="author">Author</label>
        <input {...author} />
      </Form.Field>
      <Form.Field required>
        <label htmlFor="url">URL</label>
        <input {...url} />
      </Form.Field>
      <Button type='submit'>Add</Button>
    </Form>
  )
}

export default CreateBlog