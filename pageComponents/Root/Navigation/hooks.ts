import { useRouter } from 'next/router';

export const useNavigationControl = () => {
  const { route: appRoute, push } = useRouter();

  const goTo = (link: string): void => {
    push(link);
  };

  const isCurrentPage = (route: string): boolean => appRoute.includes(route);

  return {
    isCurrentPage,
    goTo,
  };
};
