import Link from 'next/link'
import { CATEGORIES } from '@/lib/constants'

export function CategoryGrid() {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-neutral-900">Kategori</h2>
        <Link
          href="/explore"
          className="text-sm text-primary-500 font-semibold hover:text-primary-600"
        >
          Lihat Semua
        </Link>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
        {CATEGORIES.map((category) => (
          <Link
            key={category.slug}
            href={`/explore?category=${category.slug}`}
            className="flex flex-col items-center gap-2 shrink-0 w-20 group"
          >
            <div className="w-14 h-14 rounded-full bg-neutral-100 flex items-center justify-center text-2xl group-hover:bg-primary-50 transition-colors">
              {category.icon}
            </div>
            <span className="text-xs text-neutral-600 text-center leading-tight group-hover:text-primary-600 transition-colors">
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}