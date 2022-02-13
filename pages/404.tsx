import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { ROUTE_PATHS } from '@/routes/constants';

const Page404: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push(ROUTE_PATHS.main);
  }, []);

  return null;
};

export default Page404;
