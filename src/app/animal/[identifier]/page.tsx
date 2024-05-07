import { getByIdentifier } from '~/actions/animal/get-by-identifier'
import { AnimalUI } from '~/components/animal'
import { zodEnvs } from '~/libs/zod/env'

type Props = {
  params: {
    identifier: string
  }
}

export default async function AnimalPage(props: Props) {
  const { identifier } = props.params

  const animal = await getByIdentifier(identifier)

  return <AnimalUI animal={animal} minioEndpoint={zodEnvs.MINIO_ENDPOINT} />
}
