export class TagPage {
    url = Cypress.config('ghostUrl')
    inputName = 'input[name="name"]'
    inputDescription = 'textarea[name="description"]'
    tagWebURL = '.ghost-url-preview'
    tagWebTitle = '.site-title'
    tatagWebDescription = '.site-description'

    goToTagList() {
        cy.get('.gh-nav-list li>a').contains('Tags').click()
        cy.wait(1000)
    }

    createTag(tagName) {
        cy.get('a>span').contains('New tag').click()
        cy.wait(1000);
        cy.get(this.inputName).type(tagName, { force: true })
        this.saveTag()
        cy.visit(this.url + "#/tags")
    }

    clickOnTagWithPost() {
        cy.get('a[href*="?tag="]').next().click({ force: true })
        cy.wait(1000);
    }

    setTagName(tagName) {
        cy.get(this.inputName).clear({ force: true }).type(tagName, { force: true })
    }

    setTagDescription(tagDescription) {
        cy.get(this.inputDescription).clear({ force: true }).type(tagDescription, { force: true })
    }

    saveTag() {
        cy.get('button>span').contains('Save').click()
        cy.wait(500);
    }

    updateAndGoToWebSite() {
        cy.get(this.tagWebURL).invoke('text').then(url => {
            this.saveTag()
            cy.log(url)
            cy.visit(url)
        });
    }

    checkTagWebSiteTitle(name) {
        cy.get(this.tagWebTitle).contains(name).should('exist')
    }

    checkTagWebSiteDescription(description) {
        cy.get(this.tatagWebDescription).contains(description).should('exist')
    }
}