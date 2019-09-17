import React from 'react'

// const CreateBlog = ({ addBlog, author, handleAuthor, title, handleTitle,
//   url, handleUrl }) => {

  const CreateBlog = ({ addBlog, author, title, url}) => {

  return (
    <form id="create-blog" onSubmit={addBlog}>
      <h2>Add blog</h2>
      <div className="blog-input">
        <label htmlFor="title">Title</label>
        {/* <input value={title} onChange={handleTitle} /> */}
        <input {...title} />
      </div>
      <div className="blog-input">
        <label htmlFor="author">Author</label>
        {/* <input value={author} onChange={handleAuthor} /> */}
        <input {...author} />
      </div>
      <div className="blog-input">
        <label htmlFor="url">URL</label>
        {/* <input value={url} onChange={handleUrl} /> */}
        <input {...url} />
      </div>
      <button type='submit'>Add</button>
    </form>
  )
}

export default CreateBlog