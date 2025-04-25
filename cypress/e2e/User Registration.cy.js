import { faker } from '@faker-js/faker';

describe('User Registration & Session Handling', () => {
  let randomName;
  let randomEmail;
  let randomPassword;

  before(() => {
    // Generate user details
    randomName = faker.person.fullName();
    randomEmail = faker.internet.email();
    randomPassword = faker.internet.password();

    // Visit the site and go to signup page — only once
    cy.visit('https://automationexercise.com/');
    cy.get("a[href='/login']").click();
  });

  it('Registers a new user and handles duplicate email', () => {
    const trySignup = () => {
      cy.get("input[placeholder='Name']").clear().type(randomName);
      cy.get("input[data-qa='signup-email']").clear().type(randomEmail);
      cy.get("button[data-qa='signup-button']").click();

      cy.get('body').then(($body) => {
        if ($body.text().includes('Email Address already exist!')) {
          cy.log('Email already exists. Retrying with a new email');
          randomEmail = faker.internet.email(); // Generate a new email
          trySignup(); // Recursive retry
        } else {
          cy.log('Proceeding with full registration using: ' + randomEmail);
          fillFullRegistrationForm(); // Continue with full registration
        }
      });
    };

    const fillFullRegistrationForm = () => {
      // Select radio button for gender
      cy.get('#id_gender2').check();

      // Password
      cy.get('#password').type(randomPassword);

      // Date of birth dropdowns
      cy.get('#days').select('10');
      cy.get('#months').select('May');
      cy.get('#years').select('1995');

      // Optional checkboxes
      cy.get('#newsletter').check(); // Subscribe to newsletter
      cy.get('#optin').check(); // Receive offers

      // Personal details
      cy.get('#first_name').type('Rita');
      cy.get('#last_name').type('Dahal');
      cy.get('#company').type('Intuji');
      cy.get('#address1').type('Balkumari, Lalitpur');
      cy.get('#country').select('India');
      cy.get('#state').type('Bagmati');
      cy.get('#city').type('Kathmandu');
      cy.get('#zipcode').type('44600');
      cy.get('#mobile_number').type('9800000000');

      // Submit form
      cy.get("button[data-qa='create-account']").click();

      // Assert success message
      cy.contains('Account Created!').should('be.visible');

      // Store session cookies after successful registration
      cy.getCookies().then((cookies) => {
        cy.writeFile('cypress/fixtures/session.json', cookies);
      });
    };

    trySignup(); // Start the signup process
  });

  it('Reuses session/cookies for subsequent tests', () => {
    cy.readFile('cypress/fixtures/session.json').then((cookies) => {
      cookies.forEach((cookie) => {
        cy.setCookie(cookie.name, cookie.value);
      });
    });

    // Now you are logged in automatically by using the session cookies
    cy.visit('https://automationexercise.com/');
   
  });
});
