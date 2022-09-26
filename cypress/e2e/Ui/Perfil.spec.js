/// <reference types="cypress" />
const faker = require('faker-br')

describe('Funcionalidade: Cadastro', () => {
    
    /*
    antes de tudo - befor
    ante de cada cenário - beforeEcach
    depois de tudo - after

    */
    beforeEach(() => {
        
        cy.visit('cadastrar')
    });

    it('Deve fazer cadastro com sucesso', () => {

        cy.get('[data-test="register-name"]').type(faker.name.findName())
        cy.get('[data-test="register-email"]').type(faker.internet.email())
        let passowd = faker.internet.password()
        cy.get('[data-test="register-password"]').type(passowd)
        cy.get('[data-test="register-password2"]').type(passowd)
        cy.get('[data-test="register-submit"]').click()
        cy.get('[data-test="dashboard-createProfile"]').should('exist')

    });

    
    it('Criar perfil completo', () => {

        let name = faker.name.findName()
        let email = faker.internet.email()
        let passowd = faker.internet.password()
        let company = faker.company.companyName()
        let location = faker.address.city()
        let state = faker.address.state()

        cy.cadastrar(name, email, passowd)
        
        cy.click_element('[data-test="dashboard-createProfile"]')
        cy.click_element('[id="mui-component-select-status"]')
        cy.get('[data-test="status-'+ faker.random.number({max:10}) + '"]').click()
        cy.get('[data-test="profile-company"]').type(company)
        cy.get('[data-test="profile-webSite"]').type('https://www.test.com.br')
        cy.get('[data-test="profile-location"]').type(location + ', ' + state)
        cy.get('[data-test="profile-skills"]').type('Cypress')
        cy.get('[data-test="profile-gitHub"]').type(name)
        cy.get('[data-test="profile-bio"]').type("Profissional de teste")
        cy.click_element('[data-test="profile-submit"]')
        cy.get('.alert-success').should('exist')
        
    });

    it('Criar perfil somente com dados obrigatórios', () => {

        let name = faker.name.findName()
        let email = faker.internet.email()
        let passowd = faker.internet.password()

        cy.cadastrar(name, email, passowd)
        
        cy.click_element('[data-test="dashboard-createProfile"]')
        cy.click_element('[id="mui-component-select-status"]')
        cy.get('[data-test="status-'+ faker.random.number({max:10}) + '"]').click()
        cy.get('[data-test="profile-skills"]').type('Cypress')
        cy.click_element('[data-test="profile-submit"]')
        cy.get('.alert-success').should('exist')
        
    });

    it('Criar perfil semdados obrigatórios', () => {

        let name = faker.name.findName()
        let email = faker.internet.email()
        let passowd = faker.internet.password()

        cy.cadastrar(name, email, passowd)
        
        cy.click_element('[data-test="dashboard-createProfile"]')
        cy.click_element('[id="mui-component-select-status"]')
        cy.get('[data-test="status-'+ faker.random.number({max:10}) + '"]').click()
        cy.click_element('[data-test="profile-submit"]')
        cy.contains("Conhecimentos é obrigatório").should('be.visible')
        
    });
});