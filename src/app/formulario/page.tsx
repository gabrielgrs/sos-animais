import { redirect } from 'next/navigation'
import { getAuthenticatedUser } from '~/actions/auth'
import { AnimalForm } from '~/components/formulario/page'

export default async function FormPage() {
  const user = await getAuthenticatedUser()

  if (!user) return redirect('/logout')

  return <AnimalForm phone={user.phone} />
}
