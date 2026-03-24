describe('Central de Atendimento ao Cliente TAT', () => {
beforeEach(() =>{
cy.visit('./src/index.html')
})

  it('verifica o titulo da aplicação', () => {
    cy.title().should('be.equals','Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', ()=>{
    const logText = Cypress._.repeat('abcdfghijklmnopqrstuvxz',10)
    cy.get('#firstName').type('Larissa')
    cy.get('#lastName').type('Alves')
    cy.get('#email').type('larissa.s.alves.santos@gmail.com')
    cy.get('#open-text-area').type(logText,{delay:0})
    cy.contains('button', 'Enviar').click()
    cy.get('.success').should('be.visible')

  } )

it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', ()=>{
    cy.get('#firstName').type('Larissa')
    cy.get('#lastName').type('Alves')
    cy.get('#email').type('larissa.s.alves.santos@gmail,com')
    cy.get('#open-text-area').type('teste')
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  
})

it('Campo telefone continua vazio quando peenchido com um valor não-numérico', ()=>{
cy.get('#phone').type('abcde').should('have.value','')

  
})

it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', ()=>{
cy.get('#firstName').type('Larissa')
    cy.get('#lastName').type('Alves')
    cy.get('#email').type('larissa.s.alves.santos@gmail,com')
    cy.get('#open-text-area').type('teste')
    cy.get('#phone-checkbox').check()
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
})
it('preenche e limpa os campos nome, sobrenome, email e telefone',() =>{
cy.get('#firstName').type('Larissa')
                    .should('have.value', 'Larissa')
                    .clear()

cy.get('#lastName').type('Alves')
                   .should('have.value', 'Alves')
                   .clear()

cy.get('#email').type('larissa.s.alves.santos@gmail.com')
                .should('have.value', 'larissa.s.alves.santos@gmail.com')
                .clear()
})
it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios.',() =>{
  cy.contains('button', 'Enviar').click()
  cy.get('.error').should('be.visible')

})
it('envia o formuário com sucesso usando um comando customizado',() =>{
  cy.fillMadatoryFieldsAndSubmit()
  cy.get('.success').should('be.visible')

})

it('seleciona um produto (YouTube) por seu texto', () =>{
cy.get('#product').select('YouTube').should('have.value', 'youtube')

})

it('seleciona um produto (Mentoria) por seu valor (value)', () => {

  cy.get('#product').select('mentoria').should('have.value', 'mentoria')

})

it('seleciona um produto (Blog) por seu índice', () => {
cy.get('#product').select(1).should('have.value', 'blog')

})

it('marca o tipo de atendimento "Feedback"', () => {
cy.get('input[type="radio"][value="feedback"]').check().should('be.checked')

})
it('marca cada tipo de atendimento', () => {
  cy.get('input[type="radio"]')
      .each(typeOfService => {
        cy.wrap(typeOfService).check().should('be.checked')

  })
})

it('marca ampos checkboxes, depois desmarca o último',() => {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')

})

it('seleciona um arquivo da pasta fixtures e valide o nome do arquivo selecionado', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json')
      .should(input => { 
        expect(input[0].files[0].name).to.equals('example.json')
    })})

    it('seleciona um arquivo simulando um drag-and-drop', () =>{
      cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
      .should(input => { 
        expect(input[0].files[0].name).to.equals('example.json')

    })
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
      cy.fixture('example.json').as('sampleFile')
      cy.get('#file-upload')
      .selectFile('@sampleFile')
      .should(input => { 
        expect(input[0].files[0].name).to.equals('example.json')
    })
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () =>{
      cy.contains('a', 'Política de Privacidade')
        .should('have.attr','href', 'privacy.html')
        .and('have.attr', 'target', '_blank')      
    })
    it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
      cy.contains('a', 'Política de Privacidade')
        .invoke('removeAttr', 'target')
        .click()
      cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')  

    })
   
    })


  })

})


