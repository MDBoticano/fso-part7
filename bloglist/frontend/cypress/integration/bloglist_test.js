describe('Blog ', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Cyrus Cypress',
      username: 'cici',
      password: 'pizza'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('Blogs')
  })

  it('login form can be opened', function() {
    cy.contains('sign in')
      .click()
  })

  it('user is able to login', function() {
    cy.contains('sign in')
      .click()
    cy.get('#login-username')
      .type('cici')
    cy.get('#login-password')
      .type('pizza')
    cy.contains('login')
      .click()
    cy.contains('Cyrus Cypress is logged in')
  })
})