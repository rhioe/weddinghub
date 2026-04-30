import { createServerClient } from '@/lib/supabase/server'
import { Container } from '@/components/layout/Container'
import { Badge } from '@/components/ui/Badge'

export default async function UsersPage() {
  const supabase = await createServerClient()

  const { data: users } = await supabase
    .from('users')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <Container className="py-6">
      <h1 className="text-xl font-bold text-neutral-900 mb-6">
        Manajemen User
      </h1>

      {!users || users.length === 0 ? (
        <p className="text-sm text-neutral-500">Belum ada user</p>
      ) : (
        <div className="space-y-2">
          {users.map((user: any) => (
            <div
              key={user.id}
              className="bg-white border border-neutral-200 rounded-lg p-3"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-semibold text-neutral-900 text-sm">
                    {user.full_name || 'Tanpa Nama'}
                  </p>
                  <p className="text-xs text-neutral-500">{user.email}</p>
                  {user.phone && (
                    <p className="text-xs text-neutral-400">{user.phone}</p>
                  )}
                </div>
                <Badge
                  variant={
                    user.role === 'admin'
                      ? 'featured'
                      : user.role === 'vendor'
                      ? 'verified'
                      : 'pending'
                  }
                >
                  {user.role}
                </Badge>
              </div>
              <p className="text-xs text-neutral-400 mt-2">
                Daftar: {new Date(user.created_at).toLocaleDateString('id-ID')}
              </p>
            </div>
          ))}
        </div>
      )}
    </Container>
  )
}