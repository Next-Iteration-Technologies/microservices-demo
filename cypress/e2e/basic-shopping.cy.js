describe('Basic Shopping Experience', () => {
  const sunglassesPrice = '$19.99';
  const watchPrice = '$109.99';
  
  it('adds Watch and Sunglasses to cart and verifies total', () => {
    navigateToHomePage();
    selectSunglasses();
    addToCart();
    returnToShopping();
    selectWatch();
    addToCart();
    verifyCartContentsAndTotal();
  });
  
  function navigateToHomePage() {
    cy.visit('http://localhost:8080');
    cy.get('.navbar-brand img.top-left-logo').should('be.visible');
    cy.get('.hot-products-row h3').should('contain', 'Hot Products');
    
    cy.get('.hot-product-card').should('have.length.at.least', 3);
  }
  
  function selectSunglasses() {
    cy.get('.hot-product-card')
      .contains('.hot-product-card-name', 'Sunglasses')
      .parents('.hot-product-card')
      .within(() => {
        cy.get('.hot-product-card-price').should('contain', sunglassesPrice);
        cy.get('a').click();
      });
    
    cy.url().should('include', '/product/');
    
    cy.contains('Sunglasses').should('be.visible');
    cy.contains(sunglassesPrice).should('be.visible');
  }
  
  function selectWatch() {
    cy.get('.hot-product-card')
      .contains('.hot-product-card-name', 'Watch')
      .parents('.hot-product-card')
      .within(() => {
        cy.get('.hot-product-card-price').should('contain', watchPrice);
        cy.get('a').click();
      });
    
    cy.url().should('include', '/product/');
    
    cy.contains('Watch').should('be.visible');
    cy.contains(watchPrice).should('be.visible');
  }
  
  function addToCart() {
    cy.get('button[type="submit"]')
      .should('be.visible')
      .should('be.enabled')
      .click();
    
    cy.url().should('include', '/cart');
  }
  
  function returnToShopping() {
    cy.get('a').contains('Continue Shopping').click();
    
    cy.url().should('include', 'http://localhost:8080');
    cy.get('.hot-products-row').should('be.visible');
  }
  
  function verifyCartContentsAndTotal() {
    cy.url().should('include', '/cart');
    
    cy.get('.empty-cart-section').should('not.exist');
    
    cy.contains('Sunglasses').should('be.visible');
    cy.contains('Watch').should('be.visible');
    
    cy.contains(sunglassesPrice).should('be.visible');
    cy.contains(watchPrice).should('be.visible');
    
    cy.contains('Total')
      .parent()
      .invoke('text')
      .then(totalText => {
        const totalAsString = totalText.match(/\$[\d.]+/)[0];
        const totalValue = parseFloat(totalAsString.replace('$', ''));
        
        const expectedProductsTotal = 19.99 + 109.99;
        
        expect(totalValue).to.be.at.least(expectedProductsTotal);
        cy.log(`Cart total verified: ${totalAsString}`);
      });
  }
}); 