/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    this.beforeEach(function()   {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {   
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
        cy.get('input[id=firstName]').type('Eduardo')
        cy.get('input[id=lastName]').type('Berg')
        cy.get('input[id=email]').type('duhberg@gmail.com')
        cy.get('input[id=phone]').type('19998224842')
        cy.get('textarea[id=open-text-area]').type('Não sei!',{delay: 0})
        cy.get('button[type=submit]').click()
        cy.get('span[class=success]').should('be.visible')
    })
    
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('input[id=firstName]').type('Eduardo')
        cy.get('input[id=lastName]').type('Berg')
        cy.get('input[id=email]').type('email incorreto!')
        cy.get('input[id=phone]').type('19998224842')
        cy.get('textarea[id=open-text-area]').type('Não sei!',{delay: 0})
        cy.get('button[type=submit]').click()
        cy.get('span[class=error]').should('be.visible')
    })

    it('campo telefone continua vazio quando preenchido com número não-numérico', function() {
        cy.get('input[id=phone').type('apoakops').should('have.value','')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('input[id=firstName]').type('Eduardo')
        cy.get('input[id=lastName]').type('Berg')
        cy.get('input[id=email]').type('duhberg@gmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('button[type=submit]').click()
        cy.get('span[class=error]').should('be.visible')

    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('input[id=firstName]').type('Eduardo').should('have.value','Eduardo')
        cy.get('input[id=lastName]').type('Berg').should('have.value','Berg')
        cy.get('input[id=email]').type('duhberg@gmail.com').should('have.value','duhberg@gmail.com')
        cy.get('input[id=firstName]').clear().should('have.value','')
        cy.get('input[id=lastName]').clear().should('have.value','')
        cy.get('input[id=email]').clear().should('have.value','')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.get('button[type=submit]').click()
        cy.get('span[class=error]').should('be.visible')

    })

})