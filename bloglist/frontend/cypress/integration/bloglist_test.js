describe('Blog ', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Cyrus Cypress',
      username: 'cici',
      password: 'pizza'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function () {
    cy.contains('Blogs')
  })

  it('login form can be opened', function () {
    cy.contains('sign in')
      .click()
  })

  describe('after logging in...', function () {
    beforeEach(function () {
      cy.contains('sign in')
        .click()
      cy.get('#login-username')
        .type('cici')
      cy.get('#login-password')
        .type('pizza')
      cy.contains('login')
        .click()
    })

    it('user\'s name is shown', function () {
      cy.contains('Cyrus Cypress is logged in')
    })

    it('user can add a new blog', function() {
      cy.contains('new blog')
        .click()
      cy.get('#add-blog_title')
        .type('Five hundred days of Summer')
      cy.get('#add-blog_author')
        .type('Noon')
      cy.get('#add-blog_URL')
        .type('https://www.google.com')
      cy.contains('Add Blog')
        .click()
      cy.contains('Five hundred days of Summer')
    })
  })
})