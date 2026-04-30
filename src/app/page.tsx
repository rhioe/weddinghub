import type { Metadata } from 'next'
import { HeroSlider } from './(home)/_components/HeroSlider'
import { CategoryGrid } from './(home)/_components/CategoryGrid'
import { FeaturedVendors } from './(home)/_components/FeaturedVendors'
import { NewVendors } from './(home)/_components/NewVendors'
import { CTASection } from './(home)/_components/CTASection'
import { Container } from '@/components/layout/Container'

export const metadata: Metadata = {
  title: 'WeddingHub - Platform Wedding #1 di Kalimantan',
  description:
    'Temukan vendor wedding terbaik di Banjarmasin, Samarinda, Pontianak, Balikpapan, dan Palangkaraya. Venue, katering, MUA, dekorasi, fotografer & banyak lagi!',
  openGraph: {
    title: 'WeddingHub - Platform Wedding #1 di Kalimantan',
    description:
      'Temukan vendor wedding terbaik di Kalimantan. Hubungi langsung via WhatsApp!',
    type: 'website',
    locale: 'id_ID',
    siteName: 'WeddingHub',
  },
}

export default function HomePage() {
  return (
    <main className="pb-20 md:pb-0 space-y-8">
      <Container className="pt-4">
        <HeroSlider />
      </Container>

      <Container>
        <CategoryGrid />
      </Container>

      <Container>
        <FeaturedVendors />
      </Container>

      <Container>
        <NewVendors />
      </Container>

      <Container className="pb-8">
        <CTASection />
      </Container>
    </main>
  )
}