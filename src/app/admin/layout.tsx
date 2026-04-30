import { Header } from '@/components/layout/Header'
import { BottomNav } from '@/components/layout/BottomNav'
import Link from 'next/link'

const SIDEBAR_ITEMS = [
  { label: 'Overview', href: '/admin', icon: '📊' },
  { label: 'Verifikasi', href: '/admin/verify', icon: '✅' },
  { label: 'Undang Vendor', href: '/admin/invite', icon: '📩' },
  { label: 'Banner', href: '/admin/banners', icon: '🎨' },
  { label: 'Users', href: '/admin/users', icon: '👥' },
  { label: 'Inquiries', href: '/admin/inquiries', icon: '📨' },
  { label: 'Komisi', href: '/admin/commissions', icon: '💰' },
  { label: '← Beranda', href: '/', icon: '🏠' },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <div className="flex min-h-screen">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-64 bg-neutral-900 text-white p-4">
          <div className="mb-6">
            <span className="text-lg font-bold font-display text-primary-400">
              ⚙️ Admin Panel
            </span>
          </div>
          <nav className="space-y-1">
            {SIDEBAR_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-md text-neutral-300 hover:bg-neutral-800 hover:text-white transition-colors"
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 bg-neutral-50 pb-20 md:pb-0">
          {children}
        </main>
      </div>
      <BottomNav />
    </>
  )
}