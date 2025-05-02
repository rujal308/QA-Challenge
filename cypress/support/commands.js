// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import { faker } from '@faker-js/faker';

Cypress.Commands.add('registerAndLogin', () => {
  const randomName = faker.person.fullName();
  const randomEmail = faker.internet.email();
  const randomPassword = faker.internet.password();

  cy.visit('https://automationexercise.com/');
  cy.get("a[href='/login']").click();

  cy.get("input[placeholder='Name']").type(randomName);
  cy.get("input[data-qa='signup-email']").type(randomEmail);
  cy.get("button[data-qa='signup-button']").click();

  cy.get('body').then(($body) => {
    if ($body.text().includes('Email Address already exist!')) {
      const newEmail = faker.internet.email();
      cy.get("input[placeholder='Name']").clear().type(randomName);
      cy.get("input[data-qa='signup-email']").clear().type(newEmail);
      cy.get("button[data-qa='signup-button']").click();
    }
  });

  cy.get('#id_gender2').check();
  cy.get('#password').type(randomPassword);
  cy.get('#days').select('10');
  cy.get('#months').select('May');
  cy.get('#years').select('1995');
  cy.get('#newsletter').check();
  cy.get('#optin').check();
  cy.get('#first_name').type('Rita');
  cy.get('#last_name').type('Dahal');
  cy.get('#company').type('Intuji');
  cy.get('#address1').type('Balkumari, Lalitpur');
  cy.get('#country').select('India');
  cy.get('#state').type('Bagmati');
  cy.get('#city').type('Kathmandu');
  cy.get('#zipcode').type('44600');
  cy.get('#mobile_number').type('9800000000');
  cy.get("button[data-qa='create-account']").click();
  cy.contains('Account Created!').should('be.visible');
  cy.get("a[data-qa='continue-button']").click();

  // Save credentials
  cy.writeFile('cypress/fixtures/user.json', {
    randomEmail,
    randomPassword,
  });
});
