import { faker } from '@faker-js/faker';

describe('Product Browsing - Filtering', () => {
    it('Navigates, filters, clicks product, and verifies details', () => {
        cy.visit('https://automationexercise.com/products');
    
        // Click on 'Women' category and then 'Dress'
        cy.contains('Women').click();
        cy.contains('Dress').click();
    
        // Check that filtered products contain at least one expected keyword
        cy.get('.features_items').should('contain.text', 'Dress');

        // Wait until products are loaded
        cy.get('.features_items .product-image-wrapper').should('exist');

        // Click the first product
        cy.get('.features_items .product-image-wrapper').first().click();
    
        // Verify product details
            cy.get("a[href='/product_details/3']").click()
            cy.get('h2').should('be.visible'); // Product name
            cy.get('span > span').should('contain.text', 'Rs'); // Product price
            cy.contains('Availability: In Stock').should('be.visible');
        });
    });

