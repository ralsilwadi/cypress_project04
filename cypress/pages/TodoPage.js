/// <reference types="cypress" />

class ToDoPage {

  // Locators
  getToDoAppModalTitle() {
    return cy.get('.panel-heading')
  }

  getNewToDoInputField() {
    return cy.get('#input-add')
  }

  getAddButton() {
    return cy.get('#add-btn')
  }

  getEmptyTaskList() {
    return cy.get('.todo-item > p')
  }

  getListItems() {
    return cy.get('#panel').children()
  }

  getSpecificListItem(index) {
    return this.getListItems().eq(index)
  }

  getListIcons() {
    return cy.get('.mr-auto .panel-icon')
  }

  getSpecificListIcon(index) {
    return this.getListIcons().eq(index)
  }

  getClearButton() {
    return cy.get('#clear')
  }

  getSearchBar() {
    return cy.get('#search')
  }

  getErrorMessage() {
    return cy.get('.notification')
  }

  // Methods
  typeAndEnterNewTask(message) {
    this.getNewToDoInputField().clear().type(`${message}{enter}`)
  }

  toggleListIcon(index) {
    this.getSpecificListIcon(index).click()
  }

  clickClearButton() {
    this.getClearButton().click()
  }

  typeInSearchBar(input) {
    this.getSearchBar().clear().type(`${input}{enter}`)
  }
}

export default ToDoPage;