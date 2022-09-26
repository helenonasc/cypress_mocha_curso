/// <reference types="cypress" />


describe('Testes de criação de postagens', () => {

    let token

    beforeEach('', () => {
        cy.tokenJwt().then((auth) => {
            token = auth
        })
    });

    it('[POST] - Criar uma postagem', () => {
        cy.request({
            method: 'POST',
            url: '/api/posts',
            headers: {
                Cookie: token
            },
            body: { "text": "teste chuchu" }
        }).then((response) => {
            expect(response.status).to.eq(201)
        })
    })

});

describe('Testes de consulta de postagens', () => {

    let token

    beforeEach('', () => {
        cy.tokenJwt().then((auth) => {
            token = auth
        })
    });

    it('[GET] - Consultar uma postagem', () => {
        cy.request({
            method: 'GET',
            url: '/api/posts',
            headers: {
                Cookie: token
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
        })
    })    
});

describe('Testes de exclusão de postagens', () => {
   
    let token

    beforeEach('', () => {
        cy.tokenJwt().then((auth) => {
            token = auth
        })
    });

    it('[DELETE] - Exclusão uma postagem por id', () => {
        cy.criarPostagem(token, "teste chuchu beleza").then((response) => {
            let id = response.body._id
            cy.request({
                method: 'DELETE',
                url: `/api/posts/${id}`,
                headers: {
                    Cookie: token
                }
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.msg).to.eq("Post removido")
            })
        })
    })
    
});

describe('Testes de alteração de postagens', () => {
   
    let token

    beforeEach('', () => {
        cy.tokenJwt().then((auth) => {
            token = auth
        })
    });

    it('[PUT] - Alteração uma postagem por id', () => {
        cy.criarPostagem(token, "teste chuchu beleza").then((response) => {
            let id = response.body._id
            cy.request({
                method: 'PUT',
                url: `/api/posts/like/${id}`,
                headers: {
                    Cookie: token
                }
            }).then((response) => {
                expect(response.status).to.eq(200)
            })
        })
    })
    
});
