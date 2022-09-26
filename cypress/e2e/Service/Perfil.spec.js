/// <reference types="cypress" />
import profile_insert from '../../fixtures/profile_insert.json'
const faker = require('faker-br')

describe('Testes de criação de perfil', () => {

    let token

    beforeEach('', () => {
        cy.tokenJwt().then((auth) => {
            token = auth
        })
    });

    it('[POST] - Criar perfil', () => {
        cy.request({
            method: 'POST',
            url: '/api/profile',
            headers: {
                Cookie: token
            },
            body: profile_insert
        }).then((response) => {
            expect(response.status).to.eq(200)
        })
    })

});

describe('Testes de consulta de perfil', () => {

    let token

    beforeEach('', () => {
        cy.tokenJwt().then((auth) => {
            token = auth
        })
    });

    it('[GET] - Consultar perfil', () => {
        cy.request({
            method: 'GET',
            url: '/api/profile/me',
            headers: {
                Cookie: token
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
        })
    })

    it('[GET] - Consultar perfil por id', () => {
        cy.request({
            method: 'GET',
            url: '/api/profile/me',
            headers: {
                Cookie: token
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
        })
    })

});



describe('Testes de alteração perfil', () => {

    let token

    beforeEach('', () => {
        cy.tokenJwt().then((auth) => {
            token = auth
        })
    });

    it('[PUT] - Alteração um perfil educacional', () => {
        cy.request({
            method: 'PUT',
            url: 'api/profile/education',
            headers: {
                Cookie: token
            },
            body: {

                "school": faker.name.findName(),
                "degree": "teste",
                "fieldofstudy": "teste",
                "from": "2022-09-26",
                "to": "2022-09-26",
                "current": false,
                "description": faker.company.catchPhraseDescriptor()

            }
        }).then((response) => {
            expect(response.status).to.eq(200)
        })
    })

    it('[PUT] - Alteração um perfil experiência', () => {

        let company = faker.company.companyName()
        let location = faker.address.city()
        cy.request({
            method: 'PUT',
            url: '/api/profile/experience',
            headers: {
                Cookie: token
            },
            body: {

                "title": company,
                "company": "string",
                "location": location,
                "from": "2022-09-26",
                "to": "2022-09-26",
                "current": false,
                "description": faker.company.catchPhraseDescriptor()

            }
        }).then((response) => {
            expect(response.status).to.eq(200)
        })
    })

});



describe('Testes de exclusão de perfil', () => {

    let token
    let user
    beforeEach('', () => {
        user = cy.criarUsuario(faker.internet.email());
        cy.tokenJwt().then((user) => {
            token = user
        })
    });

    it('[DELETE] - Exclusão uma experiência por id', () => {

        cy.criarExperiencia().then((response) => {
            let id = response.body.experience[0]._id
            cy.request({
                method: 'DELETE',
                url: `/api/profile/experience/${id}`,
            }).then((response) => {
                expect(response.status).to.eq(200)
            })
        })
    })

    it('[DELETE] - Exclusão uma formação acadêmica por id', () => {

        cy.criarEscolaridade().then((response) => {
            let id = response.body.education[0]._id

            cy.request({
                method: 'DELETE',
                url: `/api/profile/education/${id}`,
            }).then((response) => {
                expect(response.status).to.eq(200)
            })
        })
    })
});