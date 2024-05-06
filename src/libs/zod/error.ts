import { ZodError } from 'zod'

export const handleZodError = (error: unknown) => {
  const isZodError = error instanceof ZodError
  if (!isZodError) return null

  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log({ path: error.issues[0].path, message: error.issues[0].message })
  }

  return error.issues[0].message
}
