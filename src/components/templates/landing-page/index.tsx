'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Autoplay from 'embla-carousel-autoplay'
import { Column } from '~/components/column'
import { Grid } from '~/components/grid'
import { Link } from '~/components/link'
import { buttonVariants } from '~/components/ui/button'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '~/components/ui/carousel'
import { useAuth } from '~/hooks'
import { AnimalSchema } from '~/libs/mongoose'

function InfoBox({ label, value }: { label: string; value?: string }) {
  return (
    <p className="flex flex-col">
      <b>{label}:</b> {value || 'Não informado'}
    </p>
  )
}

export function LandingPageUI({ animals, minioEndpoint }: { animals: AnimalSchema[]; minioEndpoint: string }) {
  const { user } = useAuth()
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }))

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

      {animals.map((animal) => {
        return (
          <Column key={animal._id} size={4} className="h-full">
            <div className="border-2 rounded-lg">
              {animal.pictures.length === 0 ? (
                <Image
                  src={`${minioEndpoint}/sos-animais/avatar-person.svg`}
                  width={300}
                  height={300}
                  className="roubded-t-lg"
                  alt={animal.name || animal.species}
                />
              ) : (
                <>
                  <Carousel
                    plugins={[plugin.current]}
                    className="w-full h-full relative"
                    onMouseEnter={plugin.current.stop}
                    onMouseLeave={plugin.current.reset}
                  >
                    <CarouselContent className="relative">
                      {animal.pictures.map((url, index) => (
                        <CarouselItem key={`${index}_${url}`} className="h-60">
                          <Image
                            src={url}
                            alt={animal.name || animal.species}
                            width="0"
                            height="0"
                            sizes="100%"
                            className="w-full h-auto rounded-lg"
                          />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute left-2 opacity-70 hover:opacity-100" />
                    <CarouselNext className="absolute right-2 opacity-70 hover:opacity-100" />
                  </Carousel>
                </>
              )}
              <div className="p-2 flex flex-wrap gap-y-2 gap-x-8">
                <InfoBox label="Nome" value={animal.name} />
                <InfoBox label="Espécie" value={animal.species} />
                <InfoBox label="Cor" value={animal.color} />
                <InfoBox label="Cidade" value={animal.rescue.city} />
                <InfoBox label="Bairro" value={animal.rescue.neighborhood} />
                <InfoBox label="Rua" value={animal.rescue.street} />
              </div>
            </div>
          </Column>
        )
      })}
    </Grid>
  )
}
