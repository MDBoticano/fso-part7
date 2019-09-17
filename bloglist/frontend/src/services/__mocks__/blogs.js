const blogs = [
  {
    "title": "My Tuesday",
    "author": "Mark",
    "url": "www.marloboticano.com",
    "likes": 17,
    "id": "5d51fa0371ffa73b3046b4ae"
  },
  {
    "title": "My Monday",
    "author": "Mark",
    "url": "www.marloboticano.com",
    "likes": 117,
    "id": "5d56023b5b177b1f68969a21"
  },
  {
    "title": "My Thursday",
    "author": "Mark",
    "url": "www.marloboticano.com",
    "likes": 204,
    "id": "5d5604df658de14b94d372d3"
  }
]

let token = null;

const getAll = () => {
  // console.log('User logged in: returning blogs')
  return Promise.resolve(blogs)
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

export default { getAll, setToken }