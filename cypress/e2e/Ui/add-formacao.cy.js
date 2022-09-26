/// <reference types="cypress" />
const faker = require('faker-br')

describe('Funcionalidade: Adicionar formação', () => {
    beforeEach(() => {
        cy.loginApp()
        cy.visit('adicionar-formacao')
    });

    it('Acessar Adicionar formação', () => {
        cy.contains('Adicionar Formação Acadêmica').should('be.visible')
    });


    it('Deve adicionar formação com sucesso', () => {
        cy.Add_Formacao("USP", "Mestrado", "Ciência da Computação",'01/01/2020','01/01/2022', faker.company.catchPhraseDescriptor())
        cy.contains('Formação Acadêmica Adicionada').should('be.visible')
        cy.get('[data-test="education-delete"]').first().click()
    });

    it('Deve adicionar formação em andamento', () => {
        cy.Add_Formacao_Andamento("USP", "Mestrado", "Ciência da Computação", '01/01/2020',faker.company.catchPhraseDescriptor())
        cy.contains('Formação Acadêmica Adicionada').should('be.visible')
        cy.get('[data-test="education-delete"]').first().click()
        
    });

    it('Realizar critica de campos brigatórios', () => {
        cy.get('[data-test="education-submit"]').click()
        cy.contains('Escola é obrigatória').should('be.visible')
        cy.contains('Grau é obrigatório').should('be.visible')
        cy.contains('Curso é obrigatório').should('be.visible')
        cy.contains('Início é obrigatório').should('be.visible')
        cy.contains('Até é obrigatório').should('be.visible')        
    });

    it('Deve excluir uma formação com sucesso', () => {
        cy.Add_Formacao("USP", "Mestrado", "Ciência da Computação",'01/01/2020','01/01/2022', faker.company.catchPhraseDescriptor())
        cy.contains('Formação Acadêmica Adicionada').should('be.visible')
        cy.get('[data-test="education-delete"]').first().click()
        cy.contains('Formação Acadêmica Removida').should('be.visible')
    });

    
    it('Realizar retorno da tela de Experiência à tela de dashboard com sucesso', () => {
        cy.get('[data-test="education-dashboard"]').click()
        cy.get('[data-test="dashboard-welcome"]').should('contain', 'Bem-vindo')  
    });
});