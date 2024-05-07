'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Autoplay from 'embla-carousel-autoplay'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '~/components/ui/carousel'
import { AnimalSchema } from '~/libs/mongoose'
import { Column } from '../column'
import { Grid } from '../grid'

function InfoBox({ label, value }: { label: string; value?: string }) {
  return (
    <p className="flex flex-col pb-4">
      <b>{label}:</b> {value || 'Não informado'}
    </p>
  )
}

export function AnimalUI({ animal, minioEndpoint }: { animal: AnimalSchema; minioEndpoint: string }) {
  const plugin = useRef(Autoplay({ delay: 2000 }))

  return (
    <Grid className="border-2 rounded-lg">
      <Column size={12}>
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
                  <CarouselItem key={`${index}_${url}`} className="h-[400px]">
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
      </Column>
      <Column size={4}>
        <div className="p-4 flex flex-col">
          <h2>Dados do animal</h2>
          <InfoBox label="Nome" value={animal.name} />
          <InfoBox label="Espécie" value={animal.species} />
          <InfoBox label="Cor" value={animal.color} />
        </div>
      </Column>

      <Column size={4}>
        <div className="p-4 flex flex-col">
          <h2>Dados do resgate</h2>
          <InfoBox label="Cidade" value={animal.rescue.city} />
          <InfoBox label="Bairro" value={animal.rescue.neighborhood} />
          <InfoBox label="Rua" value={animal.rescue.street} />
        </div>
      </Column>

      <Column size={4}>
        <div className="p-4 flex flex-col">
          <h2>Dados de Contato</h2>
          <InfoBox label="Nome" value={animal.contact.name} />
          <InfoBox label="Telefone" value={animal.contact.phone} />
          <InfoBox label="Cidade" value={animal.contact.city} />
          <InfoBox label="Bairro" value={animal.contact.neighborhood} />
          <InfoBox label="Rua" value={animal.contact.street} />
        </div>
      </Column>
    </Grid>
  )
}
