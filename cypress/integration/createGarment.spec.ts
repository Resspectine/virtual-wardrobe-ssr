describe('Create Garment', () => {
  beforeEach(() => {
    Cypress.Cookies.preserveOnce('Authentication');
  });

  it('should open create garment page', () => {
    cy.loginAsNewUser();
  });

  it('should create new garment', () => {
    cy.createTag().then(tag => {
      cy.findByText(/create garment/i).click();

      cy.url().should('include', 'create/garment');

      cy.findByLabelText(/title/i).type('Test garment');
      cy.findByLabelText(/description/i).type('Test garment description');
      cy.findByLabelText(/price/i).type('100');
      cy.findByLabelText(/add tags/i).type('New Tag 1');
      cy.findByText(/add "new.*/i).click();
      cy.findByLabelText(/add tags/i).type(tag.title);
      cy.findByText(tag.title).click();

      cy.get('input[type="file"]').attachFile('garment.jpg');

      cy.findByText(/submit/i).click();
    });
  });
});
