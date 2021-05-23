/// <reference types="cypress" />

import { Login } from "../page-objects/login"
import { Post } from "../page-objects/post"
import * as faker from 'faker'

const login = new Login()
const post = new Post()
var pool;
var bigTitles = [];

describe('Testing posts creation', () => {
    before(() => {
        cy.fixture('postFixture').then((data) => {
            pool = data;
        })
        login.login(true)
        Cypress.Cookies.defaults({
            preserve: 'ghost-admin-api-session',
          })
        for (let i = 0; i < 10; i++) {
            bigTitles.push(faker.lorem.word(6).repeat(faker.datatype.number(20)))
            if(bigTitles[i] === "")
            {
                bigTitles[i] = faker.lorem.word(6)
            }
        }
    })
    beforeEach(()=>{
        post.goToPostsSection()
    })
    for (let i = 1; i < 11; i++) {
        it(`Create draft posts with naughty titles ${i}`, () => {
            post.createPostWithTitle(pool.titles, i)
        })
    }
    for (let i = 1; i < 11; i++) {
        it(`Create and publish posts with large words without spaces ${i}`, () => {
            post.createPostWithLargeTitles(bigTitles[i-1], i)
        })
    }
    for (let i = 1; i < 11; i++) {
        it(`Edit post with random title length and try to publish it ${i}`, () => {
            post.editFirstPost()
        })
    }
    after(() => {
        cy.clearCookie('ghost-admin-api-session')
        cy.getCookies().should('be.empty')
    });
})