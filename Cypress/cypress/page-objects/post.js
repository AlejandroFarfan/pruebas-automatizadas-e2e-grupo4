/// <reference types="cypress" />
import * as faker from 'faker'

export class Post {
    adminUrl = Cypress.config('ghostUrl')
    publicSite = Cypress.config('ghostUrl').split('ghost/')[0]
    postTitle = 'textarea[placeholder="Post Title"]'
    backToPostsList = 'a[href="#/posts/"]'
    postEntry = '.gh-content-entry-title'
    postCardTitle = 'h2.post-card-title'
    path = Cypress.config('ghostUnderTest')+'/'
    scenario = 'post-scenario-'
    sNumber = 1

    goToPostsSection(takeShot = false) {
        cy.get('.gh-nav-list-new a').first().click()
        cy.wait(1000)
        cy.screenshot(this.path + this.scenario + this.sNumber + '-1')
        takeShot ? cy.screenshot(this.path + this.scenario + this.sNumber + '-1') : undefined
    }

    getAndVisitUrl(selector) {
        cy.get(selector).first().invoke('attr', 'href').then(href => {
            cy.visit(this.adminUrl + href);
        });
    }

    clickNewPost() {
        cy.get('.gh-btn').click()
        cy.wait(1000)
    }

    createPostWithNoContents() {
        this.clickNewPost()
        cy.screenshot(this.path + this.scenario + this.sNumber + '-2')
        cy.wait(1000)

        cy.get(this.backToPostsList).first().click()
        cy.wait(1000)
        cy.screenshot(this.path + this.scenario + this.sNumber + '-3')

        //verify that empty post has not been created
        cy.get(this.postEntry).first().should('not.contain.text', 'Post Title')
        this.sNumber++
    }

    createPostUntitled() {
        this.clickNewPost()
        cy.screenshot(this.path + this.scenario + this.sNumber + '-2')

        cy.get(this.postTitle).click()
        cy.wait(1000)
        cy.screenshot(this.path + this.scenario + this.sNumber + '-3')

        cy.get(this.backToPostsList).first().click()
        cy.get(this.postEntry).first().should("contain.text", '(Untitled)');
        cy.wait(1000)
        cy.screenshot(this.path + this.scenario + this.sNumber + '-4')

        //verify that untitled post is unpublished
        cy.visit(this.publicSite)
        cy.get(this.postCardTitle).first().should('not.contain.text', '(Untitled)')
        cy.screenshot(this.path + this.scenario + this.sNumber + '-5', { capture: 'viewport' } )
        this.sNumber++
    }

    editFirstPost(valid) {
        let title = valid ? faker.lorem.sentence(10) : faker.lorem.sentence(100)
        this.getAndVisitUrl('a[title="Edit this post"]')
        cy.wait(1000)
        cy.screenshot(this.path + this.scenario + this.sNumber + '-2')

        cy.get('textarea[placeholder="Post Title"]').clear().type(title)
        cy.wait(1000)
        cy.screenshot(this.path + this.scenario + this.sNumber + '-3')

        cy.get('.koenig-editor__editor').type(faker.lorem.paragraph() + '{enter}').type(faker.lorem.paragraph())
        cy.wait(1000)
        cy.screenshot(this.path + this.scenario + this.sNumber + '-4')

        cy.get('div.gh-publishmenu.ember-view').first().click()
        cy.wait(1000)
        cy.screenshot(this.path + this.scenario + this.sNumber + '-5')

        cy.get('.gh-publishmenu-button').first().click()
        cy.wait(1000)
        cy.screenshot(this.path + this.scenario + this.sNumber + '-6')

        if (valid) {
            cy.get('.gh-notifications').should('be.visible')

            cy.visit(this.publicSite)

            cy.get(this.postCardTitle).first().should('contain.text', title)
            cy.screenshot(this.path + this.scenario + this.sNumber + '-7', { capture: 'viewport' } )

        } else {
            cy.get('aside.gh-alerts.ember-view').should('be.visible').should('contain.text', 'Saving failed: Title cannot be longer than 255 characters.')
            
            cy.get(this.backToPostsList).first().click()
            cy.wait(1000)
            cy.screenshot(this.path + this.scenario + this.sNumber + '-7')
            cy.get('.gh-btn-red span').contains('Leave').click({ force: true })
            
            cy.get(this.postEntry).first().should("contain.text", '(Untitled)');
            cy.screenshot(this.path + this.scenario + this.sNumber + '-8')
            this.sNumber++
        }
    }

    clickPostSettings(){
        cy.get('button.post-settings').click();
        cy.wait(1000);
    }
q
    checkTagOptionExist(tagName){
        cy.get('label').contains('Tags').next().click();
        cy.wait(1000);
        cy.get('li.ember-power-select-option').contains(tagName).should('exist')
    }
}
