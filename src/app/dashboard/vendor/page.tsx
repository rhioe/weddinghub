import Link from 'next/link'
import { createServerClient } from '@/lib/supabase/server'
import { Container } from '@/components/layout/Container'
import { Badge } from '@/components/ui/Badge'
import { Divider } from '@/components/ui/Divider'

export default async function VendorDashboardPage() {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  // Ambil profil vendor
  const { data: vendor } = await supabase
    .from('vendor_profiles')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (!vendor) {
    return (
      <Container className="py-6">
        <div className="text-center py-12">
          <span className="text-5xl mb-4 block">🏪</span>
          <h2 className="text-lg font-semibold text-neutral-900 mb-2">
            Belum ada profil vendor
          </h2>
          <p className="text-sm text-neutral-500 mb-4">
            Lengkapi profil bisnis kamu dulu
          </p>
          <Link
            href="/dashboard/vendor/profile"
            className="text-primary-500 font-semibold hover:text-primary-600"
          >
            Buat Profil Vendor →
          </Link>
        </div>
      </Container>
    )
  }

  // Statistik
  const { count: portfolioCount } = await supabase
    .from('portfolios')
    .select('*', { count: 'exact', head: true })
    .eq('vendor_id', vendor.id)

  const { count: approvedPortfolioCount } = await supabase
    .from('portfolios')
    .select('*', { count: 'exact', head: true })
    .eq('vendor_id', vendor.id)
    .eq('status', 'approved')

  const { count: packageCount } = await supabase
    .from('packages')
    .select('*', { count: 'exact', head: true })
    .eq('vendor_id', vendor.id)

  const { count: inquiryCount } = await supabase
    .from('inquiries')
    .select('*', { count: 'exact', head: true })
    .eq('vendor_id', vendor.id)

  const { count: pendingInquiryCount } = await supabase
    .from('inquiries')
    .select('*', { count: 'exact', head: true })
    .eq('vendor_id', vendor.id)
    .eq('status', 'pending')

  const stats = [
    {
      label: 'Portofolio',
      value: portfolioCount || 0,
      sub: `${approvedPortfolioCount || 0} aktif`,
      href: '/dashboard/vendor/portfolio',
      icon: '📸',
    },
    {
      label: 'Paket',
      value: packageCount || 0,
      href: '/dashboard/vendor/packages',
      icon: '📦',
    },
    {
      label: 'Inquiry',
      value: inquiryCount || 0,
      sub: pendingInquiryCount ? `${pendingInquiryCount} baru` : undefined,
      href: '/dashboard/vendor/inquiries',
      icon: '📨',
    },
    {
      label: 'Rating',
      value: vendor.avg_rating || 0,
      sub: `${vendor.total_reviews || 0} review`,
      href: '#',
      icon: '⭐',
    },
  ]

  return (
    <Container className="py-6">
      <h1 className="text-xl font-bold text-neutral-900 mb-6">
        Dashboard Vendor
      </h1>

      {/* Info vendor */}
      <div className="bg-white border border-neutral-200 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🏪</span>
          <div className="flex-1">
            <h2 className="font-semibold text-neutral-900">
              {vendor.business_name}
            </h2>
            <p className="text-sm text-neutral-500">{vendor.city}</p>
          </div>
          <Badge variant={vendor.verified ? 'verified' : 'pending'}>
            {vendor.verified ? 'Verified' : 'Pending'}
          </Badge>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-white border border-neutral-200 rounded-lg p-4 hover:border-primary-300 transition-colors"
          >
            <span className="text-2xl">{stat.icon}</span>
            <p className="text-2xl font-bold text-neutral-900 mt-2">
              {stat.value}
            </p>
            <p className="text-sm text-neutral-500">{stat.label}</p>
            {stat.sub && (
              <p className="text-xs text-neutral-400 mt-0.5">{stat.sub}</p>
            )}
          </Link>
        ))}
      </div>

      <Divider className="mb-4" />

      {/* Quick actions */}
      <div className="space-y-2">
        <Link
          href="/dashboard/vendor/portfolio/upload"
          className="flex items-center gap-3 px-3 py-3 rounded-md hover:bg-neutral-100 transition-colors"
        >
          <span className="text-xl">📸</span>
          <span className="flex-1 text-neutral-900">Upload Portofolio</span>
          <span className="text-neutral-400">›</span>
        </Link>
        <Link
          href="/dashboard/vendor/packages/create"
          className="flex items-center gap-3 px-3 py-3 rounded-md hover:bg-neutral-100 transition-colors"
        >
          <span className="text-xl">📦</span>
          <span className="flex-1 text-neutral-900">Buat Paket Baru</span>
          <span className="text-neutral-400">›</span>
        </Link>
        <Link
          href="/dashboard/vendor/inquiries"
          className="flex items-center gap-3 px-3 py-3 rounded-md hover:bg-neutral-100 transition-colors"
        >
          <span className="text-xl">📨</span>
          <span className="flex-1 text-neutral-900">Lihat Inquiry</span>
          {pendingInquiryCount ? (
            <Badge variant="pending">{pendingInquiryCount}</Badge>
          ) : (
            <span className="text-neutral-400">›</span>
          )}
        </Link>
      </div>
    </Container>
  )
}