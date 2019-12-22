describe('Blog ', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Cypress Bot',
      username: 'cypress',
      password: 'cypress'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('log in to application')
  })

  it('login form can be opened', function() {
    cy.contains('login')
      .click()
  })

  it('user can login', function() {
    cy.contains('login')
      .click()
    cy.get('#username')
      .type('cypress')
    cy.get('#password')
      .type('cypress')
    cy.contains('Login')
      .click()
    cy.contains('Cypress Bot')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.contains('login')
        .click()
      cy.get('#username')
        .type('cypress')
      cy.get('#password')
        .type('cypress')
      cy.contains('Login')
        .click()
    })

    it('name of the user is shown', function() {
      cy.contains('Cypress Bot')
    })

    it('a new note can be created', function() {
      cy.contains('create new')
        .click()
      cy.get(':nth-child(1) > input')
        .type('a note created by cypress')
      cy.get(':nth-child(2) > input')
        .type('cypress bot')
      cy.get(':nth-child(3) > input')
        .type('https://www.cypress.io/')
      cy.get('form > button')
        .click()
      cy.contains('a note created by cypress')
    })
  })
})