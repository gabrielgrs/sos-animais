import { getAllAnimals } from '~/actions/animal'
import { LandingPageUI } from '~/components/templates/landing-page'
import { zodEnvs } from '~/libs/zod/env'

export default async function LandingPage() {
  const animals = await getAllAnimals()

  return <LandingPageUI animals={animals} minioEndpoint={zodEnvs.MINIO_ENDPOINT} />
}
