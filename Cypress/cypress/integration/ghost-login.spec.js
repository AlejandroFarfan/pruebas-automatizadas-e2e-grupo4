/// <reference types="cypress" />

import { Login } from "../page-objects/login"
import { UserPage } from "../page-objects/user"
import * as faker from "faker";

const login = new Login()
const userPage = new UserPage()
const path = Cypress.config('ghostUnderTest') + '/'

describe('Testing admin user login', () => {
    it('Test invalid login', () => {
        login.login(false, true)
    })

    it('Test valid login', () => {
        login.login(true, true)
    })

    it('update user name', () => {
        login.login(true);
        userPage.clickOnUserMenu();
        cy.screenshot(path + "update-user-name-1")
        userPage.clickOnUserProfile();
        cy.screenshot(path + "update-user-name-2")
        userPage.updateUserName(faker.name.findName());
        cy.screenshot(path + "update-user-name-3")
        userPage.clickOnUserProfileSave()
        cy.screenshot(path + "update-user-name-4")
    })
})