/* Always returns 1 */
const dummy = (blogs) => {
  return 1;
}

/* Returns the sum of all blogs' likes */
const totalLikes = (blogs) => {
  const sumReducer = (sum, blog) => {
    return sum + blog.likes
  }
  return blogs.reduce(sumReducer, 0)
}

/* Returns the favorite blog (one with most likes) */
const favoriteBlog = (blogs) => {
  let favorite = {}
  
  const favoriteReducer = (mostLikes, blog) => {
    if (blog.likes > mostLikes) {
      /* Change mostLikes to be the current favorite blog's likes */
      mostLikes = blog.likes
      /* Assigns the blog as the favorite (reference, not deep copy) */
      favorite = blog
    }
    return mostLikes
  }
  blogs.reduce(favoriteReducer, -1)
  return favorite  
}

/* Returns object with properties 'author' and 'blogs'
 * 'author': the author with the largest number of blogs 
 * 'blogs' : the number of blogs the author has
 */
const mostBlogs = (blogs) => {
  let authorWithMostBlogs = {}
  const authorAndNumBlogs = []

  /* go through each blog and find each author's # of blogs */
  for (let i = 0; i < blogs.length; i++) {
    let indexOfAuthor = authorAndNumBlogs.findIndex(item => {
        return item.author == blogs[i].author
      })
  
    /* if author doesn't exist in author object array, add the author */
    if (indexOfAuthor == -1) {
      let newAuthor = {
        author: blogs[i].author,
        blogs: 1
      }
      authorAndNumBlogs.push(newAuthor)
    }
    /* if author exists in author object array, increment blog count by 1 */
    else {
      authorAndNumBlogs[indexOfAuthor].blogs += 1
    }
  }

  /* Return the author object whose blog count is higher */
  const mostBlogsReducer = (mostBlogs, author) => {
    if (author.blogs > mostBlogs) {
      mostBlogs = author.blogs
      authorWithMostBlogs = author
    }
    return mostBlogs
  }

  /* Use the reducer to find the author with the higher number of blogs */
  authorAndNumBlogs.reduce(mostBlogsReducer, -1)

  return authorWithMostBlogs
}

/* Returns object with properties 'author' and 'likes'
 * 'author': the author with the largest number of blog likes
 * 'likes' : the number of likes across all blogs the author has
 */
const mostLikes = (blogs) => {
  let authorWithMostLikes = {}
  const authorAndNumLikes = []

  /* go through each blog and find each author's # of likes */
  for (let i = 0; i < blogs.length; i++) {
    let indexOfAuthor = authorAndNumLikes.findIndex(item => {
        return item.author == blogs[i].author
      })

    /* if author doesn't exist in author object array, add the author */
    if (indexOfAuthor == -1) {
      let newAuthor = {
        author: blogs[i].author,
        likes: blogs[i].likes
      }
      authorAndNumLikes.push(newAuthor)
    }
    /* if author exists in author object array, increment likes based on blog */
    else {
      authorAndNumLikes[indexOfAuthor].likes += blogs[i].likes
    }
  }

  /* Return the author object whose total likes count is higher */
  const mostLikesReducer = (mostLikes, author) => {
    if (author.likes > mostLikes) {
      mostLikes = author.likes
      authorWithMostLikes = author
    }
    return mostLikes
  }
  
  /* Use the reducer to find the author with the higher number of likes */
  authorAndNumLikes.reduce(mostLikesReducer, -1)

  return authorWithMostLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}