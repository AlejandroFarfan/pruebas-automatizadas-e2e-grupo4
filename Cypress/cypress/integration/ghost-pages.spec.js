/// <reference types="cypress" />

import { Login } from "../page-objects/login"
import {Page} from "../page-objects/page";

const login = new Login()
const page = new Page()

describe('Testing Pages creation', () => {
    beforeEach(()=>{
        login.login(true)
        page.goToPagesSection()
    })
    it('Attempt to create page without content', () => {
        page.createPageWithNoContent()
    })

    it('Create and published page', () => {
        page.createPagePublished()
    })

    it('Edit first created page', () => {
        page.editFirstPage()
    })

    it('Delete publish page', () => {
        page.deletePublishedPage()
    })

})
