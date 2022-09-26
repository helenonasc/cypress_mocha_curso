/// <reference types="cypress" />

describe('Funcionalidade: Visualização de perfis', () => {

    beforeEach(() => {
        cy.visit('/perfis')
        cy.intercept({
            method: 'GET',
            url: 'api/profile'
        }, {
            statusCode: 200,
            fixture: "profile"
        }
        )
        cy.reload()
    });

    it('Validar o primeiro item da lista', () => {
        cy.get('[data-test="profile-name"]').first().should('contain', 'Danilo Heleno')
    });

    it('Validar lista vazia', () => {
        cy.intercept('api/profile', {statusCode: 500})
        cy.reload()
        cy.get('[data-test="profiles-noProfiles"]').should('contain', 'Nenhum perfil encontrado')
    });

    it('Validar ultimo item da lista', () => {
        cy.get('[data-test="profile-name"]').last().should('contain', 'Roberto dos Santos')
    });

    it('Validar terceiro item da lista', () => {
        cy.get('[data-test="profile-name"]').eq(2).should('contain', 'Lais Sousa')
    });

});