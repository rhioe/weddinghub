import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getVendorBySlug } from '@/lib/actions/vendor'
import { GallerySwiper } from './_components/GallerySwiper'
import { VendorInfo } from './_components/VendorInfo'
import { TabPortfolio } from './_components/TabPortfolio'
import { TabPackages } from './_components/TabPackages'
import { TabReviews } from './_components/TabReviews'
import { FloatingCTA } from './_components/FloatingCTA'
import { Container } from '@/components/layout/Container'

interface VendorDetailPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({
  params,
}: VendorDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const vendor = await getVendorBySlug(slug)

  if (!vendor) {
    return {
      title: 'Vendor Tidak Ditemukan',
    }
  }

  return {
    title: `${vendor.business_name} - Vendor Wedding ${vendor.city}`,
    description:
      vendor.description ||
      `${vendor.business_name} adalah vendor wedding di ${vendor.city}. Lihat portofolio, paket, dan review. Hubungi via WhatsApp!`,
    openGraph: {
      title: `${vendor.business_name} - WeddingHub`,
      description:
        vendor.description ||
        `Vendor wedding di ${vendor.city}. Hubungi via WhatsApp!`,
      type: 'profile',
    },
  }
}

export default async function VendorDetailPage({
  params,
}: VendorDetailPageProps) {
  const { slug } = await params
  const vendor = await getVendorBySlug(slug)

  if (!vendor) {
    notFound()
  }

  return (
    <main className="pb-24 md:pb-0">
      <GallerySwiper images={vendor.portfolios || []} />
      <Container className="py-4 space-y-6">
        <VendorInfo vendor={vendor} />
        <TabPortfolio portfolios={vendor.portfolios || []} />
        <TabPackages packages={vendor.packages || []} />
        <TabReviews reviews={vendor.reviews || []} />
      </Container>
      <FloatingCTA vendor={vendor} />
    </main>
  )
}