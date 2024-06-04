/// <reference types="cypress" />

import ToDoPage from "../../pages/ToDoPage";

const toDoPage = new ToDoPage();

describe('ToDo List Form Tests', () => {

  const messages = [`1`, `2`, `3`, `4`, `5`]

  const validateListIsEmpty = () => {
    toDoPage
      .getEmptyTaskList()
      .should("have.text", "No tasks found!")
      .and("have.length", 1);
  }

  const fillMessages = () => {
    messages.forEach((elem, index) => {
      toDoPage.typeAndEnterNewTask(elem)
      toDoPage.getSpecificListItem(index).should('have.text', elem)
    })
  }

  const addTask = (task) => {
    toDoPage.typeAndEnterNewTask(task);
    toDoPage.getSpecificListItem(0).should('have.text', task);
  };

  it("Test Case 01 - Todo-App Modal Verification", () => {
    toDoPage.getToDoAppModalTitle().should("have.text", "My Tasks");
    toDoPage.getNewToDoInputField().should("be.enabled");
    toDoPage.getAddButton().should("be.enabled");
    toDoPage.getSearchBar().should("be.enabled");
    validateListIsEmpty();
  });

  it('Test Case 02 - Single Task Addition and Removal', () => {
    addTask(messages[0]);
    toDoPage.getListItems().should('have.length', 1);
    toDoPage.toggleListIcon(0);
    toDoPage.getSpecificListIcon(0).should('have.attr', 'class', 'panel-icon has-text-success');
    toDoPage.clickClearButton();
    validateListIsEmpty();
  });

  it('Test Case 03 - Multiple Task Operations', () => {
    fillMessages();
    messages.forEach((_, index) => toDoPage.toggleListIcon(index));
    toDoPage.clickClearButton();
    validateListIsEmpty();
  });

  it('Test Case 04 - Search and Filter Functionality in todo App', () => {
    fillMessages();
    const lastMessage = messages[messages.length - 1];
    toDoPage.typeInSearchBar(lastMessage);
    toDoPage.getListItems().should('have.length', 1).and('have.text', lastMessage);
  });

  it('Test Case 05 - Task Validation and Error Handling', () => {
    toDoPage.typeAndEnterNewTask('');
    validateListIsEmpty();
    toDoPage.typeAndEnterNewTask('1234567890123456789012345678901234567890');
    toDoPage.getErrorMessage().should('have.text', 'Error: Todo cannot be more than 30 characters!');
    
    addTask(messages[0]);
    toDoPage.getListItems().should('have.length', 1);
    toDoPage.typeAndEnterNewTask(messages[0]);
    toDoPage.getErrorMessage().should('have.text', `Error: You already have ${messages[0]} in your todo list.`);
  });

});