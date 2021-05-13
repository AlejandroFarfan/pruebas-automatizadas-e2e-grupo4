import { Login } from "../page-objects/login";
import { TagPage } from "../page-objects/tag";
import { Post } from "../page-objects/post";
import * as faker from "faker";

describe('Tags E2E testing', () => {
    const login = new Login()
    const tagPage = new TagPage()
    const post = new Post()
    const url = Cypress.config('ghostUrl')

    beforeEach(() => {
        // cy.setResolution([2560, 1440]);
        login.login(true)
        tagPage.goToTagList()
    })

    it('New Tag should be visible on post settings', () => {
        cy.screenshot('scenario1').wait(1000)
        tagPage.clickOnNewTag();
        cy.screenshot('scenario1').wait(1000)
        const newTagName = faker.name.firstName()
        tagPage.setTagName(newTagName);
        cy.screenshot('scenario1').wait(1000)
        tagPage.clickOnSaveTag();
        cy.screenshot('scenario1').wait(1000)
        cy.visit(url + "#/tags").wait(2000)
        cy.screenshot('scenario1').wait(1000)
        post.goToPostsSection();
        cy.screenshot('scenario1').wait(1000)
        post.clickNewPost();
        cy.screenshot('scenario1').wait(1000)
        post.clickPostSettings();
        cy.screenshot('scenario1', { capture: 'viewport' }).wait(1000)
        post.checkTagOptionExist(newTagName)
        cy.screenshot('scenario1', { capture: 'viewport' }).wait(1000)
    })

    it('Tag updates should be visible on webSite', () => {
        const newTagName = faker.name.firstName();
        const newTagDescription = faker.commerce.productDescription();
        tagPage.clickOnTagWithPost()
        tagPage.setTagName(newTagName)
        tagPage.setTagDescription(newTagDescription)
        tagPage.updateAndGoToWebSite();
        tagPage.checkTagWebSiteTitle(newTagName)
        tagPage.checkTagWebSiteDescription(newTagDescription)
    })

    it('Deleted tag shoud not be on tagList', () => {
        tagPage.clickOnTagWithNoPost();
        tagPage.deleteTagAndCheckIsNotInList();
    })

    it('internal tags should start by #', () => {
        const newTagName = '#' + faker.name.firstName();
        tagPage.createTag(newTagName);
        tagPage.clickOnInternalTab();
        tagPage.checkTagOnList(newTagName)
    })
})