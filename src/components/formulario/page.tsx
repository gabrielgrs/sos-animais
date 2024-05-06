'use client'

import { Controller, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { createAnimal } from '~/actions/animal/create'
import { Column, Fieldset, Grid, Link } from '~/components'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Select, SelectContent, SelectValue, SelectItem, SelectTrigger } from '~/components/ui/select'
import { Textarea } from '~/components/ui/textarea'
import { AnimalSchema } from '~/libs/drizzle/types'
import { requiredField } from '~/utils/validation'

const defaultValues: Partial<AnimalSchema> = {}

export function AnimalForm({ phone }: { phone: string | null }) {
  const form = useForm({ defaultValues: { ...defaultValues, phone } })
  const { handleSubmit, formState, register, control } = form
  const { push } = useRouter()

  const onSubmit = async (data: Partial<AnimalSchema>) => {
    try {
      await createAnimal(data as AnimalSchema)
      toast.success('Formulário salvo com sucesso')
      push('/')
    } catch {
      toast.error('Algo de errado aconteceu. Tente novamente mais tarde.')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid>
        <Column size={12}>
          <h1>Cadastro de animal resgatado</h1>
        </Column>
        <Column size={12} className="mt-12">
          <h2>Sobre o animal</h2>
        </Column>
        <Column size={6}>
          <Fieldset label="Nome" info="Caso possua identificação">
            <Input {...register('name')} placeholder="Nome" />
          </Fieldset>
        </Column>

        <Column size={6}>
          <Controller
            control={control}
            name="gender"
            render={({ field }) => {
              return (
                <Fieldset label="Gênero">
                  <Select onValueChange={(value) => field.onChange(value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecine" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MALE">Macho</SelectItem>
                      <SelectItem value="FEMALE">Fêmea</SelectItem>
                    </SelectContent>
                  </Select>
                </Fieldset>
              )
            }}
          />
        </Column>

        <Column size={4}>
          <Controller
            control={control}
            name="species"
            render={({ field }) => {
              return (
                <Fieldset label="Espécie">
                  <Select onValueChange={(value) => field.onChange(value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecine" />
                    </SelectTrigger>
                    <SelectContent>
                      {['Cachorro', 'Gato'].map((item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Fieldset>
              )
            }}
          />
        </Column>

        <Column size={4}>
          <Fieldset label="Raça">
            <Input {...register('name')} placeholder="Nome" />
          </Fieldset>
        </Column>

        <Column size={4}>
          <Controller
            control={control}
            name="color"
            render={({ field }) => {
              return (
                <Fieldset label="Cor">
                  <Select onValueChange={(value) => field.onChange(value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecine" />
                    </SelectTrigger>
                    <SelectContent>
                      {['Vermelho'].map((item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Fieldset>
              )
            }}
          />
        </Column>

        <Column size={12} className="mt-12">
          <h2>Onde foi encontrado</h2>
        </Column>

        <Column size={6}>
          <Fieldset label="Quando foi encontrado">
            <Input {...register('foundDate')} placeholder="Data e hora" type="datetime-local" />
          </Fieldset>
        </Column>

        <Column size={6}>
          <Controller
            control={control}
            rules={{ required: requiredField }}
            name="foundCity"
            render={({ field }) => {
              return (
                <Fieldset label="Cidade" error={formState.errors.foundCity?.message}>
                  <Select onValueChange={(value) => field.onChange(value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecine" />
                    </SelectTrigger>
                    <SelectContent>
                      {['Porto Alegre'].map((item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Fieldset>
              )
            }}
          />
        </Column>

        <Column size={4}>
          <Fieldset label="CEP">
            <Input {...register('foundZipCode')} placeholder="Digite o CEP" mask="99999-999" />
          </Fieldset>
        </Column>

        <Column size={8}>
          <Fieldset label="Endereço" info="Rua, bairro, número e completemento">
            <Input {...register('foundAddress')} placeholder="Digite o endereço" />
          </Fieldset>
        </Column>

        <Column size={12} className="mt-12">
          <h2>Onde procurar</h2>
        </Column>

        <Column size={6}>
          <Fieldset label="Nome do responsável">
            <Input placeholder="Nome do responsável" />
          </Fieldset>
        </Column>

        <Column size={6}>
          <Fieldset label="Telefone para contato">
            <Input placeholder="Telefone para contato" mask="(99) 99999-9999" />
          </Fieldset>
        </Column>

        <Column size={12}>
          <Fieldset label="Informações adicionais" info="Toda e qualquer informação é válida">
            <Textarea {...register('observations')} placeholder="Digite algumas observações" />
          </Fieldset>
        </Column>

        <Column size={12} className="flex items-center justify-end gap-4">
          <Link href="/">Voltar</Link>
          <Button>Salvar</Button>
        </Column>
      </Grid>
    </form>
  )
}
