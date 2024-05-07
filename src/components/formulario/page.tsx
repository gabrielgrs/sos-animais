'use client'

import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { createAnimal } from '~/actions/animal/create'
import { Column, Fieldset, Grid, Link } from '~/components'
import { Button, buttonVariants } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Select, SelectContent, SelectValue, SelectItem, SelectTrigger } from '~/components/ui/select'
import { Textarea } from '~/components/ui/textarea'
import { AnimalSchema } from '~/libs/drizzle/types'
import { requiredField } from '~/utils/validation'
import { Progress } from '../ui/progress'

const defaultValues: Partial<AnimalSchema> = {}

export function AnimalForm({ phone }: { phone: string | null }) {
  const [isUploadingFile, setIsUploadingFile] = useState(false)
  const form = useForm({ defaultValues: { ...defaultValues, phone } })
  const { handleSubmit, formState, register, control } = form
  const { push } = useRouter()
  const [step, setStep] = useState(0)

  const onSubmit = async (data: Partial<AnimalSchema>) => {
    try {
      if (step < 3) return setStep((step) => step + 1)
      await createAnimal(data as AnimalSchema)
      toast.success('Formulário salvo com sucesso')
      push('/')
    } catch {
      toast.error('Algo de errado aconteceu. Tente novamente mais tarde.')
    }
  }

  const onUploadFiles = async (files: FileList | null) => {
    try {
      if (!files) return

      setIsUploadingFile(true)

      const formData = new FormData()
      formData.set('size', String(files.length))
      Array.from({ length: files.length }).map((_, index) => formData.append(`file.${index}`, files[index]))

      const response = await fetch('/api/storage/upload', {
        body: formData,
        method: 'POST',
      })

      if (!response.ok) throw new Error(response.statusText)

      const { urls } = await response.json()
      const pictures = form.getValues('pictures') ?? []
      form.setValue('pictures', [...pictures, ...urls])
    } catch {
    } finally {
      setIsUploadingFile(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid className="mb-8">
        <Column size={12}>
          <h1 className="text-primary pb-2">Cadastro de animal resgatado</h1>
          <Progress value={step * 33.3} className="h-2" />
        </Column>
      </Grid>

      {step === 0 && (
        <motion.div
          initial={{ opacity: 0, translateY: '50px' }}
          animate={{ opacity: 1, translateY: '0px' }}
          transition={{ duration: 0.7 }}
        >
          <Grid>
            <Column size={12}>
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
                rules={{
                  required: requiredField,
                }}
                control={control}
                name="species"
                render={({ field }) => {
                  return (
                    <Fieldset label="Espécie" error={formState.errors.species?.message}>
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
                rules={{
                  required: requiredField,
                }}
                control={control}
                name="color"
                render={({ field }) => {
                  return (
                    <Fieldset label="Cor" error={formState.errors.color?.message}>
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
          </Grid>
        </motion.div>
      )}

      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, translateY: '50px' }}
          animate={{ opacity: 1, translateY: '0px' }}
          transition={{ duration: 0.7 }}
        >
          <Grid>
            <Column size={12}>
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
          </Grid>
        </motion.div>
      )}

      {step === 2 && (
        <motion.div
          initial={{ opacity: 0, translateY: '50px' }}
          animate={{ opacity: 1, translateY: '0px' }}
          transition={{ duration: 0.7 }}
        >
          <Grid>
            <Column size={12}>
              <h2>Onde procurar</h2>
            </Column>

            <Column size={6}>
              <Fieldset label="Nome do responsável">
                <Input placeholder="Nome do responsável" />
              </Fieldset>
            </Column>

            <Column size={6}>
              <Fieldset label="Telefone para contato" error={formState.errors.contactPhone?.message}>
                <Input
                  {...register('contactPhone', { required: requiredField })}
                  placeholder="Telefone para contato"
                  mask="(99) 99999-9999"
                />
              </Fieldset>
            </Column>
          </Grid>
        </motion.div>
      )}

      {step === 3 && (
        <motion.div
          initial={{ opacity: 0, translateY: '50px' }}
          animate={{ opacity: 1, translateY: '0px' }}
          transition={{ duration: 0.7 }}
        >
          <Grid>
            <Column size={12}>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  onUploadFiles(e.target.files)
                }}
                multiple
              />
            </Column>

            <Column size={12}>
              <Fieldset label="Informações adicionais" info="Toda e qualquer informação é válida">
                <Textarea {...register('observations')} placeholder="Digite algumas observações" />
              </Fieldset>
            </Column>
          </Grid>
        </motion.div>
      )}

      <Grid className="mt-4">
        <Column size={12} className="flex items-center justify-end gap-4">
          {step === 0 ? (
            <Link href="/" className={buttonVariants({ variant: 'ghost' })}>
              Voltar para tela inicial
            </Link>
          ) : (
            <Button onClick={() => setStep(step - 1)}>Voltar</Button>
          )}
          <Button loading={formState.isSubmitting || isUploadingFile}>{step === 3 ? 'Finalizar' : 'Avançar'}</Button>
        </Column>
      </Grid>
    </form>
  )
}
