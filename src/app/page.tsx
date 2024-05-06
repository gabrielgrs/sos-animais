import { getAllAnimals } from '~/actions/animal'
import { LandingPageUI } from '~/components/templates/landing-page'

export default async function LandingPage() {
  const animals = await getAllAnimals()

  return <LandingPageUI animals={animals} />
}
