import { Link, Section, Text } from '@react-email/components'
import { APP_NAME } from '~/utils/constants'
import Wrapper, { WrapperProps } from './wrapper'

type Props = Pick<WrapperProps, 'baseUrl'> & {
  token: string
}

export default function AuthEmail({ baseUrl, token }: Props) {
  return (
    <Wrapper
      baseUrl={baseUrl}
      preview={`Seu link de acesso para ${APP_NAME}`}
      title={
        <>
          Seu link de acesso para <strong>{APP_NAME}</strong>
        </>
      }
    >
      <Section>
        <Text>
          Você está recebendo este email porque você solicitou um acesso para {APP_NAME}. Clique abaixo para acessar a
          plataforma
        </Text>
      </Section>
      <Section>
        <Link href={`${baseUrl}/email-confirmation?token=${token}`} className="text-black underline font-semibold">
          Clique aqui para confirmar sua conta
        </Link>
        !
      </Section>{' '}
    </Wrapper>
  )
}
