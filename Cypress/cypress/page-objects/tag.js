export class TagPage {
    url = Cypress.config('ghostUrl')

    goToTagList() {
        cy.get('.gh-nav-list li>a').contains('Tags').click()
        cy.wait(1000)
    }

    createTag(tagName) {
        cy.get('a>span').contains('New tag').click()
        cy.wait(1000);
        cy.get('input[name="name"]').type(tagName, { force: true })
        cy.get('button>span').contains('Save').click()
        cy.wait(500);
        cy.visit(this.url + "#/tags")
    }
    
}