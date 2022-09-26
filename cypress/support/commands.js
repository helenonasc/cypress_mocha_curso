// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

/// <reference types="Cypress" />
import auth from '../fixtures/auth.json'
const faker = require('faker-br')

Cypress.Commands.add('navigate', (route) => {
    cy.intercept(route).as('loadpage')
    cy.visit(route, { timeout: 30000 })
    cy.wait('@loadpage')
})

Cypress.Commands.add("login", (email, password) => {
    cy.get('[data-test="login-email"]').type(email)
    cy.get('[data-test="login-password"]').type(password)
    cy.get('[data-test="login-submit"]').click()
})

import user from "../fixtures/usuarios.json"

Cypress.Commands.add("loginApp", (email, password) => {
    cy.request({
        method: 'POST',
        url: 'api/auth',
        body:
        {
            email : user[0].email,
            password: user[0].senha
        }
    }).then((response)=>{
        cy.setCookie('region', 'BR-SP')
        window.localStorage.setItem('token',response.body.jwt)
    })

})


Cypress.Commands.add("cadastrar", (name, email, password) => {
    cy.get('[data-test="register-name"]').type(name)
    cy.get('[data-test="register-email"]').type(email)
    cy.get('[data-test="register-password"]').type(password)
    cy.get('[data-test="register-password2"]').type(password)
    cy.get('[data-test="register-submit"]').click()
    cy.get('[data-test="dashboard-createProfile"]').should('be.visible')
})

Cypress.Commands.add("Add_Formacao", (school, degree, course,date_start, date_end, description) => {
    cy.get('[data-test="education-school"]').type(school)
    cy.get('[data-test="education-degree"]').type(degree)
    cy.get('[data-test="education-fieldOfStudy"]').type(course)
    cy.get('[data-test="education-from"]').type(date_start)
    cy.get('[data-test="education-to"]').type(date_end)
    cy.get('[data-test="education-description"]').type(description)
    cy.get('[data-test="education-submit"]').click()
})

Cypress.Commands.add("Add_Formacao_Andamento", (school, degree, course, date_start, description) => {
    cy.get('[data-test="education-school"]').type(school)
    cy.get('[data-test="education-degree"]').type(degree)
    cy.get('[data-test="education-fieldOfStudy"]').type(course)
    cy.get('[data-test="education-from"]').type(date_start)
    cy.get('[data-test="education-current"]').click()
    cy.get('[data-test="education-description"]').type(description)
    cy.get('[data-test="education-submit"]').click()
})

Cypress.Commands.add("click_element", (element) => {
    cy.get(element).click()
})

Cypress.Commands.add("tokenJwt", () => {
    cy.request({
        method: 'POST',
        url: '/api/auth',
        body: auth
    }).then((response) => {
        return response.body.jwt
    })

    Cypress.Commands.add("criarPostagem", (token, value) => {
        cy.request({
            method: 'POST',
            url: '/api/posts',
            headers: {
                Cookie: token
            },
            body: {
                text: value
            }
        })
    })

    Cypress.Commands.add("criarPerfil", (token, perfil) => {
        cy.request({
            method: 'POST',
            url: '/api/profile',
            headers: {
                Cookie: token
            },
            body: perfil
        }).then((response) => {
            expect(response.status).to.eq(200)
        })
    })

    Cypress.Commands.add("criarUsuario", (email) => {
        cy.request({
            method: 'POST',
            url: '/api/users',
            body: {
                email: email,
                name: "teste teste",
                password: "1234567"
            }
        }).then((response) => {
            expect(response.status).to.eq(201)
        })
    })

    Cypress.Commands.add("criarExperiencia", () => {
        let company_faker = faker.company.companyName()
        let location_faker = faker.address.city()
        cy.request({
            method: 'PUT',
            url: `/api/profile/experience`,
            body: {

                title: company_faker,
                company: company_faker,
                location: location_faker,
                "from": "2022-09-26",
                "to": "2022-09-26",
                "current": false,
                "description": faker.company.catchPhraseDescriptor()

            }
        }).then((response) => {
            expect(response.status).to.eq(200)
        })
    })

    Cypress.Commands.add("criarEscolaridade", () => {
     
        cy.request({
            method: 'PUT',
            url: `/api/profile/education`,
            body: {

                
                    school: "USP",
                    degree: "Mestrado",
                    fieldofstudy: "teste",
                    from: "2022-09-26",
                    to: "2022-09-26",
                    current: false,
                    description: "teste"
               

            }
        }).then((response) => {
            expect(response.status).to.eq(200)
        })
    })

})