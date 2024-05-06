import '~/libs/zod/env'
import { Urbanist } from 'next/font/google'
import './globals.css'
import NextTopLoader from 'nextjs-toploader'
import { Toaster } from 'sonner'
import { Navbar } from '~/components'
import { RootProviders } from '~/components/root-providers'
import { generateMetadata } from '~/utils/metadata'
import { cn } from '~/utils/shadcn'

const font = Urbanist({ subsets: ['latin'] })

export const metadata = generateMetadata()

type Props = Readonly<{
  children: React.ReactNode
}>

function RootLayout({ children }: Props) {
  return (
    <html lang="pt-BR">
      <body className={cn(font.className)}>
        <RootProviders>
          <NextTopLoader color="hsl(var(--primary))" showSpinner={false} />
          <Navbar />
          <div className="mx-auto max-w-5xl p-4">{children}</div>
          <Toaster duration={5000} richColors />
        </RootProviders>
      </body>
    </html>
  )
}

export default RootLayout
