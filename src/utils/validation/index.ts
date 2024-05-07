type Validation = {
  message: string
  value: any
}

export const invalidField = 'Campo inválido'

export const requiredField: Validation = {
  message: 'Campo obrigatório',
  value: true,
}

export const fullNamePattern: Validation = {
  message: 'Nome inválido',
  value: /^[a-zA-ZéáàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ]{4,}(?: [a-zA-ZéáàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ]+){0,2}$/,
}

export const emailPattern: Validation = {
  message: invalidField,
  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
}

export const passwordPattern: Validation = {
  message: 'Uppercase, lowercase, number and special characters',
  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$&*])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/,
}

export const minLength = (quantity: number): Validation => ({
  message: `Min of ${quantity} character${quantity === 1 ? '' : 's'}`,
  value: quantity,
})

export const maxLenth = (quantity: number): Validation => ({
  message: `Max of ${quantity} character${quantity === 1 ? '' : 's'}`,
  value: quantity,
})

export const minArrayLength = (quantity: number): Validation => ({
  message: `Select min of ${quantity}`,
  value: quantity,
})

export const minNumber = (quantity: number): Validation => ({
  message: `Min of ${quantity}`,
  value: quantity,
})

export const maxNumber = (quantity: number): Validation => ({
  message: `Max of ${quantity}`,
  value: quantity,
})

export const phoneValidation = (value?: string) => {
  if (!value) return requiredField.message
  const onlyNumbers = value.replace(/[^\d]/g, '').replace(/[^0-9]+/g, '')
  if (onlyNumbers.length < 10) return invalidField
  return undefined
}

export const zipCodeValidation = (value?: string) => {
  if (!value) return requiredField.message
  const onlyNumbers = value.replace(/[^\d]/g, '').replace(/[^0-9]+/g, '')
  if (onlyNumbers.length < 8) return invalidField
  return undefined
}
