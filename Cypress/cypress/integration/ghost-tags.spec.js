import { Login } from "../page-objects/login";
import { TagPage } from "../page-objects/tag";
import { Post } from "../page-objects/post";
import * as faker from "faker";

describe('Tags E2E testing', () => {
    const login = new Login()
    const tagPage = new TagPage()
    const post = new Post()
    const url = Cypress.config('ghostUrl')
    const screenPath = Cypress.config('ghostUnderTest') + '/tag-'

    beforeEach(() => {
        login.login(true)
        tagPage.goToTagList()
    })

    it('New Tag should be visible on post settings', () => {
        let step = 0;
        cy.screenshot(screenPath + 'scenario1_step' + step++).wait(1000)
        tagPage.clickOnNewTag();
        cy.screenshot(screenPath + 'scenario1_step' + step++).wait(1000)
        const newTagName = faker.name.firstName()
        tagPage.setTagName(newTagName);
        cy.screenshot(screenPath + 'scenario1_step' + step++).wait(1000)
        tagPage.clickOnSaveTag();
        cy.screenshot(screenPath + 'scenario1_step' + step++).wait(1000)
        cy.visit(url + "#/tags").wait(2000)
        cy.screenshot(screenPath + 'scenario1_step' + step++).wait(1000)
        cy.get('.gh-nav-list-new a').first().click()
        cy.wait(1000)
        cy.screenshot(screenPath + 'scenario1_step' + step++).wait(1000)
        post.clickNewPost();
        cy.screenshot(screenPath + 'scenario1_step' + step++).wait(1000)
        post.clickPostSettings();
        cy.screenshot(screenPath + 'scenario1_step' + step++, { capture: 'viewport' }).wait(1000)
        post.checkTagOptionExist(newTagName)
        cy.screenshot(screenPath + 'scenario1_step' + step++, { capture: 'viewport' }).wait(1000)
    })

    it('Tag updates should be visible on webSite', () => {
        let step = 0;
        cy.screenshot(screenPath + 'scenario2_step' + step++).wait(1000);
        const newTagName = faker.name.firstName();
        const newTagDescription = faker.commerce.productDescription();
        tagPage.clickOnTagWithPost()
        cy.screenshot(screenPath + 'scenario2_step' + step++).wait(1000)
        tagPage.setTagName(newTagName)
        cy.screenshot(screenPath + 'scenario2_step' + step++).wait(1000)
        tagPage.setTagDescription(newTagDescription)
        cy.screenshot(screenPath + 'scenario2_step' + step++).wait(1000)
        tagPage.getTagWeb().then(urlText => {
            tagPage.clickOnSaveTag()
            cy.screenshot(screenPath + 'scenario2_step' + step++).wait(1000)
            cy.visit(urlText).wait(2000)
            cy.screenshot(screenPath + 'scenario2_step' + step++, { capture: 'viewport' }).wait(1000)
            tagPage.checkTagWebSiteTitle(newTagName)
            tagPage.checkTagWebSiteDescription(newTagDescription)
        })
    })

    it('Deleted tag shoud not be on tagList', () => {
        let step = 0;
        cy.screenshot(screenPath + 'scenario3_step' + step++).wait(1000);
        tagPage.clickOnTagWithNoPost();
        cy.screenshot(screenPath + 'scenario3_step' + step++).wait(1000);
        tagPage.getTagNameValue().then(tagName => {
            tagPage.clickOnDeleteTag();
            cy.screenshot(screenPath + 'scenario3_step' + step++).wait(1000);
            tagPage.clickOnConfirmDelete();
            cy.screenshot(screenPath + 'scenario3_step' + step++).wait(1000);
            tagPage.goToTagList();
            cy.screenshot(screenPath + 'scenario3_step' + step++).wait(1000);
            tagPage.checkTagIsNotInList(tagName)
        })
    })

    it('internal tags should start by #', () => {
        let step = 0;
        cy.screenshot(screenPath + 'scenario4_step' + step++).wait(1000);
        tagPage.clickOnNewTag();
        cy.screenshot(screenPath + 'scenario4_step' + step++).wait(1000)
        const newTagName = '#' + faker.name.firstName();
        tagPage.setTagName(newTagName);
        cy.screenshot(screenPath + 'scenario4_step' + step++).wait(1000)
        tagPage.clickOnSaveTag();
        cy.screenshot(screenPath + 'scenario4_step' + step++).wait(1000)
        cy.visit(url + "#/tags").wait(2000)
        cy.screenshot(screenPath + 'scenario4_step' + step++).wait(1000)
        tagPage.clickOnInternalTab();
        cy.screenshot(screenPath + 'scenario4_step' + step++).wait(1000)
        tagPage.checkTagOnList(newTagName)
    })
})