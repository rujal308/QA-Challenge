describe('User Registration', () => {
  beforeEach(() => {
    cy.session('user', () => {
      cy.registerAndLogin(); // This handles signup and login
    });
    cy.visit('https://automationexercise.com/');
  });

  it('Check if user is logged in', () => {

    //Verify if user is logged in
    cy.contains('Logged in as').should('be.visible'); 
    cy.url().should('eq', 'https://automationexercise.com/');
  });
});
