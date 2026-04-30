import { Header } from '@/components/layout/Header'
import { BottomNav } from '@/components/layout/BottomNav'
import Link from 'next/link'
import { cn } from '@/lib/utils/cn'

const SIDEBAR_ITEMS = [
  {
    label: 'Overview',
    href: '/dashboard/vendor',
    icon: '📊',
  },
  {
    label: 'Portofolio',
    href: '/dashboard/vendor/portfolio',
    icon: '📸',
  },
  {
    label: 'Paket',
    href: '/dashboard/vendor/packages',
    icon: '📦',
  },
  {
    label: 'Inquiry',
    href: '/dashboard/vendor/inquiries',
    icon: '📨',
  },
  {
    label: 'Kembali ke Profil',
    href: '/profile',
    icon: '👤',
  },
]

export default function VendorDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <div className="flex min-h-screen">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-64 bg-white border-r border-neutral-200 p-4">
          <nav className="space-y-1">
            {SIDEBAR_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-md text-neutral-700 hover:bg-neutral-100 transition-colors'
                )}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 pb-20 md:pb-0">
          {children}
        </main>
      </div>
      <BottomNav />
    </>
  )
}