import {faker} from '@faker-js/faker';
describe('Cart and Quantity Management', () => {
    
    const randomName = faker.person.fullName();
    const randomNumber = faker.finance.creditCardNumber();
    const randomCVV = faker.finance.creditCardCVV();
    const expiryMonth = faker.date.future().getMonth() + 1; // 1–12
    const expiryYear = faker.date.future().getFullYear();

    beforeEach(() => {
      cy.session('user', () => {
        cy.registerAndLogin(); // reused logic from commands.js
      });
      cy.visit('https://automationexercise.com/');
      cy.contains('Logged in as').should('be.visible'); // confirm session worked
    });
  
    it('Add to cart and verify quantity', () => {
     //add first product from Women category
        cy.contains('Women').click();
        cy.contains('Dress').click();
        cy.get('.features_items .product-image-wrapper .choose').first().click();
        cy.contains('Add to cart').click();

        //Click 'Continue Shopping' button
        cy.contains('Continue Shopping').click();

        //add second product from Men> Tshirts
        cy.contains('Men').click();
        cy.contains('Tshirts').click();
        cy.get('.features_items .product-image-wrapper .choose').first().click();
        cy.contains('Add to cart').click();
        cy.contains('Continue Shopping').click();

        //add third product from kids> Tops & Shirts
        cy.contains('Kids').click();
        cy.contains('Tops & Shirts').click();
        cy.get('.features_items .product-image-wrapper .choose').first().click();
       
       //change one item quantity to 3
        cy.get('#quantity').clear().type(3);
        cy.contains('Add to cart').click();
        cy.contains('Continue Shopping').click();


        // View Cart code
        cy.get("p[class='text-center'] a").click({force: true});

        // Verify total number of  products added
        cy.get('tbody tr').should('have.length', 3);

        cy.get('button.disabled').contains(/^3$/).should('exist');

        // Remove the second product
        cy.get('tbody tr').eq(1).find('.cart_delete a').click();

        // Verify only 2 product remains
        cy.get('tbody tr').should('have.length', 2);

        
        //Checkout and Payment
        cy.get('.btn.btn-default.check_out').click();

        //Place order button
        cy.get('.btn.btn-default.check_out').click({force: true});

        //Enter card details
        cy.get("input[name='name_on_card']").type(randomName);
        cy.get("input[name='card_number']").type(randomNumber);
        cy.get("input[name = 'cvc']").type(randomCVV);
        cy.get("input[placeholder='MM']").type(expiryMonth);
        cy.get("input[placeholder='YYYY']").type(expiryYear);
        
        //submit
        cy.get('#submit').click();

        //validate the success message
        cy.get("h2[class='title text-center'] b").should('contain', 'Placed');

    })
    });
  
  