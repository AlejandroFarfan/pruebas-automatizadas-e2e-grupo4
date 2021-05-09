import { Login } from "../page-objects/login";
import { TagPage } from "../page-objects/tag";
import { Post } from "../page-objects/post";
import * as faker from "faker";

describe('Tags E2E testing', () => {
    const login = new Login()
    const tagPage = new TagPage()
    const post = new Post()

    beforeEach(() => {
        login.login(true)
        tagPage.goToTagList()
    })

    it('New Tag should be visible on post settings', () => {
        const newTagName = faker.name.firstName()
        tagPage.createTag(newTagName);
        post.goToPostsSection();
        post.clickNewPost();
        post.clickPostSettings();
        post.checkTagOptionExist(newTagName)
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