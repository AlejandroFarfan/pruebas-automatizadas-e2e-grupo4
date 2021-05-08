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

    it('Create new Tag', () => {
        let newTagName = faker.name.firstName()
        tagPage.createTag(newTagName);
        post.goToPostsSection();
        post.clickNewPost();
        post.clickPostSettings();
        post.checkTagOptionExist(newTagName)
    })
})