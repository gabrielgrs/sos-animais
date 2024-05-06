import { redirect } from 'next/navigation'
import { getAuthenticatedUser } from '~/actions/auth'
import { UserSettingsUI } from '~/components/templates/user-settings'

export const dynamic = 'force-dynamic'

export default async function UserSettingsPage() {
  const user = await getAuthenticatedUser()

  if (!user) return redirect('/logout')

  return <UserSettingsUI defaultValues={user!} />
}
