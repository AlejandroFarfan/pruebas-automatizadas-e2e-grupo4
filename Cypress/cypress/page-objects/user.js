export class UserPage {
    userMenuButton = 'span[title="' + Cypress.config('ghostAdminUser') + '"]'
    userProfileInputName='input[placeholder="Full Name"]'

    clickOnUserMenu() {
        cy.get(this.userMenuButton).click()
        cy.wait(1000)
    }

    clickOnUserProfile() {
        cy.get('li>a').contains('Your Profile').click()
        cy.wait(1000)
    }

    updateUserName(name){
        cy.get(this.userProfileInputName).clear({ force: true }).type(name, { force: true })
    }

    clickOnUserProfileSave(){
        cy.get('button>span').contains('Save').click();
        cy.wait(1000)
    }
}