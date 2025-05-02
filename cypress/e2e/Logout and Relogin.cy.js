describe('Logout and Relogin', () => {
    let email, password;
  
    before(() => {
      cy.fixture('user').then((userData) => {
        email = userData.randomEmail;
        password = userData.randomPassword;
      });
      cy.registerAndLogin();
    });
  
    it('Logout and then login again', () => {
      cy.visit('https://automationexercise.com/');
      cy.contains('Logged in as').should('be.visible');
      cy.get("a[href='/logout']").click();
  
      // Now login again using saved credentials
      cy.get("input[data-qa='login-email']").type(email);
      cy.get("input[data-qa='login-password']").type(password);
      cy.get("button[data-qa='login-button']").click();
  
      cy.contains('Logged in as').should('be.visible');
    });
  });
  