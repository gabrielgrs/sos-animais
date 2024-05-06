'use client'

import { ReactNode } from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

type Props = {
  children: ReactNode
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  },
})

export function RootProviders({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <NextThemesProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
        {children}
      </NextThemesProvider>
    </QueryClientProvider>
  )
}
