/// <reference types="cypress" />

describe('Funcionalidade: Login', () => {
    
    beforeEach(() => {
        cy.visit('login')
    });

    it('Deve fazer login com sucesso', () => {        
        cy.login('ccypress@teste.com', 'J@ne123456')
        cy.get('[data-test="dashboard-welcome"]').should('contain', 'Bem-vindo')
        
    });
    
    it('Validar mensagem de erro quando inserir um usuário ou senha inválidos', () => {
        cy.login('ccypress@teste.com', 'J@ne1234568')
        cy.get('[data-test="alert"]').should('contain', 'Credenciais inválidas')
        
    });
});