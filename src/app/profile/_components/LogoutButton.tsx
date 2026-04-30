'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { createClient } from '@/lib/supabase/client'

export function LogoutButton() {
    const router = useRouter()
    const supabase = createClient()

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.push('/auth/login')
        router.refresh()
    }

    return (
        <Button
            variant="ghost"
            fullWidth
            onClick={handleLogout}
            className="text-error-500 hover:bg-error-50 hover:text-error-700"
        >
            🚪 Keluar / Logout
        </Button>
    )
}