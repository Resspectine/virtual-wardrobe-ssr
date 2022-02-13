import { userBuilder } from '../support/builders';

describe('Authorization', () => {
  it('should register a new user and login', () => {
    cy.visit('/register');

    const user = userBuilder();

    cy.findByLabelText(/name/i).type(user.name);
    cy.findByLabelText(/email/i).type(user.email);
    cy.findByLabelText(/^password$/i).type(user.password);
    cy.findByLabelText(/^confirm password$/i).type(user.password);

    cy.findByText(/^submit$/i).click();

    cy.url().should('include', '/login');

    cy.findByLabelText(/email/i).type(user.email);
    cy.findByLabelText(/^password$/i).type(user.password);

    cy.findByText(/^submit$/i).click();
  });
});
