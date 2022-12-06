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
        cy.contains('button','Enviar').click()
        cy.get('span[class=success]').should('be.visible')
    })
    
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('input[id=firstName]').type('Eduardo')
        cy.get('input[id=lastName]').type('Berg')
        cy.get('input[id=email]').type('email incorreto!')
        cy.get('input[id=phone]').type('19998224842')
        cy.get('textarea[id=open-text-area]').type('Não sei!',{delay: 0})
        cy.contains('button','Enviar').click()
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
        cy.contains('button','Enviar').click()
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
        cy.contains('button','Enviar').click()
        cy.get('span[class=error]').should('be.visible')

    })

    it('envia o formuário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('span[class=success]').should('be.visible')
    })


    it('seleciona um produto (YouTube) por seu texto', function() {
        cy.get('select#product').select('youtube').should('have.value','youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function() {
        cy.get('select#product').select('mentoria').should('have.value','mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function() {
        cy.get('select#product').select(1).should('have.value','blog')
    })

    it('marca o tipo de atendimento "Feedback"', function() {
        cy.get('input[value=feedback').check()
    })

    it('marca cada tipo de atendimento', function() {
        cy.get('input[type=radio]')
            .should('have.length', 3)
            .each(function($radio){ 
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })

    it('marca ambos checkboxes, depois desmarca o último', function() {
        cy.get('input[type=checkbox]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')        
    })

    it('seleciona um arquivo da pasta fixtures', function() {
        cy.get('input[id=file-upload')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json')
            .should(function($input){ 
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo simulando um drag-and-drop', function() {
        cy.get('input[id=file-upload')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json', {action:'drag-drop'})
        .should(function($input){ 
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[id=file-upload')
        .should('not.have.value')
        .selectFile('@sampleFile', {action:'drag-drop'})
        .should(function($input){ 
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
        cy.contains('a','Política de Privacidade').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function() {
        cy.contains('a','Política de Privacidade').invoke('removeAttr','target').click()
        cy.get('#title').should('be.visible')
    })


})