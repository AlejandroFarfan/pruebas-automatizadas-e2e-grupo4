/// <reference types="cypress" />

import { Login } from "../page-objects/login"

const login = new Login()

describe('Testing admin user login', () => {
    it('Test invalid login', () => {
        login.login(false)
    })
    it('Test valid login', () => {
        login.login(true)
    })
})