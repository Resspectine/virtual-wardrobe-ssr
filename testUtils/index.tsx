import { queries, Queries, render as reactRender, RenderOptions, RenderResult } from '@testing-library/react';
import { FC, ReactElement } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { ThemeProvider } from '@/materialUiTheme/provider';

export const sleep = (timeout: number): Promise<void> =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, timeout);
  });

export const render = <Q extends Queries = typeof queries, Container extends Element | DocumentFragment = HTMLElement>(
  ui: ReactElement,
  options: RenderOptions<Q, Container> = {}
): RenderResult<Q, Container> => {
  const queryClient = new QueryClient();

  const Wrapper: FC = ({ children }) => (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>{children}</ThemeProvider>
    </QueryClientProvider>
  );

  return { ...reactRender(ui, { ...options, wrapper: Wrapper }) };
};
