import { useUser } from '@/store/user';

export const useRoot = () => {
  const isLoggedIn = !!useUser(state => state.user);

  return { isLoggedIn };
};
