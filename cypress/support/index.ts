import './commands.ts';
import '@testing-library/cypress/add-commands';
import 'cypress-file-upload';

export interface User {
  email: string;
  name: string;
  password: string;
}

export interface Tag {
  title: string;
}

export interface Garment {
  title: string;
  description: string;
  price: string;
  tag: string;
}

declare global {
  namespace Cypress {
    interface Chainable {
      register(): Chainable<User>;
      login(user: User): Chainable<User>;
      loginAsNewUser(): Chainable<User>;
      createTag(): Chainable<Tag>;
      createGarmentAndRedirectTo(redirectTo: string, addMore?: boolean): Chainable;
    }
  }
}
