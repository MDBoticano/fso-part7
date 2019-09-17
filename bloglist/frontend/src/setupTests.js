import '@testing-library/jest-dom/extend-expect'

/* Mock Local Storage for Login */
let savedItems = {}

const localStorageMock = {
  setItem: (key, item) => {
    // console.log(`saving ${item} to ${key}`)
    savedItems[key] = item
  },
  getItem: (key) => {
    // console.log(`getting ${key}`) 
    return savedItems[key]
  },
  clear: () => {
    savedItems = {}
  }
}

Object.defineProperty(window, 'localStorage', { value: localStorageMock })
