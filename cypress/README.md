# Online Boutique E2E Tests

This directory contains end-to-end tests for the Online Boutique application using Cypress.

## Prerequisites

- Node.js (version 18 or later)
- npm (comes with Node.js)
- The Online Boutique application running locally on http://localhost:8080

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

## Running Tests

Run the tests in interactive mode:
```bash
npm run cypress:open
```

Run the tests in headless mode:
```bash
npm run cypress:run
```

## Test Descriptions

### Shopping Flow Test

This test verifies the main shopping flow:
1. Landing on the home page
2. Adding 2 items of the first product
3. Adding 1 item of the second product
4. Viewing the cart and verifying products and totals
5. Completing checkout
6. Verifying order confirmation

## File Structure

- `cypress/e2e/shopping-flow.cy.js` - The main shopping flow test
- `cypress.config.js` - Cypress configuration
- `package.json` - Node.js dependencies and scripts 