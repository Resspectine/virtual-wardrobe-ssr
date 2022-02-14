import type { AppProps } from 'next/app';
import { useState } from 'react';
import { QueryClientProvider, QueryClient, Hydrate } from 'react-query';

import { AuthenticationProvider } from '@/lib/providers/Authentication';
import { ThemeProvider } from '@/materialUiTheme/provider';
import Root from '@/pageComponents/Root';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <AuthenticationProvider>
          <ThemeProvider>
            <Root>
              <Component {...pageProps} />
            </Root>
          </ThemeProvider>
        </AuthenticationProvider>
      </Hydrate>
    </QueryClientProvider>
  );
};

export default MyApp;
