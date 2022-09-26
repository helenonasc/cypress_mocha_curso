class ExperienciaPage {

    get #posicao(){return cy.get('[data-test="experience-title"]')}
    get #empresa(){return cy.get('[data-test="experience-company"]')}
    get #localizacao(){return cy.get('[data-test="experience-location"]')}
    get #dataInicio(){return cy.get('#from')}
    get #dataFim(){return cy.get('#to')}
    get #descFormacao(){return cy.get('[data-test="experience-description"]')}
    get #btnAddExpericencia(){return cy.get('[data-test="experience-submit"]')}
    get #atual(){return cy.get('[data-indeterminate="false"]')}


    addExperiencia(posicao, empresa, localizacao, dataInicio, dataFim, descFormacao){
        this.#posicao.type(posicao)
        this.#empresa.type(empresa)
        this.#localizacao.type(localizacao)
        this.#dataInicio.type(dataInicio)
        this.#dataFim.type(dataFim)
        this.#descFormacao.type(descFormacao)
        this.#btnAddExpericencia.click()
    }

    addExperienciaAtual(posicao, empresa, localizacao, dataInicio, descFormacao){
        this.#posicao.type(posicao)
        this.#empresa.type(empresa)
        this.#localizacao.type(localizacao)
        this.#dataInicio.type(dataInicio)
        this.#atual.check()
        this.#descFormacao.type(descFormacao)
        this.#btnAddExpericencia.click()
    }

    
}

module.exports = new ExperienciaPage()