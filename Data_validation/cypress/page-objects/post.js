/// <reference types="cypress" />
import * as faker from 'faker'

export class Post {
    adminUrl = Cypress.config('ghostUrl')
    publicSite = Cypress.config('ghostUrl').split('ghost/')[0]
    postTitle = 'textarea[placeholder="Post Title"]'
    postBody = '.koenig-editor__editor'
    publishMenu = 'div.gh-publishmenu.ember-view'
    publishButton = '.gh-publishmenu-button'
    backToPostsList = 'a[href="#/posts/"]'
    postEntry = '.gh-content-entry-title'
    postCardTitle = 'h2.post-card-title'
    publishedPostsLits = '#/posts/?type=published'

    goToPostsSection() {
        cy.get('.gh-nav-list-new a').first().click()
        cy.wait(1000)
    }

    getAndVisitUrl(selector) {
        cy.get(selector).first().invoke('attr', 'href').then(href => {
            cy.visit(this.adminUrl + href);
        });
    }

    clickNewPost() {
        cy.get('.gh-btn').first().click()
    }

    createPostWithTitle(testData, index) {
        let title = faker.random.arrayElement(testData)
        this.clickNewPost()
        cy.get(this.postTitle).type(title)
        cy.wait(2000)
        cy.get(this.backToPostsList).first().click()
        cy.wait(2000)
        if (index > 1) {
            cy.get('.gh-btn span').contains('Stay').click({ force: true })
        }
        cy.get(this.backToPostsList).first().click()
        let postTitle = title === " " ? '(Untitled)' : title
        cy.get(this.postEntry).first().should('contain.text', postTitle)
        cy.get(this.postEntry).first().invoke('width').then(str => parseInt(str)).should('be.lt', 1370);
        
    }

    createPostWithLargeTitles(testData, index) {
        this.clickNewPost()
        cy.wait(1000)
        cy.get(this.postTitle).type(testData)
        cy.wait(2000)
        cy.get(this.backToPostsList).first().click()
        cy.wait(2000)
        if (index === 1) {
            cy.get('.gh-btn span').contains('Stay').click({ force: true })
        }
        cy.get(this.publishMenu).first().click()
        cy.wait(1000)
        cy.get(this.publishButton).first().click()
        cy.wait(1000)
        cy.get(this.backToPostsList).first().click()
        cy.wait(1000)
        cy.visit(this.adminUrl + this.publishedPostsLits);
        cy.get(this.postEntry).first().should('contain.text', testData)
        cy.get(this.postEntry).first().invoke('width').then(str => parseInt(str)).should('be.lt', 1490);
        cy.visit(this.adminUrl)
    }

    editFirstPost() {
        cy.get(this.postEntry).first().invoke('text').then(str => {
            let formerTitle = str
            let title = faker.lorem.sentence(faker.datatype.number(80))
            this.getAndVisitUrl('a[title="Edit this post"]')
            cy.wait(1000)
            cy.get(this.postTitle).clear().type(title)
            cy.wait(1000)
            cy.get(this.postBody).type(faker.lorem.paragraph() + '{enter}').type(faker.lorem.paragraph())
            cy.wait(1000)
            cy.get(this.publishMenu).first().click()
            cy.wait(1000)
            cy.get(this.publishButton).first().click()
            cy.wait(1000)
            if (title.length < 256) {
                cy.get('.gh-notifications').should('be.visible')
                cy.visit(this.publicSite)
                cy.get(this.postCardTitle).first().should('contain.text', title)
                cy.visit(this.adminUrl)
            } else {
                cy.get('aside.gh-alerts.ember-view').should('be.visible').should('contain.text', 'Saving failed: Title cannot be longer than 255 characters.')
                cy.get(this.backToPostsList).first().click()
                cy.wait(1000)
                cy.get('.gh-btn-red span').contains('Leave').click({ force: true })
                cy.get(this.postEntry).first().should("contain.text", formerTitle);
            }
        })
        
    }

    clickPostSettings(){
        cy.get('button.post-settings').click();
        cy.wait(1000);
    }

    checkTagOptionExist(tagName){
        cy.get('label').contains('Tags').next().click();
        cy.wait(1000);
        cy.get('li.ember-power-select-option').contains(tagName).should('exist')
    }
}
