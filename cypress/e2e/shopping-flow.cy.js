/// <reference types="cypress" />

describe('Online Boutique Basic Flow', () => {
  let firstProductName;
  let secondProductName;

  it('loads the homepage, browses products, and adds multiple items to cart', () => {
    navigateToHomePage();
    addFirstProductToCart();
    returnToHomePage();
    addSecondProductToCart();
  });
  
  function navigateToHomePage() {
    cy.visit('http://localhost:8080', { timeout: 10000 });
    cy.contains('Hot Products', { timeout: 10000 }).should('be.visible');
  }
  
  function addFirstProductToCart() {
    cy.get('.hot-product-card', { timeout: 10000 }).should('have.length.at.least', 2)
      .first().find('a').click();
    
    cy.url({ timeout: 10000 }).should('include', '/product/');
    
    cy.get('h2', { timeout: 10000 }).should('be.visible')
      .invoke('text').then(text => {
        firstProductName = text.trim();
        cy.log(`First product: ${firstProductName}`);
      });
    
    cy.get('button[type="submit"]', { timeout: 10000 })
      .contains('Add To Cart').click();
    
    cy.url({ timeout: 10000 }).should('include', '/cart');
    
    checkCartNotEmpty();
  }
  
  function returnToHomePage() {
    cy.visit('http://localhost:8080', { timeout: 10000 });
    cy.get('.hot-product-card', { timeout: 10000 }).should('have.length.at.least', 2);
  }
  
  function addSecondProductToCart() {
    cy.get('.hot-product-card a', { timeout: 10000 }).eq(1).click();
    
    cy.url({ timeout: 10000 }).should('include', '/product/');
    cy.get('h2', { timeout: 10000 }).should('be.visible');
    
    cy.get('h2', { timeout: 10000 }).invoke('text').then(text => {
      secondProductName = text.trim();
      cy.log(`Second product: ${secondProductName}`);
    });
    
    cy.get('button[type="submit"]', { timeout: 10000 })
      .contains('Add To Cart').click();
    
    cy.url({ timeout: 10000 }).should('include', '/cart');
  }
  
  function checkCartNotEmpty() {
    cy.get('body', { timeout: 10000 }).then($body => {
      if ($body.find('.empty-cart-section').length > 0) {
        cy.screenshot('empty-cart-error');
        throw new Error('Cart is empty after adding product');
      } else {
        cy.log('Cart has items - test successful');
      }
    });
  }
}); 