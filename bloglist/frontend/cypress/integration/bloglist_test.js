describe('Blog ', function() {
  beforeEach(function() {
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
      .type('Jane')
    cy.get('#login-password')
      .type('sugarCane')
    cy.contains('login')
      .click()
    cy.contains('Jane Cane is logged in')
  })
})