# Intuji-QA-Associate-Task
# Cypress Automation Assessment

This project is a Cypress automation test suite for (https://automationexercise.com). It covers key flows including user registration, session handling, product browsing, cart management, and checkout.

## Features Covered

- **User Registration with Faker**
  - Generates random user details using the `faker` library.
  - Checks for email uniqueness to avoid duplicate registration.
  - Verifies the user is logged in after registration.
  - Stores session cookies and reuses them for future tests.

- **Product Browsing and Add to Cart**
  - Navigates to product categories and verifies product listing.
  - Adds selected product to cart and confirms the cart update.

- **Checkout Flow**
  - Proceeds to checkout.
  - Uses existing or default address.
  - Enters fake payment details.
  - Confirms order and validates success message.

- **Negative Scenarios**
  - Handles existing email scenario gracefully during registration.

## Folder Structure
cypress/ ├── e2e/ │ ├── registration.cy.js │ ├── product.cy.js │ └── checkout.cy.js ├── fixtures/ │ └── user.json ├── support/ │ ├── commands.js │ └── e2e.js

## Setup Steps

1. Clone the repository and open it in VS Code.
2. Install project dependencies by running: npm install
3. Open Cypress Test Runner with: npx cypress open
Or run in headless mode

## How to Run Tests

- After opening Cypress (`npx cypress open`), select the `.cy.js` files inside the `cypress/e2e` folder to execute them one by one.

## Tools/Plugins Used

- **Cypress** – End-to-end testing framework.
- **Faker.js** – Used for generating random user data during registration.

## Known Limitations

- Page Object Model (POM) not used.
- No Cypress intercepts or API response assertions implemented.
- No visual screenshot comparisons included.




