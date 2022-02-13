import { garmentBuilder } from '../support/builders';
import { getInputTextWithDelAll } from '../support/helpers';

describe('Main', () => {
  beforeEach(() => {
    Cypress.Cookies.preserveOnce('Authentication');
  });

  it('should create 3 garments and open main page', () => {
    cy.loginAsNewUser().then(() => {
      cy.createGarmentAndRedirectTo('main', true);
      cy.createGarmentAndRedirectTo('main', true);
      cy.createGarmentAndRedirectTo('main');
      cy.url().should('include', 'main');
    });
  });

  it('should add garment to favorite and filter by tag', () => {
    cy.findAllByTestId('StarBorderIcon').last().click();

    cy.findByText(/favorite first/i).click();

    cy.findAllByTestId('StarBorderIcon').first().parent().should('have.css', 'background-color', 'rgb(56, 142, 60)');

    cy.findByText(/favorite first/i).click();

    cy.findByLabelText(/tag/i).click();
    cy.findAllByRole(/option/i)
      .first()
      .then(elem => {
        cy.wrap(elem).click();

        cy.get('.MuiBackdrop-root').click();

        cy.wrap(elem)
          .invoke('text')
          .then(text =>
            cy
              .findAllByText(text, {
                selector: '.MuiBox-root .MuiTypography-root',
              })
              .should('have.length', 1)
          );
      });

    cy.findByLabelText(/tag/i).click();
    cy.findAllByRole(/option/i)
      .first()
      .click();

    cy.get('.MuiBackdrop-root').click();
  });

  it('should open edit page', () => {
    cy.findAllByText(/garment \d/i)
      .first()
      .trigger('mousedown');

    cy.get('.MuiPaper-root > .MuiBox-root > :nth-child(2)').click();

    cy.findAllByText(/garment \d/i).should('have.length', 2);

    cy.findAllByText(/garment \d/i)
      .first()
      .trigger('mousedown');

    cy.get('.MuiPaper-root > .MuiBox-root > :nth-child(1)').click();

    cy.url().should('match', /create\/garment\/[a-z0-9-]+/);
  });

  it('should save edited garment', () => {
    const editGarment = garmentBuilder({
      overrides: {
        title: 'Edited garment',
        description: 'Edited garment description',
        price: '1337',
        tag: 'Totally new tag',
      },
    });

    cy.findByLabelText(/title/i).type(getInputTextWithDelAll(editGarment.title));
    cy.findByLabelText(/description/i).type(getInputTextWithDelAll(editGarment.description));
    cy.findByLabelText(/price/i).type(getInputTextWithDelAll(editGarment.price));
    cy.findByLabelText(/add tags/i).type(`{backspace}${editGarment.tag}`);
    cy.findByText(`Add "${editGarment.tag}"`).click();

    cy.findByText(/submit/i).click();

    cy.url().should('include', 'main');

    cy.findByText(editGarment.title).should('exist');
    cy.findByText(editGarment.description).should('exist');
    cy.findByText(`$${editGarment.price}`).should('exist');
    cy.findByText(editGarment.tag).should('exist');
  });
});
