describe('empty spec', () => {


  it.only('testa a página da política de privacidade de forma independente', function() {
    cy.visit('./src/privacy.html')
    cy.get('#title').should('be.visible')
  })

})