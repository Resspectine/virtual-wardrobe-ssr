import { LoginUser, RegisterUser } from './types';

export const validateLoginUser = (user: LoginUser): boolean => !!user.email && !!user.password;

export const validateRegisterUser = (user: RegisterUser): boolean => !!user.email && !!user.password && !!user.name;
