describe('Profile', () => {
  beforeEach(() => {
    Cypress.Cookies.preserveOnce('Authentication');
  });

  it('should open profile page', () => {
    cy.loginAsNewUser().then(() => {
      cy.findByTestId('user-profile-button').click();

      cy.get('.MuiList-root > [tabindex="0"]').click();
    });
  });

  it('should create new tag', () => {
    cy.findByTestId('add-tag-button').click();

    cy.findByLabelText(/title/i).type('Test tag');

    cy.findByText(/submit/i).click();

    cy.findByTestId('add-tag-button').click();

    cy.findByLabelText(/title/i).type('Test tag2');

    cy.findByLabelText(/add more/i).click();

    cy.findByText(/submit/i).click();

    cy.findByLabelText(/title/i).type('Test tag3');
    cy.findByLabelText(/add more/i).click();

    cy.findByText(/submit/i).click();

    cy.findAllByText(/test tag/i).should('have.length', 3);
  });

  it('should delete tag', () => {
    cy.findAllByTestId('CancelIcon').first().click();

    cy.findAllByText(/test tag/i).should('have.length', 2);
  });

  it('should upload avatar image', () => {
    cy.url().should('include', 'profile');
    cy.get('input').attachFile('avatar.jpg');

    cy.wait(0);

    cy.fixture('avatarDataString.json').then(url =>
      cy.get('img[alt="avatar"]').first().should('have.attr', 'src', url)
    );
  });
});
