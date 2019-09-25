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

    it('user can signout', function() {
      cy.contains('logout')
        .click()
      cy.contains('sign in')
    })

    describe('user can add a new blog', function () {
      beforeEach(function () {
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
      })

      it('the blog exists in the bloglist', function () {
        cy.contains('Five hundred days of Summer')
      })

      describe('individual blog can be visited', function () {
        beforeEach(function () {
          cy.contains('a', 'Five hundred days of Summer')
            .click()
        })

        it('the blog is still visible in the blogslist', function() {
          cy.contains('a', 'Blogs')
            .click()
          cy.contains('a', 'Five hundred days of Summer')
        })

        it('the blog is counted in the users list', function() {
          cy.contains('a', 'Users')
            .click()
          cy.contains('a', 'Cyrus Cypress')
            .click()
          cy.contains('Five hundred days of Summer')
        })

        it('the blog has 0 likes', function () {
          cy.contains('0 likes')
        })

        it('the blog can be liked', function() {
          cy.contains('button', 'Like')
            .click()
          cy.contains('1 likes')
        })

        it('a comment can be left', function() {
          cy.get('#comment-text')
            .type('I liked this movie. Oh, it was a blog first?')
          cy.contains('Add Comment')
            .click()
          cy.contains('I liked this movie. Oh, it was a blog first?')
        })

        it('the blog can be deleted', function() {
          cy.get('.delete-btn')
            .click()
          cy.contains('a', 'Blogs')
            .click()
          cy.contains('a', 'Five hundred days of Summer').should('not.exist')
          cy.contains('a', 'Users')
            .click()
          cy.contains('a', 'Cyrus Cypress').should('not.exist')
        })
      })
    })
  })
})