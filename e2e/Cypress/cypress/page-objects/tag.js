export class TagPage {
    inputName = 'input[name="name"]'
    inputDescription = 'textarea[name="description"]'
    tagWebURL = '.ghost-url-preview'
    tagWebTitle = '.site-title'
    tatagWebDescription = '.site-description'

    goToTagList() {
        cy.get('.gh-nav-list li>a').contains('Tags').click()
        cy.wait(1000)
    }

    clickOnNewTag() {
        cy.get('a>span').contains('New tag').click()
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

    clickOnSaveTag() {
        cy.get('button>span').contains('Save').click()
    }

    getTagWeb(){
        return cy.get(this.tagWebURL).invoke('text')
    }

    checkTagWebSiteTitle(name) {
        cy.get(this.tagWebTitle).contains(name).should('exist')
    }

    checkTagWebSiteDescription(description) {
        cy.get(this.tatagWebDescription).contains(description).should('exist')
    }

    getTagNameValue(){
        return cy.get(this.inputName).invoke('val')
    }

    clickOnDeleteTag(){
        cy.get('button>span').contains('Delete tag').click({ force: true }).wait(2000)
    }

    clickOnConfirmDelete(){
        cy.get('.modal-footer>button>span').contains('Delete').click({ force: true })
    }

    checkTagIsNotInList(tagName){
        cy.get('h3.gh-tag-list-name').contains(tagName).should('not.exist')
    }

    clickOnInternalTab() {
        cy.get('button>span').contains('Internal tags').click()
        cy.wait(1000)
    }

    checkTagOnList(name) {
        cy.get('h3.gh-tag-list-name').contains(name).should('exist')
    }
}