import { faker } from '@faker-js/faker';

describe('User Registration & Session Handling', () => {

  const userEmail = 'abc@example.com'; // Hardcoded email for testing

  // Function to handle registration and retry if email is taken
  const registerWithRandomEmail = () => {
    const randomName = faker.name.fullName();
    const randomEmail = faker.internet.email();
    const randomPassword = faker.internet.password();

    // Visit the website
    cy.visit('https://automationexercise.com/');

    // Click on the "Signup / Login" button
    cy.get("a[href='/login']").click();

    // Fill in the registration form
    cy.get("input[placeholder='Name']").clear().type(randomName);
    cy.get("input[data-qa='signup-email']").clear().type(randomEmail);
    cy.get("button[data-qa='signup-button']").click();

    // Check if email is unique or if the email already exists
    cy.get('body').then(($body) => {
      if ($body.text().includes('Email Address already exist!')) {
        cy.log('⚠️ Email already exists. Retrying with a new one...');

        // If duplicate email is detected, retry with a predefined 'used' email
    cy.get("input[data-qa='signup-email']").clear().type(userEmail);
    cy.get("button[data-qa='signup-button']").click();      
  } else {
        cy.log('Registration successful with email: ${randomEmail}');
       
      }
    });
  };

  it('Registers a new user and stores session if email is unique', () => {
    registerWithRandomEmail(); // Call the registration function
  });
});
