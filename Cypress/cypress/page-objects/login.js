/// <reference types="cypress" />
import * as faker from 'faker'

export class Login {
    url = Cypress.config('ghostUrl')
    email = Cypress.config('ghostAdminUser')
    password = Cypress.config('ghostAdminPwd')
    path = Cypress.config('ghostUnderTest')+'/'

    login(valid, screenshot = false) {
        cy.visit(this.url + "#/signin")
        cy.wait(1000)
        let scenario = valid ? "login-valid-" : "login-invalid-"
        screenshot ? cy.screenshot(this.path + scenario + "1") : undefined
        cy.get('form').within(() => {
            let email = valid ? this.email : faker.internet.email()
            let password = valid ? this.password : faker.internet.password()

            cy.get('input[name="identification"]').type(email)
            screenshot ? cy.screenshot(this.path + scenario + "2") : undefined

            cy.get('input[name="password"]').type(password)
            screenshot ? cy.screenshot(this.path + scenario + "3") : undefined

            cy.get('button.login').click()
        })
        cy.wait(1000)
        if (!valid) {
            cy.get('.main-error').contains('Access denied.')
            screenshot ? cy.screenshot(this.path + scenario + "4") : undefined
        }
        else {
            cy.get('.gh-user-email').contains(this.email)
            screenshot ? cy.screenshot(this.path + scenario + "4") : undefined
        }
        this.step++
    }
}
