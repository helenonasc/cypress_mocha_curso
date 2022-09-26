/// <reference types="cypress" />
const experienciaPage = require('../../support/Experiencia/experiencia-pages')

describe('Funcionalidade: Adicionar experiência', () => {
    beforeEach(() => {
        cy.loginApp()
        cy.visit('adicionar-experiencia')
    });

    it('Acessar experiência', () => {
        cy.contains('Adicionar Experiência Profissional').should('be.visible')
    });


    it('Deve adicionar uma experiência com sucesso', () => {
        experienciaPage.addExperiencia('QA', 'Via', 'SP', '01/01/2020','01/01/2022','Teste curso')
        cy.get('[data-test="experience-delete"]').first().click()
        cy.contains('Experiência Adicionada').should('be.visible')
    });

    it('Deve adicionar experiência atual', () => {
        experienciaPage.addExperienciaAtual('QA', 'Via', 'SP', '01/01/2020','Teste curso')
        cy.get('[data-test="experience-delete"]').first().click()
        cy.contains('Experiência Adicionada').should('be.visible')
    });

    it('Realizar critica de campos brigatórios', () => {
        cy.get('[data-test="experience-submit"]').click()
        cy.contains('Posição é obrigatória').should('be.visible')
        cy.contains('Empresa é obrigatória').should('be.visible')
        cy.contains('Início é obrigatório').should('be.visible')
        cy.contains('Até é obrigatório').should('be.visible')
    });

    it('Deve excluir uma experiência com sucesso', () => {
        experienciaPage.addExperiencia('QA', 'Via', 'SP', '01/01/2020','01/01/2022','Teste curso')
        cy.get('[data-test="experience-delete"]').first().click()
        cy.contains('Experiência Removida').should('be.visible')
    });

    it('Realizar retorno da tela de Experiência à tela de dashboard com sucesso', () => {
        cy.get('[data-test="experience-dashboard"]').click()
        cy.get('[data-test="dashboard-welcome"]').should('contain', 'Bem-vindo')  
    });
});