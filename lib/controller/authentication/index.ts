import { LoginUser, RegisterUser } from './types';
import { validateLoginUser, validateRegisterUser } from './validation';

import { appFetch } from '@/lib/controller';
import { StoreUser } from '@/store/user';

export const authenticate = async (): Promise<StoreUser | null> =>
  appFetch('authentication', {
    method: 'GET',
  });

export const login = async (user: LoginUser): Promise<StoreUser> => {
  if (!validateLoginUser(user)) {
    return Promise.reject(Error('Invalid values'));
  }

  return appFetch('authentication/log-in', {
    method: 'POST',
    body: user,
  });
};

export const register = async (user: RegisterUser): Promise<void> => {
  if (!validateRegisterUser(user)) {
    return Promise.reject(Error('Invalid values'));
  }

  return appFetch('authentication/register', {
    method: 'POST',
    body: user,
  });
};
