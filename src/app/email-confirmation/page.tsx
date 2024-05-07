import { validateEmail } from '~/actions/auth'

type Props = {
  searchParams: {
    token: string
  }
}

export default async function EmailConfirmationPage(props: Props) {
  await validateEmail(props.searchParams.token)
}
