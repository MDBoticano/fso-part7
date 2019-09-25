import React from 'react'
import { Form, Button } from 'semantic-ui-react'

const CreateBlog = ({ addBlog, author, title, url }) => {
  return (
    <Form onSubmit={addBlog}>
      <h2>Add blog</h2>
      <Form.Field required>
        <label htmlFor="title">Title</label>
        <input id="add-blog_title" {...title} />
      </Form.Field>
      <Form.Field>
        <label htmlFor="author">Author</label>
        <input id="add-blog_author" {...author} />
      </Form.Field>
      <Form.Field required>
        <label htmlFor="url">URL</label>
        <input id="add-blog_URL" {...url} />
      </Form.Field>
      <Button type='submit'>Add Blog</Button>
    </Form>
  )
}

export default CreateBlog