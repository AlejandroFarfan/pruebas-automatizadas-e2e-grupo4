/// <reference types="cypress" />
import * as faker from 'faker'

export class Login {
    url = Cypress.config('ghostUrl')
    email = Cypress.config('ghostAdminUser')
    password = Cypress.config('ghostAdminPwd')

    login(valid) {
        cy.clearCookie('ghost-admin-api-session')
        cy.visit(this.url + "#/signin")
        cy.wait(1000)
        cy.get('form').within(() => {
            let email = valid ? this.email : faker.internet.email()
            let password = valid ? this.password : faker.internet.password()
            cy.get('input[name="identification"]').type(email)
            cy.get('input[name="password"]').type(password)
            cy.get('button.login').click()
        })
        cy.wait(1000)
        if (!valid) {
            cy.get('.main-error').contains('There is no user with that email address.')
        }
        else {
            cy.get('.gh-user-email').contains(this.email)
        }
    }
}
