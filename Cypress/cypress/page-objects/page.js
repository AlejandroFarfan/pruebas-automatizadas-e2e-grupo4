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
        cy.get('a[href*="#/pages/"]').click()
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
        var step =0
        cy.screenshot('scenario1_step'+step++).wait(1000)
        this.clickNewPage()
        cy.screenshot('scenario1_step'+step++).wait(1000)
        cy.get(this.pageTitle).click()
        cy.screenshot('scenario1_step'+step++).wait(1000)
        cy.get(this.backToPageList).first().click()
        cy.screenshot('scenario1_step'+step++).wait(1000)
        cy.get(this.pageEntry).first().should('contain.text', '(Untitled)')
        cy.screenshot('scenario1_step'+step++).wait(1000)
    }

    createPageUnpublished() {
        var step =0
        cy.screenshot('scenario2_step'+step++).wait(1000)
        this.clickNewPage()
        cy.screenshot('scenario2_step'+step++).wait(1000)
        cy.get(this.pageTitle).click()
        cy.screenshot('scenario2_step'+step++).wait(1000)
        cy.get(this.backToPageList).first().click()
        cy.screenshot('scenario2_step'+step++).wait(1000)
        cy.get(this.pageEntry).first().should("contain.text", '(Untitled)')
        cy.screenshot('scenario2_step'+step++).wait(1000)

        cy.visit(this.publicSite)
        cy.screenshot('scenario2_step'+step++).wait(1000)
        cy.get(this.postCardTitle).first().should('not.contain.text', '(Untitled)')
        cy.screenshot('scenario2_step'+step++).wait(1000)
    }

    editFirstPage() {
        let title = faker.lorem.sentence(10)
        var step =0
        cy.screenshot('scenario3_step'+step++).wait(1000)
        this.getAndVisitUrl('a[title="Edit this post"]')
        cy.screenshot('scenario3_step'+step++).wait(1000)
        cy.get('textarea[placeholder="Page Title"]').clear().type(title)
        cy.screenshot('scenario3_step'+step++).wait(1000)
        cy.get('.koenig-editor__editor').type(faker.lorem.paragraph() + '{enter}').type(faker.lorem.paragraph())
        cy.screenshot('scenario3_step'+step++).wait(1000)
        cy.get('div.gh-publishmenu.ember-view').first().click()
        cy.screenshot('scenario3_step'+step++).wait(1000)
        cy.get('.gh-publishmenu-button').first().click()
        cy.screenshot('scenario3_step'+step++).wait(1000)

        cy.get('.gh-notifications').should('be.visible')
        cy.screenshot('scenario3_step'+step++).wait(1000)
        cy.get(this.backToPageList).first().click()
        cy.screenshot('scenario3_step'+step++).wait(1000)
        cy.get('.gh-list').should('contain.text', title)
        cy.screenshot('scenario3_step'+step++).wait(1000)

    }

    deletePublishedPage(){
        var step =0
        cy.screenshot('scenario4_step'+step++).wait(1000)

        cy.get('.gh-list-row')
        .then(($elements) => {
            // count menu items
            const pages = $elements.length
            cy.log('pages count ', pages)
            this.getAndVisitUrl('a[title="Edit this post"]')
            cy.screenshot('scenario4_step'+step++).wait(1000)
            cy.get('.post-settings').click()
            cy.screenshot('scenario4_step'+step++).wait(1000)
            cy.get('form > .gh-btn > span').click()
            cy.screenshot('scenario4_step'+step++).wait(1000)
            cy.get('.gh-btn-red').first().click()
            cy.wait(2000)
            cy.screenshot('scenario4_step'+step++).wait(1000)

            this.goToPagesSection()

            cy.screenshot('scenario4_step'+step++).wait(1000)

            cy.get('.gh-list-row').should(($menuItems) => {
                expect($menuItems).to.have.length(pages-1)
            })
        })

    }
}
