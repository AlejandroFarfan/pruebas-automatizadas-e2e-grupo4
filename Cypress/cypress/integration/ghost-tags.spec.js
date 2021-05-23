import { Login } from "../page-objects/login";
import { TagPage } from "../page-objects/tag";
import { Post } from "../page-objects/post";
import * as faker from "faker";

describe('Tags E2E testing', () => {
    const login = new Login()
    const tagPage = new TagPage()
    const scenarios = [
        {
            color: { type: 'hexaDecimal', length: 6, source: 'random' },
            positive: false
        },
        {
            slug: { type: 'slug', length: 2, source: 'random' },
            positive: false
        },
        {
            description: { type: 'words', length: 10, source: 'random' },
            positive: false
        },
        {
            name: { type: 'words', source: 'data-pool' },
            positive: true
        },
        {
            name: { type: 'words', source: 'dynamic-pool' },
            color: { type: 'hexaDecimal', source: 'dynamic-pool' },
            slug: { type: 'slug', source: 'dynamic-pool' },
            description: { type: 'words', source: 'dynamic-pool' },
            positive: true
        },
        {
            name: { type: 'words',length:80, source: 'random' },
            positive: false
        },
        {
            name: { type: 'words', length: 2, source: 'random' },
            color: {  type: 'words', length: 1, source: 'random' },
            positive: false
        },
        {
            name: { type: 'words', length: 2, source: 'random' },
            color: {  type: 'hexaDecimal', length: 5, source: 'random' },
            positive: false
        },
        {
            name: { type: 'words', length: 2, source: 'random' },
            color: {  type: 'hexaDecimal', length: 7, source: 'random' },
            positive: true
        },
        {
            name: { type: 'words', length: 2, source: 'random' },
            color: {  type: 'hexaDecimal', length: 6, source: 'random' },
            positive: true
        },
        {
            name: { type: 'words', length: 2, source: 'random' },
            slug: {  type: 'slug', length: 80, source: 'random' },
            positive: false
        },
        {
            name: { type: 'words', length: 2, source: 'random' },
            slug: {  type: 'slug', length: 2, source: 'random' },
            positive: true
        },
        {
            name: { type: 'words', length: 2, source: 'random' },
            slug: {  type: 'words', length: 2, source: 'random' },
            positive: true
        },
        {
            name: { type: 'words', length: 2, source: 'random' },
            color: {  type: 'hexaDecimal', length: 6, source: 'random' },
            slug: {  type: 'slug', length: 2, source: 'random' },
            positive: true
        },
        {
            name: { type: 'words', length: 2, source: 'random' },
            description: {  type: 'words', length: 80, source: 'random' },
            positive: false
        },
        {
            name: { type: 'words', length: 2, source: 'random' },
            description: {  type: 'words', length: 10, source: 'random' },
            positive: true
        },
        {
            name: { type: 'words', length: 2, source: 'random' },
            color: {  type: 'hexaDecimal', length: 6, source: 'random' },
            description: {  type: 'words', length: 10, source: 'random' },
            positive: true
        },
        {
            name: { type: 'words', length: 2, source: 'random' },
            description: {  type: 'words', length: 10, source: 'random' },
            slug: {  type: 'slug', length: 2, source: 'random' },
            positive: true
        },
        {
            name: { type: 'words', length: 80, source: 'random' },
            color: {  type: 'words', length: 1, source: 'random' },
            positive: false
        },
        {
            name: { type: 'words', length: 80, source: 'random' },
            color: {  type: 'hexaDecimal', length: 5, source: 'random' },
            positive: false
        },
        {
            name: { type: 'words', length: 80, source: 'random' },
            color: {  type: 'hexaDecimal', length: 7, source: 'random' },
            positive: false
        },
        {
            name: { type: 'words', length: 80, source: 'random' },
            color: {  type: 'hexaDecimal', length: 6, source: 'random' },
            positive: false
        },
        {
            name: { type: 'words', length: 80, source: 'random' },
            slug: {  type: 'slug', length: 80, source: 'random' },
            positive: false
        },
        {
            name: { type: 'words', length: 80, source: 'random' },
            slug: {  type: 'slug', length: 2, source: 'random' },
            positive: false
        },
        {
            name: { type: 'words', length: 80, source: 'random' },
            slug: {  type: 'words', length: 2, source: 'random' },
            positive: false
        },
        {
            name: { type: 'words', length: 80, source: 'random' },
            color: {  type: 'hexaDecimal', length: 6, source: 'random' },
            slug: {  type: 'slug', length: 2, source: 'random' },
            positive: false
        },
        {
            name: { type: 'words', length: 80, source: 'random' },
            description: {  type: 'words', length: 80, source: 'random' },
            positive: false
        },
        {
            name: { type: 'words', length: 80, source: 'random' },
            description: {  type: 'words', length: 10, source: 'random' },
            positive: false
        },
        {
            name: { type: 'words', length: 80, source: 'random' },
            color: {  type: 'hexaDecimal', length: 6, source: 'random' },
            description: {  type: 'words', length: 10, source: 'random' },
            positive: false
        },
        {
            name: { type: 'words', length: 80, source: 'random' },
            description: {  type: 'words', length: 10, source: 'random' },
            slug: {  type: 'slug', length: 2, source: 'random' },
            positive: false
        },
    ]

    before(() => {
        tagPage.initDataPools();
        login.login(true)
        Cypress.Cookies.defaults({
            preserve: 'ghost-admin-api-session',
          })
    })

    beforeEach(() => {
        tagPage.goToTagList()
        tagPage.clickOnNewTag();
    })

    scenarios.forEach((scenario, index) => {
        it('tag form test ' + index, () => {
            tagPage.fillForm(scenario);
            tagPage.clickOnSaveTag();
            tagPage.checkSaved(scenario.positive);
        })
    })

    after(() => {
        cy.clearCookie('ghost-admin-api-session')
        cy.getCookies().should('be.empty')
    });

})
