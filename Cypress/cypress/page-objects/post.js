/// <reference types="cypress" />
import * as faker from 'faker'

export class Post {
    adminUrl = Cypress.config('ghostUrl')
    publicSite = Cypress.config('ghostUrl').split('ghost/')[0]
    postTitle = 'textarea[placeholder="Post Title"]'
    backToPostsList = 'a[href="#/posts/"]'
    postEntry = '.gh-content-entry-title'
    postCardTitle = 'h2.post-card-title'

    goToPostsSection() {
        cy.get('.gh-nav-list-new a').first().click()
    }

    getAndVisitUrl(selector) {
        cy.get(selector).first().invoke('attr', 'href').then(href => {
            cy.visit(this.adminUrl + href);
        });
    }

    clickNewPost() {
        cy.get('.gh-btn').click()
    }

    createPostWithNoContents() {
        this.clickNewPost()
        cy.get(this.backToPostsList).first().click()
        //verify that empty post has not been created
        cy.get(this.postEntry).first().should('not.contain.text', '(Untitled)')
    }

    createPostUntitled() {
        this.clickNewPost()
        cy.get(this.postTitle).click()
        cy.get(this.backToPostsList).first().click()
        cy.get(this.postEntry).first().should("contain.text", '(Untitled)');

        //verify that untitled post is unpublished
        cy.visit(this.publicSite)
        cy.get(this.postCardTitle).first().should('not.contain.text', '(Untitled)')
    }

    editFirstPost(valid) {
        let title = valid ? faker.lorem.sentence(10) : faker.lorem.sentence(100)
        this.getAndVisitUrl('a[title="Edit this post"]')
        cy.get('textarea[placeholder="Post Title"]').clear().type(title)
        cy.get('.koenig-editor__editor').type(faker.lorem.paragraph() + '{enter}').type(faker.lorem.paragraph())
        cy.get('div.gh-publishmenu.ember-view').first().click()
        cy.get('.gh-publishmenu-button').first().click()

        if (valid) {
            cy.get('.gh-notifications').should('be.visible')
            cy.visit(this.publicSite)
            cy.get(this.postCardTitle).first().should('contain.text', title)
            
        } else {
            cy.get('aside.gh-alerts.ember-view').should('be.visible').should('contain.text', 'Saving failed: Title cannot be longer than 255 characters.')
            cy.get(this.backToPostsList).first().click()
            cy.get('.gh-btn-red span').contains('Leave').click()
            cy.get(this.postEntry).first().should("contain.text", '(Untitled)');
        }
        
    }

    addBookmark(valid) {
        // let url = 'https://docs.cypress.io'
        // let bookmarkUrl = valid ? url : faker.internet.url()
        // cy.get('.koenig-plus-menu-button').click()
        // cy.get('.f-supersmall').contains('Bookmark').click()
        // cy.get('input[name="url"]').type(bookmarkUrl).type({enter})
        // cy.wait(2000)

        // if (!valid) {
        //     cy.get('span.mr3').contains('There was an error when parsing the URL.')
        //     cy.get('data-ember-action-1619').click()
        //     cy.get('input[name="url"]').type({selectall} + url)
        // }

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
