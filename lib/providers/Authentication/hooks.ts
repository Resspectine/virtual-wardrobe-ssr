import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useQuery } from 'react-query';

import { authenticate } from '@/lib/controller/authentication';
import { ROUTE_PATHS } from '@/routes/constants';
import { useUser } from '@/store/user';

export const useAuthentication = () => {
  const router = useRouter();
  const user = useUser(state => state.user);
  const setUser = useUser(state => state.setUser);
  const removeUser = useUser(state => state.removeUser);
  const { data, error } = useQuery('authentication', authenticate, { retry: 0 });

  useEffect(() => {
    if (data) {
      setUser(data);
    }

    if (error) {
      removeUser();
    }
  }, [data, error]);

  useEffect(() => {
    if (error && router.route !== ROUTE_PATHS.register) {
      router.push(ROUTE_PATHS.login);
    }
  }, [error, router.route]);

  const isUnauthorizedPage = router.route === ROUTE_PATHS.login || router.route === ROUTE_PATHS.register;

  return { isLoading: user === undefined, isUnauthorizedPage };
};
