import { ChakraProvider } from '@chakra-ui/react'

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import Head from 'next/head'
import '@fontsource/inter/'
import '@fontsource/inter/900.css'
import '@fontsource/inter/800.css'
import '@fontsource/inter/700.css'
import '@fontsource/inter/600.css'
import { ReactQueryDevtools } from 'react-query/devtools'

import { orangeTheme, purpleTheme } from '../styles/theme'
import { RequireAuth } from '../contexts/Auth/RequireAuth'
import { AuthProvider } from '../contexts/Auth/AuthProvider'
import ThemeProviderContext from '../contexts/theme'
import '../styles/calendardays.css'
import '../styles/globals.css'

const queryClient = new QueryClient()
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
      </Head>

      <QueryClientProvider client={queryClient}>
        <ThemeProviderContext>
          <AuthProvider>
            <RequireAuth>
              <Component {...pageProps} />
            </RequireAuth>
          </AuthProvider>
        </ThemeProviderContext>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  )
}

export default MyApp
