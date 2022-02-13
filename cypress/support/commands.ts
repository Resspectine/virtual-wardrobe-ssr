import { garmentBuilder, tagBuilder, userBuilder } from './builders';

Cypress.Commands.add('register', () => {
  const user = userBuilder();

  cy.request({
    url: 'http://localhost:3030/api/authentication/register',
    body: user,
    method: 'POST',
  });

  cy.visit('/login');

  return cy.wrap(user);
});

Cypress.Commands.add('login', user => {
  cy.request({
    url: 'http://localhost:3030/api/authentication/log-in',
    body: user,
    method: 'POST',
  });

  cy.visit('/main');

  return cy.wrap(user);
});

Cypress.Commands.add('loginAsNewUser', () => {
  cy.register().then(user => {
    cy.login(user);
  });
});

Cypress.Commands.add('createTag', () => {
  const tag = tagBuilder();

  cy.request({
    url: 'http://localhost:3030/api/tag',
    body: tag,
    method: 'POST',
  });

  return cy.wrap(tag);
});

Cypress.Commands.add('createGarmentAndRedirectTo', (redirectTo, addMore) => {
  const garment = garmentBuilder();
  cy.visit('create/garment');

  console.log(garment);

  cy.findByLabelText(/title/i).type(garment.title);
  cy.findByLabelText(/description/i).type(garment.description);
  cy.findByLabelText(/price/i).type(garment.price);
  cy.findByLabelText(/add tags/i).type(garment.tag);
  cy.findByText(`Add "${garment.tag}"`).click();

  cy.get('input[type="file"]').attachFile('garment.jpg');

  cy.findByText(/submit/i).click();

  cy.url().should('include', 'main');

  if (!addMore) {
    cy.visit(redirectTo);
  }
});
