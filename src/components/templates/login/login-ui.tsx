'use client'

import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { ChevronLeft, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { login } from '~/actions/auth'
import { Column, Fieldset, Grid, Link } from '~/components'
import { Button, buttonVariants } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { APP_NAME } from '~/utils/constants'
import { emailPattern, passwordPattern, requiredField } from '~/utils/validation'

const defaultValues = {
  email: '',
  password: '',
}

export function LoginUI({ isAuthenticated = false }) {
  const { handleSubmit, register, formState } = useForm({ mode: 'all', defaultValues })

  async function onSubmit({ email, password }: typeof defaultValues) {
    try {
      await login({ email, password })
    } catch (error) {
      if (error instanceof Error) return toast.error(error.message)
      return toast.error('Algo de errado aconteceu. Tente novamente mais tarde.')
    }
  }

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
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit(onSubmit)}
          className="w-full bg-card shadow border-[1px] border-foreground/5 py-12 px-8 rounded-lg"
        >
          <Grid>
            <Column size={12}>
              <Fieldset label="E-mail" error={formState.errors.email?.message}>
                <Input
                  {...register('email', { required: requiredField, pattern: emailPattern })}
                  placeholder="Digite seu e-mail"
                  type="email"
                  disabled={formState.isSubmitting}
                />
              </Fieldset>
            </Column>

            <Column size={12}>
              <Fieldset label="Senha" error={formState.errors.password?.message}>
                <Input
                  {...register('password', { required: requiredField, pattern: passwordPattern })}
                  placeholder="Digite sua senha"
                  type="password"
                  disabled={formState.isSubmitting}
                />
              </Fieldset>
            </Column>

            <Column size={12}>
              <Button loading={formState.isSubmitting} className="w-full">
                Acessar plataforma
              </Button>
            </Column>

            <Column size={12} className="opacity-70 text-sm text-center px-2">
              Não possui conta?{' '}
              <Link href="/cadastro" className="underline hover:opacity-80 duration-500 text-primary">
                Clique aqui para se cadastrar
              </Link>
            </Column>
          </Grid>
        </motion.form>
      </main>
    </div>
  )
}
