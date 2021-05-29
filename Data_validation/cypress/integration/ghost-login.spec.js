/// <reference types="cypress" />

import { Login } from "../page-objects/login"
import { UserPage } from "../page-objects/user"
import * as faker from "faker";

const login = new Login()
const userPage = new UserPage()

describe('Testing admin user login', () => {
    it('Test invalid login', () => {
        login.login(false)
    })

    it('Test valid login', () => {
        login.login(true)
    })

    after(() => {
        cy.clearCookie('ghost-admin-api-session')
        cy.getCookies().should('be.empty')
    });
})