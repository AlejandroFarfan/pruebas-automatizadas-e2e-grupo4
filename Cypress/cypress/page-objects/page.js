/// <reference types="cypress" />
import * as faker from 'faker'

export class Page {
    adminUrl = Cypress.config('ghostUrl')
    publicSite = Cypress.config('ghostUrl').split('ghost/')[0]
    pageTitle = 'textarea[placeholder="Page Title"]'
    backToPageList = 'a[href="#/pages/"]'
    pageEntry = '.gh-content-entry-title'
    postCardTitle = 'h2.post-card-title'
    screenPath = Cypress.config('ghostUnderTest')+'/page-'

    goToPagesSection() {
        cy.get('a[href*="#/pages/"]').first().click({force: true})
    }

    getAndVisitUrl(selector) {
        cy.get(selector).first().invoke('attr', 'href').then(href => {
            cy.visit(this.adminUrl + href);
        });
    }

    clickNewPage() {
        cy.get('a[href*="#/editor/page/"]').first().click({force: true})
    }

    createPageWithNoContent() {
        this.clickNewPage()
        cy.get(this.pageTitle).click()
        cy.get(this.backToPageList).first().click()
        cy.get(this.pageEntry).first().should('contain.text', '(Untitled)')

    }

    editFirstPageWithError(title, paragraph) {
        this.editFirstPage(title, paragraph);
        cy.get('div.gh-publishmenu.ember-view').first().click()
        cy.get('.gh-publishmenu-button').first().click()
        cy.get('aside.gh-alerts.ember-view').should('be.visible').should('contain.text', 'Saving failed: Title cannot be longer than 255 characters.')
        cy.get(this.backToPageList).first().click()
        cy.get('.gh-btn-red').contains('Leave') .click()

    }

    editFirstPageOk(title, paragraph) {
        this.editFirstPage(title, paragraph);
        cy.get('div.gh-publishmenu.ember-view').first().click()
        cy.get('.gh-publishmenu-button').first().click()
        cy.get('.gh-notifications').should('be.visible')
        cy.get(this.backToPageList).first().click()
        cy.get('.gh-list').should('contain.text', title)
    }


    editFirstPage(title, paragraph) {
        this.getAndVisitUrl('a[title="Edit this page"]')
        cy.get('textarea[placeholder="Page Title"]').clear().type(title)
        cy.get('.koenig-editor__editor').type(paragraph)

    }

    deletePublishedPage(){
        cy.get('.gh-list-row')
            .then(($elements) => {
                const pages = $elements.length
                this.getAndVisitUrl('a[title="Edit this page"]')
                cy.get('.post-settings').click()
                cy.get('form > .gh-btn > span').click().wait(1000)
                cy.get('.gh-btn-red').first().click()
                this.goToPagesSection()
            })
    }

    addEditPage(title, paragraph){
        this.createPageWithNoContent();
        this.editFirstPageOk(title, paragraph);
        this.deletePublishedPage();
    }

    addEditPageError(title, paragraph) {
        this.createPageWithNoContent();
        this.editFirstPageWithError(title, paragraph);
        this.deletePublishedPage();
    }
}
