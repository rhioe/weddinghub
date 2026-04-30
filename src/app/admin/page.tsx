import { createServerClient } from '@/lib/supabase/server'
import { Container } from '@/components/layout/Container'
import Link from 'next/link'

export default async function AdminDashboardPage() {
  const supabase = await createServerClient()

  // Statistik
  const { count: totalUsers } = await supabase
    .from('users')
    .select('*', { count: 'exact', head: true })

  const { count: totalVendors } = await supabase
    .from('vendor_profiles')
    .select('*', { count: 'exact', head: true })

  const { count: activeVendors } = await supabase
    .from('vendor_profiles')
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true)

  const { count: pendingPortfolios } = await supabase
    .from('portfolios')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'pending')

  const { count: pendingPackages } = await supabase
    .from('packages')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'pending')

  const { count: totalInquiries } = await supabase
    .from('inquiries')
    .select('*', { count: 'exact', head: true })

  const { count: pendingInquiries } = await supabase
    .from('inquiries')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'pending')

  const { count: totalReviews } = await supabase
    .from('reviews')
    .select('*', { count: 'exact', head: true })

  const stats = [
    { label: 'Total User', value: totalUsers || 0, href: '/admin/users', icon: '👥' },
    { label: 'Total Vendor', value: totalVendors || 0, sub: `${activeVendors || 0} aktif`, href: '/admin/users', icon: '🏪' },
    { label: 'Pending Portofolio', value: pendingPortfolios || 0, href: '/admin/verify', icon: '📸', highlight: (pendingPortfolios || 0) > 0 },
    { label: 'Pending Paket', value: pendingPackages || 0, href: '/admin/verify', icon: '📦', highlight: (pendingPackages || 0) > 0 },
    { label: 'Total Inquiry', value: totalInquiries || 0, sub: `${pendingInquiries || 0} pending`, href: '/admin/inquiries', icon: '📨' },
    { label: 'Total Review', value: totalReviews || 0, href: '#', icon: '⭐' },
  ]

  const menuItems = [
    { label: 'Verifikasi Produk', href: '/admin/verify', icon: '✅', badge: (pendingPortfolios || 0) + (pendingPackages || 0) },
    { label: 'Undang Vendor', href: '/admin/invite', icon: '📩' },
    { label: 'Kelola Banner', href: '/admin/banners', icon: '🎨' },
    { label: 'Manajemen User', href: '/admin/users', icon: '👥' },
    { label: 'Semua Inquiry', href: '/admin/inquiries', icon: '📨' },
    { label: 'Tracking Komisi', href: '/admin/commissions', icon: '💰' },
  ]

  return (
    <Container className="py-6">
      <h1 className="text-xl font-bold text-neutral-900 mb-6">
        Admin Dashboard
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className={`bg-white border rounded-lg p-4 hover:border-primary-300 transition-colors ${
              stat.highlight ? 'border-warning-300 bg-warning-50' : 'border-neutral-200'
            }`}
          >
            <span className="text-2xl">{stat.icon}</span>
            <p className="text-2xl font-bold text-neutral-900 mt-2">{stat.value}</p>
            <p className="text-sm text-neutral-500">{stat.label}</p>
            {stat.sub && <p className="text-xs text-neutral-400 mt-0.5">{stat.sub}</p>}
          </Link>
        ))}
      </div>

      {/* Menu */}
      <div className="space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 px-3 py-3 rounded-md hover:bg-neutral-100 transition-colors"
          >
            <span className="text-xl">{item.icon}</span>
            <span className="flex-1 text-neutral-900">{item.label}</span>
            {item.badge !== undefined && item.badge > 0 && (
              <span className="bg-warning-100 text-warning-700 text-xs font-medium px-2 py-0.5 rounded-full">
                {item.badge}
              </span>
            )}
            <span className="text-neutral-400">›</span>
          </Link>
        ))}
      </div>
    </Container>
  )
}