/// <reference types="cypress" />
import usuarios from "../../fixtures/usuarios.json"


describe('Funcionalidade: Login', () => {
    
    beforeEach(() => {
        cy.visit('login')
    });

    it('Deve fazer login com sucesso', () => {        
        cy.login(usuarios[0].email, usuarios[0].senha)
        cy.get('[data-test="dashboard-welcome"]').should('contain', 'Bem-vindo')        
    });
    
    it('Validar mensagem de erro quando inserir um usuário ou senha inválidos', () => {
        cy.login(usuarios[0].email, 'J@ne1234568')
        cy.get('[data-test="alert"]').should('contain', 'Credenciais inválidas')        
    });
    
    it('Deve fazer login com sucesso - Usando importação', () => {
        cy.login(usuarios[0].email, usuarios[0].senha)
        cy.get('[data-test="dashboard-welcome"]').should('contain', 'Bem-vindo')       
    });
    
    it('Deve fazer login com sucesso - Usando fixture', () => {
        cy.fixture("usuarios").then((user) => {
            cy.login(user[1].email, user[1].senha)
        })        
        cy.get('[data-test="dashboard-welcome"]').should('contain', 'Bem-vindo')       
    });

});