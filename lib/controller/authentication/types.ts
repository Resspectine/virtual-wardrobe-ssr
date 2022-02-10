import { User } from '@/types/user';

export type LoginUser = Pick<User, 'email' | 'password'>;

export type RegisterUser = Pick<User, 'email' | 'password' | 'name'>;
