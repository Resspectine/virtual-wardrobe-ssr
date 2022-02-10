export const ROUTE_PATHS = {
  login: '/login',
  register: '/register',
  main: '/main',
  profile: '/profile',
  createGarment: '/create/garment',
  editGarment: (id = '[id]'): string => `/create/garment/${id}`,
  404: '/*',
};

export const KEYS_TO_OMIT = ['editGarment', 404, 'login', 'register', 'profile'] as const;

export type TypesToOmit = typeof KEYS_TO_OMIT[number];
