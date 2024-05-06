'use client'

import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { updateUser } from '~/actions/auth/update-user'
import { Column, Fieldset, Grid } from '~/components'
import { Link } from '~/components/link'
import { Button, buttonVariants } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { useAuth } from '~/hooks'
import { UserSchema } from '~/libs/drizzle/types'

export function UserSettingsUI({ defaultValues }: { defaultValues: Partial<UserSchema> }) {
  const { register, handleSubmit, formState } = useForm({ mode: 'all', defaultValues })
  const { onUpdateUser } = useAuth()

  const onSubmit = async ({ name, phone }: Partial<UserSchema>) => {
    try {
      await updateUser({ name, phone })
      toast.success('Perfil atualizado')
      return onUpdateUser({ name, phone })
    } catch {
      toast.error('Algo de errado aconteceu. Tente novamente mais tarde.')
    }
  }

  return (
    <main>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid>
          <Column size={12}>
            <h1>Configurações</h1>
          </Column>
          <Column size={12}>
            <Fieldset label="E-mail" error={formState.errors.name?.message}>
              <Input {...register('email')} disabled />
            </Fieldset>
          </Column>

          <Column size={6}>
            <Fieldset label="Name" error={formState.errors.name?.message}>
              <Input {...register('name', { required: true })} placeholder="Digite seu nome" />
            </Fieldset>
          </Column>

          <Column size={6}>
            <Fieldset label="Telefone" error={formState.errors.name?.message}>
              <Input
                {...register('phone', { required: true })}
                placeholder="Digite seu telefone"
                mask="(99) 99999-9999"
              />
            </Fieldset>
          </Column>

          {/* <Column size={12}>
            <Fieldset label="Profile picture" error={formState.errors.avatar?.message}>
              <AvatarUpload
                loading={uploadingAvatar}
                value={avatarUrl ?? undefined}
                onChange={(file) => onUploadFile(file)}
              />
            </Fieldset>
          </Column> */}

          <Column size={12} className="flex items-center justify-self-end gap-2">
            <Link href="/" className={buttonVariants({ variant: 'ghost' })}>
              Cancelar
            </Link>
            <Button loading={formState.isSubmitting}>Salvar</Button>
          </Column>
        </Grid>
      </form>
    </main>
  )
}
