'use client'

import { useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { motion } from 'framer-motion'
import { ChevronLeft, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { sendAuthEmail } from '~/actions/auth'
import { Column, Fieldset, Grid, Link } from '~/components'
import { Button, buttonVariants } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Separator } from '~/components/ui/separator'
import { APP_NAME, SUPPORT_EMAIL } from '~/utils/constants'
import { emailPattern } from '~/utils/validation'

const defaultValues = {
  email: '',
}

export function AuthUI({ isAuthenticated = false }) {
  const { handleSubmit, register, formState, control } = useForm({ mode: 'all', defaultValues })
  const [emailSent, setEmailSent] = useState(false)

  async function onSubmit({ email }: typeof defaultValues) {
    try {
      await sendAuthEmail(email)
      return setEmailSent(true)
    } catch {
      return toast.error('Something went wrong')
    }
  }

  const emailValue = useWatch({ name: 'email', control })

  if (isAuthenticated) return <Loader2 className="m-2 text-primary animate-spin" />

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 pt-28 md:pt-[20vh] md:mt-0 mx-auto max-w-4xl">
      <div className="flex flex-col items-center justify-center">
        <Link
          href="/"
          className={buttonVariants({
            variant: 'ghost',
            className: 'group gap-1 text-muted-foreground hover:text-foreground duration-500',
          })}
        >
          <ChevronLeft size={16} className="group-hover:-translate-x-1 duration-500 opacity-60" />
          <span>Voltar para o início</span>
        </Link>
        <h1 className="text-center max-w-xs pt-[15vh] md:pt-0">
          Bem-vindo ao <br />
          <span className="text-primary font-semibold">{APP_NAME}</span>! 👋
        </h1>
      </div>
      <main className="mx-auto max-w-sm flex w-full items-start md:items-center">
        <motion.form
          key={String(emailSent)}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit(onSubmit)}
          className="w-full bg-card shadow border-[1px] border-foreground/5 py-12 px-8 rounded-lg"
        >
          {emailSent ? (
            <Grid>
              <Column size={12}>
                <strong>Verifique seu e-mail (e spam)</strong>
              </Column>
              <Column size={12} className="text-muted-foreground">
                <p>
                  Nós enviamos um link de acesso para o seu email <span className="text-foreground">{emailValue}</span>.{' '}
                  <br /> Clique no link para confirmar sua identidade.
                </p>
              </Column>

              <Column size={12}>
                <Separator />
              </Column>

              <Column size={12} className="pt-8">
                <span className="text-muted-foreground">Precisa de ajuda? </span>
                <Link href={`mailto:${SUPPORT_EMAIL}?subject=Ajuda`} target="_blank" className="text-primary">
                  Fale conosco
                </Link>
                .
              </Column>
            </Grid>
          ) : (
            <Grid>
              <Column size={12}>
                <Fieldset label="E-mail" error={formState.errors.email?.message}>
                  <Input
                    {...register('email', { required: true, pattern: emailPattern })}
                    placeholder="Digite seu e-mail"
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    disabled={formState.isSubmitting}
                  />
                </Fieldset>
              </Column>

              <Column size={12}>
                <Button disabled={!formState.isValid} loading={formState.isSubmitting} className="w-full">
                  Acessar com e-mail
                </Button>
              </Column>

              {/* <Column size={12} className="opacity-70 text-sm text-center px-2">
                By clicking continue, you agree to our{' '}
                <Link href="/terms-of-service" className="underline hover:opacity-80 duration-500">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy-policy" className="underline hover:opacity-80 duration-500">
                  Privacy Policy
                </Link>
                .
              </Column> */}
            </Grid>
          )}
        </motion.form>
      </main>
    </div>
  )
}
