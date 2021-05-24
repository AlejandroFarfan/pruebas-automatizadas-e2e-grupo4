import * as faker from "faker";

export class TagPage {
    inputName = 'input[name="name"]'
    inputDescription = 'textarea[name="description"]'
    inputSlug = 'input[name="slug"]'
    inputColor = 'input[name="accent-color"]'
    tagWebURL = '.ghost-url-preview'
    tagWebTitle = '.site-title'
    tatagWebDescription = '.site-description'
    tagDataPool;
    tagDynamicPool = [];
    url = Cypress.config('ghostUrl')

    initDataPools() {
        cy.fixture('tag-data').then((data) => {
            this.tagDataPool = data;
        })

        for (let i = 0; i < 100; i++) {
            this.tagDynamicPool.push({
                words: faker.lorem.words(2),
                slug: faker.lorem.slug(2),
                hexaDecimal: faker.datatype.hexaDecimal(6).slice(2)
            })
        }
    }

    goToTagList() {
        cy.visit(this.url + "#/tags")
        cy.wait(2000)
    }

    clickOnNewTag() {
        cy.get('a>span').contains('New tag').click()
    }

    clickOnTagWithPost() {
        cy.get('a[href*="?tag="]').next().click({ force: true })
        cy.wait(1000);
    }

    clickOnTagWithNoPost() {
        cy.get('.tags-list .gh-tag-list-posts-count[href*="/tags/"]').first().next().click({ force: true })
        cy.wait(1000);
    }

    setTagName(tagName) {
        cy.get(this.inputName).clear({ force: true }).type(tagName, { force: true })
    }

    setTagDescription(tagDescription) {
        cy.get(this.inputDescription).clear({ force: true }).type(tagDescription, { force: true })
    }

    setTagSlug(tagSlug) {
        cy.get(this.inputSlug).clear({ force: true }).type(tagSlug, { force: true })
    }

    setTagColor(tagColor) {
        cy.get(this.inputColor).clear({ force: true }).type(tagColor, { force: true })
    }

    clickOnSaveTag() {
        cy.get('button>span').contains('Save').click().wait(400)
    }

    getTagWeb() {
        return cy.get(this.tagWebURL).invoke('text')
    }

    checkTagWebSiteTitle(name) {
        cy.get(this.tagWebTitle).contains(name).should('exist')
    }

    checkTagWebSiteDescription(description) {
        cy.get(this.tatagWebDescription).contains(description).should('exist')
    }

    getTagNameValue() {
        return cy.get(this.inputName).invoke('val')
    }

    clickOnDeleteTag() {
        cy.get('button>span').contains('Delete tag').click({ force: true }).wait(2000)
    }

    clickOnConfirmDelete() {
        cy.get('.modal-footer>button>span').contains('Delete').click({ force: true })
    }

    checkTagIsNotInList(tagName) {
        cy.get('h3.gh-tag-list-name').contains(tagName).should('not.exist')
    }

    clickOnInternalTab() {
        cy.get('button>span').contains('Internal tags').click()
        cy.wait(1000)
    }

    checkTagOnList(name) {
        cy.get('h3.gh-tag-list-name').contains(name).should('exist')
    }

    checkSaved(positive) {
        cy.get('button>span').contains('Retry').should(positive ? 'not.exist' : 'exist')
    }

    fillForm(config) {
        Object.keys(config).forEach(formField => {
            var value = this.getRandomValue(config[formField])
            switch (formField) {
                case 'name':
                    this.setTagName(value)
                    break;
                case 'description':
                    this.setTagDescription(value)
                    break;
                case 'slug':
                    this.setTagSlug(value)
                    break;
                case 'color':
                    this.setTagColor(value)
                    break;
            }
            cy.wait(100)
        })
    }

    getRandomValue(config) {
        cy.log(config.type, config.source)
        if (config.source == 'random')
            switch (config.type) {
                case 'words':
                    return faker.lorem.words(config.length)
                case 'slug':
                    return faker.lorem.slug(config.length)
                case 'hexaDecimal':
                    return faker.datatype.hexaDecimal(config.length).slice(2)
            }
        if (config.source == 'data-pool')
            return this.tagDataPool[Math.floor(Math.random() * 1001)][config.type]
        if (config.source == 'dynamic-pool')
            return this.tagDataPool[Math.floor(Math.random() * 1001)][config.type]
    }
}