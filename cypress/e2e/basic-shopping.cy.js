describe('Basic Shopping Experience', () => {
  it('adds multiple products to cart', () => {
    navigateToHomePage();
    selectFirstProduct();
    addToCart();
    returnToShopping();
    selectSecondProduct();
    addToCart();
    verifyCartHasItems();
  });
  
  function navigateToHomePage() {
    cy.visit('http://localhost:8080');
    cy.contains('Hot Products').should('exist');
  }
  
  function selectFirstProduct() {
    cy.get('.hot-product-card a').first().click();
    cy.url().should('include', '/product/');
  }
  
  function addToCart() {
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/cart');
  }
  
  function returnToShopping() {
    cy.get('a').contains('Continue Shopping').click();
    cy.url().should('not.include', '/cart');
  }
  
  function selectSecondProduct() {
    cy.get('.hot-product-card a').eq(1).click();
    cy.url().should('include', '/product/');
  }
  
  function verifyCartHasItems() {
    cy.url().should('include', '/cart');
    cy.get('.empty-cart-section').should('not.exist');
  }
}); 