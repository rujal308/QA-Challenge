// import { faker } from '@faker-js/faker';

// describe('User Registration & Session Handling', () => {
//   const randomName = faker.person.fullName();
//   const randomEmail = faker.internet.email();
//   const randomPassword = faker.internet.password();

//   before(() => {
//     cy.session('user', () => {
//       cy.visit('https://automationexercise.com/');
//       cy.get("a[href='/login']").click();

//       // Try signup
//       cy.get("input[placeholder='Name']").type(randomName);
//       cy.get("input[data-qa='signup-email']").type(randomEmail);
//       cy.get("button[data-qa='signup-button']").click();

//       cy.get('body').then(($body) => {
//         if ($body.text().includes('Email Address already exist!')) {
//           // If email already exists, generate new one
//           const newEmail = faker.internet.email();
//           cy.get("input[placeholder='Name']").clear().type(randomName);
//           cy.get("input[data-qa='signup-email']").clear().type(newEmail);
//           cy.get("button[data-qa='signup-button']").click();
//         }
//       });

//       // Fill registration form
//       cy.get('#id_gender2').check();
//       cy.get('#password').type(randomPassword);
//       cy.get('#days').select('10');
//       cy.get('#months').select('May');
//       cy.get('#years').select('1995');
//       cy.get('#newsletter').check();
//       cy.get('#optin').check();
//       cy.get('#first_name').type('Rita');
//       cy.get('#last_name').type('Dahal');
//       cy.get('#company').type('Intuji');
//       cy.get('#address1').type('Balkumari, Lalitpur');
//       cy.get('#country').select('India');
//       cy.get('#state').type('Bagmati');
//       cy.get('#city').type('Kathmandu');
//       cy.get('#zipcode').type('44600');
//       cy.get('#mobile_number').type('9800000000');

//       // Submit
//       cy.get("button[data-qa='create-account']").click();
//       cy.contains('Account Created!').should('be.visible');

//       // Click Continue after registration
//       cy.get("a[data-qa='continue-button']").click();

//       // Confirm Logged In
//       cy.contains('Logged in as').should('be.visible');
//     });
//   });

//   it('Should stay logged in using session', () => {
//     cy.visit('https://automationexercise.com/');
//     cy.contains('Logged in as').should('be.visible');
//   });
// });

describe('Cart and Quantity Management', () => {
  beforeEach(() => {
    cy.session('user', () => {
      cy.registerAndLogin(); // reused logic from commands.js
    });
    cy.visit('https://automationexercise.com/');
    cy.contains('Logged in as').should('be.visible'); // confirm session worked
  });

  it('Add to cart and verify quantity', () => {
    // ... your cart test logic here (as you already wrote)
  });
});
