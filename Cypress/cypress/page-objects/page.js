/// <reference types="cypress" />
import * as faker from 'faker'

export class Page {
    adminUrl = Cypress.config('ghostUrl')
    publicSite = Cypress.config('ghostUrl').split('ghost/')[0]
    pageTitle = 'textarea[placeholder="Page Title"]'
    backToPageList = 'a[href="#/pages/"]'
    pageEntry = '.gh-content-entry-title'
    postCardTitle = 'h2.post-card-title'

    goToPagesSection() {
        cy.get('#ember30').click()
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

    createPageUnpublished() {
        this.clickNewPage()
        cy.get(this.pageTitle).click()
        cy.get(this.backToPageList).first().click()
        cy.get(this.pageEntry).first().should("contain.text", '(Untitled)');

        cy.visit(this.publicSite)
        cy.get(this.postCardTitle).first().should('not.contain.text', '(Untitled)')
    }

    editFirstPage() {
        let title = faker.lorem.sentence(10)
        this.getAndVisitUrl('a[title="Edit this post"]')
        cy.get('textarea[placeholder="Page Title"]').clear().type(title)
        cy.get('.koenig-editor__editor').type(faker.lorem.paragraph() + '{enter}').type(faker.lorem.paragraph())
        cy.get('div.gh-publishmenu.ember-view').first().click()
        cy.get('.gh-publishmenu-button').first().click()

        cy.get('.gh-notifications').should('be.visible')
        cy.get(this.backToPageList).first().click()
        cy.get('.gh-content-status-published').first().should("exist")

    }

    deletePublishedPage(){
        this.getAndVisitUrl('a[title="Edit this post"]')
        cy.get('.post-settings').click()
        cy.get('form > .gh-btn > span').click()
        cy.get('.gh-btn-red').first().click()
        cy.wait(2000)
    }
}
