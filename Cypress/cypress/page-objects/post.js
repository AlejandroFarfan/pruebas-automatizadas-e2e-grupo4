/// <reference types="cypress" />
import * as faker from 'faker'

export class Post {
    postTitle = 'textarea[placeholder="Post Title"]'
    backToPostsList = 'a[href="#/posts/"]'
    postPage = 'a[href="#/site/"]'

    goToPostsCreation() {
        cy.get('.gh-nav-list-new a').first().click()
        cy.get('.gh-btn').click()
    }

    createPostWithNoContents() {
        this.goToPostsCreation()
        cy.get(this.backToPostsList).first().click()
        cy.get('.gh-content-entry-title').first().should('not.have.text', '(Untitled)')

        this.goToPostsCreation()
        cy.get(this.postTitle).click()
        cy.get(this.backToPostsList).first().click()
        cy.get('.gh-content-entry-title').first().should('have.text', '(Untitled)')
        cy.get(this.postPage).first().click()
        cy.get('.post-card').first().get('h2 .post-card-title').should('not.have.text', '(Untitled)')
    }

    createPostWithContents(valid) {
        let title = valid ? faker.lorem.text() : ''
        cy.get('.gh-nav-list-new a').first().click()
        cy.get('.gh-btn').click()
        cy.get('textarea[placeholder="Post Title"]').type(title)
        cy.get('a[href="#/posts/"]').click()
        cy.get('.gh-content-entry-title').first().should('have.text',"Welcome to Ghost")
        // cy.get('.koenig-editor__editor').click().type(paragraph).type(paragraph)
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

}
