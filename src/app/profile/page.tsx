import Link from 'next/link'
import { createServerClient } from '@/lib/supabase/server'
import { Avatar } from '@/components/ui/Avatar'
import { Container } from '@/components/layout/Container'
import { Divider } from '@/components/ui/Divider'

export default async function ProfilePage() {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return null // Middleware handle redirect
  }

  const { data: profile } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()

  const { count: wishlistCount } = await supabase
    .from('wishlists')
    .select('*', { count: 'exact', head: true })
    .eq('customer_id', user.id)

  const { count: inquiryCount } = await supabase
    .from('inquiries')
    .select('*', { count: 'exact', head: true })
    .eq('customer_id', user.id)

  const menuItems = [
    {
      label: 'Edit Profil',
      href: '/profile/edit',
      icon: '👤',
    },
    {
      label: 'Wishlist',
      href: '/profile/wishlist',
      icon: '❤️',
      badge: wishlistCount || 0,
    },
    {
      label: 'Inquiry Saya',
      href: '/profile/inquiries',
      icon: '📨',
      badge: inquiryCount || 0,
    },
    {
      label: 'Wedding Planner',
      href: '/wedding-planner',
      icon: '📋',
    },
  ]

  return (
    <Container className="py-6">
      {/* Profile header */}
      <div className="flex items-center gap-4 mb-6">
        <Avatar
          src={profile?.avatar_url}
          fallback={profile?.full_name || user.email}
          size="xl"
        />
        <div>
          <h1 className="text-xl font-bold text-neutral-900">
            {profile?.full_name || 'Pengguna'}
          </h1>
          <p className="text-sm text-neutral-500">{user.email}</p>
          <span className="inline-block mt-1 text-xs font-medium px-2 py-0.5 rounded-full bg-primary-50 text-primary-600">
            {profile?.role === 'vendor' ? 'Vendor' : 'Customer'}
          </span>
        </div>
      </div>

      <Divider className="mb-4" />

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
              <span className="bg-primary-50 text-primary-600 text-xs font-medium px-2 py-0.5 rounded-full">
                {item.badge}
              </span>
            )}
            <span className="text-neutral-400">›</span>
          </Link>
        ))}
      </div>

      {/* Switch to vendor */}
      {profile?.role === 'customer' && (
        <div className="mt-6">
          <Link
            href="/dashboard/vendor"
            className="block text-center px-4 py-3 rounded-md bg-secondary-50 text-secondary-700 font-semibold hover:bg-secondary-100 transition-colors"
          >
            🚀 Switch ke Mode Vendor
          </Link>
        </div>
      )}
    </Container>
  )
}