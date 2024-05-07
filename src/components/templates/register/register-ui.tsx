'use client'

import { useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { motion } from 'framer-motion'
import { ChevronLeft, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { register as registerAction } from '~/actions/auth'
import { Column, Fieldset, Grid, Link } from '~/components'
import { Button, buttonVariants } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Separator } from '~/components/ui/separator'
import { APP_NAME, SUPPORT_EMAIL } from '~/utils/constants'
import { emailPattern, fullNamePattern, passwordPattern, requiredField } from '~/utils/validation'

const defaultValues = {
  email: '',
  password: '',
  passwordConfirmation: '',
  name: '',
  phone: '',
}

export function RegisterUI({ isAuthenticated = false }) {
  const { handleSubmit, register, formState, control } = useForm({
    mode: 'all',
    defaultValues,
  })
  const [emailSent, setEmailSent] = useState(false)

  async function onSubmit({ email, password, name, phone, passwordConfirmation }: typeof defaultValues) {
    try {
      if (password !== passwordConfirmation) return toast.error('As senhas precisam ser iguais')
      await registerAction({ email, password, name, phone })
      return setEmailSent(true)
    } catch {
      return toast.error('Algo de errado aconteceu. Tente novamente mais tarde.')
    }
  }

  const emailValue = useWatch({ name: 'email', control })

  if (isAuthenticated) return <Loader2 className="m-2 text-primary animate-spin" />

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 pt-8 md:mt-0 mx-auto max-w-4xl">
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
          Crie sua conta no <br />
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
                  Nós enviamos um link de confirmação para o seu e-mail{' '}
                  <span className="text-foreground">{emailValue}</span>. <br /> Clique no link para confirmar sua
                  identidade.
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
                <Fieldset label="Nome" error={formState.errors.name?.message}>
                  <Input
                    {...register('name', { required: requiredField, pattern: fullNamePattern })}
                    placeholder="Digite seu nome completo"
                    disabled={formState.isSubmitting}
                  />
                </Fieldset>
              </Column>

              <Column size={12}>
                <Fieldset
                  label="Telefone"
                  error={formState.errors.phone?.message}
                  info="Com o DDD, digite somente os números"
                >
                  <Input
                    {...register('phone', { required: requiredField })}
                    placeholder="Digite seu telefone"
                    mask="(99) 99999-9999"
                    disabled={formState.isSubmitting}
                  />
                </Fieldset>
              </Column>

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
                <Fieldset label="Confirmação de senha" error={formState.errors.passwordConfirmation?.message}>
                  <Input
                    {...register('passwordConfirmation', { required: requiredField, pattern: passwordPattern })}
                    placeholder="Digite a confirmação de senha"
                    type="password"
                    disabled={formState.isSubmitting}
                  />
                </Fieldset>
              </Column>

              <Column size={12}>
                <Button loading={formState.isSubmitting} className="w-full">
                  Realizar cadastro
                </Button>
              </Column>

              <Column size={12} className="opacity-70 text-sm text-center px-2">
                Já possui conta?{' '}
                <Link href="/acesso" className="underline hover:opacity-80 duration-500 text-primary">
                  Clique aqui para acessar
                </Link>
              </Column>
            </Grid>
          )}
        </motion.form>
      </main>
    </div>
  )
}
