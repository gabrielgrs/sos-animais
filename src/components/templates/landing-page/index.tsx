'use client'

import { Column } from '~/components/column'
import { Grid } from '~/components/grid'
import { Link } from '~/components/link'
import { buttonVariants } from '~/components/ui/button'
import { useAuth } from '~/hooks'
import { AnimalSchema } from '~/libs/mongoose'

export function LandingPageUI({ animals }: { animals: AnimalSchema[] }) {
  const { user } = useAuth()

  return (
    <Grid>
      {user && (
        <Column size={12} className="flex justify-end">
          <Link href="/formulario" className={buttonVariants()}>
            Publicar animal resgatado
          </Link>
        </Column>
      )}

      {animals.length === 0 && (
        <Column size={12} className="text-center pt-8 text-muted-foreground">
          <h1>Todos os animais foram entregues aos donos!</h1>
        </Column>
      )}

      {animals.map((animal) => (
        <Column key={animal._id} size={4}>
          {animal.name}
        </Column>
      ))}
    </Grid>
  )
}
