/// <reference types="cypress" />

import { Login } from "../page-objects/login"
import { Post } from "../page-objects/post"

const login = new Login()
const post = new Post()

describe('Testing posts creation', () => {
    beforeEach(()=>{
        login.login(true)
        post.goToPostsSection(true)
    })
    it('Attempt to create post without contents', () => {
        post.createPostWithNoContents()
    })
    it('Create unpublished untitled post', () => {
        post.createPostUntitled()
    })
    it('Edit post with invalid title length and try to publish it', () => {
        post.editFirstPost(false)
    })
    it('Edit post with valid title and publish it', () => {
        post.editFirstPost(true)
    })
})