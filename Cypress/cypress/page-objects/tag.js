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
        cy.wait(1000);
    }

    clickOnTagWithPost() {
        cy.get('a[href*="?tag="]').next().click({ force: true })
        cy.wait(1000);
    }

    clickOnTagWithNoPost() {
        cy.get('.tags-list .gh-tag-list-posts-count[href*="/tags/"]').first().next().click({ force: true })
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
            cy.wait(1000)
        });
    }

    checkTagWebSiteTitle(name) {
        cy.get(this.tagWebTitle).contains(name).should('exist')
    }

    checkTagWebSiteDescription(description) {
        cy.get(this.tatagWebDescription).contains(description).should('exist')
    }

    deleteTagAndCheckIsNotInList() {
        cy.get(this.inputName).invoke('val').then(tagName=>{
            cy.get('button>span').contains('Delete tag').click({ force: true })
            cy.wait(1000);
            cy.get('.modal-footer>button>span').contains('Delete').click({ force: true })
            cy.wait(1000);
            this.goToTagList();
            cy.get('h3.gh-tag-list-name').contains(tagName).should('not.exist')
        })
    }
}