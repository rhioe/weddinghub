import { createServerClient } from '@/lib/supabase/server'
import { Container } from '@/components/layout/Container'
import { CountdownCard } from './_components/CountdownCard'
import { BudgetTracker } from './_components/BudgetTracker'
import { Checklist } from './_components/Checklist'
import { EmptyState } from '@/components/ui/EmptyState'

export default async function WeddingPlannerPage() {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  // Ambil checklist user
  const { data: checklists } = await supabase
    .from('user_checklists')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  // Ambil wedding date dari checklist pertama
  const weddingDate = checklists?.[0]?.wedding_date || null

  return (
    <Container className="py-6 pb-24 md:pb-6">
      <h1 className="text-xl font-bold text-neutral-900 mb-6">
        📋 Wedding Planner
      </h1>

      {!weddingDate && (!checklists || checklists.length === 0) ? (
        <EmptyState
          icon="💒"
          title="Mulai rencanakan pernikahanmu!"
          description="Atur tanggal pernikahan dan mulai checklist persiapan"
        />
      ) : (
        <div className="space-y-6">
          <CountdownCard weddingDate={weddingDate} />
          <BudgetTracker userId={user.id} />
          <Checklist
            userId={user.id}
            items={checklists || []}
          />
        </div>
      )}
    </Container>
  )
}