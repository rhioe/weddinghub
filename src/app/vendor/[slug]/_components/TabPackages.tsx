import { EmptyState } from '@/components/ui/EmptyState'
import { Divider } from '@/components/ui/Divider'

interface Package {
  id: string
  name: string
  price: number
  description?: string | null
  details?: string | null
}

interface TabPackagesProps {
  packages: Package[]
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export function TabPackages({ packages }: TabPackagesProps) {
  if (packages.length === 0) {
    return (
      <section>
        <h2 className="text-lg font-bold text-neutral-900 mb-3">Paket</h2>
        <EmptyState
          icon="📦"
          title="Belum ada paket"
          description="Vendor ini belum menambahkan paket layanan"
        />
      </section>
    )
  }

  return (
    <section>
      <h2 className="text-lg font-bold text-neutral-900 mb-3">
        Paket Layanan ({packages.length})
      </h2>

      <div className="space-y-3">
        {packages.map((pkg, index) => (
          <div
            key={pkg.id}
            className="bg-white border border-neutral-200 rounded-lg p-4 hover:border-primary-300 transition-colors"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <h3 className="font-semibold text-neutral-900">{pkg.name}</h3>
                {pkg.description && (
                  <p className="text-sm text-neutral-500 mt-1">
                    {pkg.description}
                  </p>
                )}
                {pkg.details && (
                  <ul className="mt-2 space-y-1">
                    {pkg.details.split('\n').map((item, i) => (
                      <li
                        key={i}
                        className="text-sm text-neutral-600 flex items-start gap-2"
                      >
                        <span className="text-primary-500 mt-1">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <p className="text-lg font-bold text-primary-600 shrink-0">
                {formatPrice(pkg.price)}
              </p>
            </div>

            {index < packages.length - 1 && <Divider className="mt-4" />}
          </div>
        ))}
      </div>
    </section>
  )
}