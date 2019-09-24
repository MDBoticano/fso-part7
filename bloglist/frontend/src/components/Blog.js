import React from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'semantic-ui-react'

const Blog = ({ blog }) => {
  const blogHasAuthor = () => {
    if (blog.author) {
      return blog.author
    }
  }

  if (!blog) {
    return null
  }

  return (
    <Table.Row className="blog-entry">
      <Table.Cell>
        <p style={{ margin: 0 }}>
          <Link to={`/blogs/${blog.id}`}>{blog.title} </Link>
        </p>
      </Table.Cell>
      <Table.Cell>
        {blogHasAuthor()}
      </Table.Cell>
    </Table.Row>
  )
}

export default Blog